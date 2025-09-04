/**
 * @description
 * Image processor for handling image transformations and optimizations.
 *
 * @example
 * // For a complete example you can see the DefaultImageProcessor implementation.
 * export class DefaultImageProcessor implements ImageProcessor {
 *   async process(file: ProcessFile, outdir: string): Promise<ProcessResult[]> {
 *     const filename = `${file.name}.webp`;
 *     const outPath = join(outdir, filename);
 * 
 *     await this.optimizeImage(file.path, outPath);
 * 
 *     return [{ filepath: outPath, filename }];
 *   }
 * }
 */
export interface ImageProcessor {
  /**
   * @description
   * Processes an image and generates multiple variants of it.
   *
   * @param file The image to process.
   * @param outdir The output directory where the processed images will be saved.
   * @returns the list of processed images will be uploaded to the storage provider and saved in the database.
   */
  process(file: ProcessFile, outdir: string): Promise<ProcessResult[]>;
}

export type ProcessFile = {
  /**
   * The full path to the uploaded file.
   */
  path: string;
  /**
   * The name of the image file.
   */
  name: string;
};

export type ProcessResult = {
  /**
   * The full path to the processed image variant.
   * For processed images to be deleted afterwards, the variant should be stored in the outdir
   */
  filepath: string;
  /**
   * The name of the processed image variant file.
   */
  filename: string;
};

