import { readFile } from 'node:fs/promises';

import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { LuneLogger } from '@lunejs/common';
import type { StorageProvider, UploadOptions, UploadReturn } from '@lunejs/core';

/**
 * S3 Storage Provider
 *
 * @description
 * Storage provider to integrate [AWS S3](https://aws.amazon.com/s3/) into lune for file uploads.
 *
 * ### Requirements
 * 1. Create a [AWS Account](https://aws.amazon.com/)
 * 2. Create a S3 Bucket in the [AWS S3 Console](https://console.aws.amazon.com/s3)
 * 3. Disable "Block public access" for the bucket
 * 4. Add the following policy to your bucket
 * ```json
 * {
 *   "Version": "2012-10-17",
 *   "Statement": [
 *     {
 *       "Effect": "Allow",
 *       "Principal": "*",
 *       "Action": "s3:GetObject",
 *       "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
 *     }
 *   ]
 * }
 * ```
 * 5. Create a IAM user in the [IAM Console](https://console.aws.amazon.com/iam#/users)
 * 6. Add the policy **AmazonS3FullAccess** to your user
 * 7. Create an access key for your user with the use case **Application running outside AWS**
 * 8. Save the provided **Access key** and *Secret access Key**
 *
 * ### Usage
 * ```ts
 * import { S3StorageProvider } from '@lunejs/assets';
 *
 * const luneServer = new LuneServer({
 *   assets: {
 *     storageProvider:  new S3StorageProvider({
 *       region: 'your-region-1',
 *       bucketName: 'your-bucket-name',
 *       credentials: {
 *         accessKeyId: 'YOUR_ACCESS_KEY_ID',
 *         secretAccessKey: 'YOUR_SECRET_ACCESS_KEY'
 *       }
 *     })
 *   }
 * })
 * ```
 */
export class S3StorageProvider implements StorageProvider {
  private s3Client: S3Client;

  constructor(private readonly config: S3StorageProviderConfig) {
    this.s3Client = new S3Client(config);
  }

  async upload(filepath: string, options?: UploadOptions): Promise<UploadReturn | null> {
    try {
      const filename = options?.filename as string;

      const command = new PutObjectCommand({
        Bucket: this.config.bucketName,
        Key: filename,
        Body: await readFile(filepath)
      });

      const response = await this.s3Client.send(command);

      if (response.$metadata.httpStatusCode !== 200) return null;

      const url = this.genPublicUrl(filename);

      return { source: url, providerId: filename };
    } catch (error) {
      LuneLogger.error(error);

      return null;
    }
  }

  async remove(providerId: string): Promise<boolean> {
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.config.bucketName,
          Key: providerId
        })
      );

      return true;
    } catch (error) {
      LuneLogger.error(error);
      return false;
    }
  }

  private genPublicUrl(filename: string) {
    return `https://${this.config.bucketName}.s3.${this.config.region}.amazonaws.com/${filename}`;
  }
}

export type S3StorageProviderConfig = {
  /**
   * @description
   * The region your bucket is located, you can find it in the [AWS S3 Console](https://console.aws.amazon.com/s3/buckets),
   * in the table column **AWS Region**
   *
   * @example
   * 'us-east-1'
   */
  region: string;
  /**
   * @description
   * The name of your bucket, you can find it in the [AWS S3 Console](https://console.aws.amazon.com/s3/buckets),
   * in the table column **Name**
   */
  bucketName: string;
  /**
   * @description
   * Credentials your IAM user has
   */
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
};
