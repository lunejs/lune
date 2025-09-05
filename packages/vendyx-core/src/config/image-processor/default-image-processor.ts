import { join } from 'node:path';

import sharp from 'sharp';

import { ImageProcessor, ProcessFile, ProcessResult } from './image-processor';

/**
 * @description
 * Default image processor that uses sharp to process images
 */
export class DefaultImageProcessor implements ImageProcessor {
  private options: Required<Options>;

  constructor(options: Options = {}) {
    this.options = this.getDefaultOptions(options);
  }

  async process(file: ProcessFile, outdir: string): Promise<ProcessResult[]> {
    const filename = `${file.filename}.webp`;
    const outPath = join(outdir, filename);

    await this.optimizeImage(file.path, outPath);

    return [{ filepath: outPath, filename }];
  }

  private async optimizeImage(filepath: string, outdir: string) {
    await sharp(filepath).rotate().webp({ quality: this.options.quality }).toFile(outdir);
  }

  private getDefaultOptions(options?: Options): Required<Options> {
    return {
      quality: options?.quality ?? 80
    };
  }
}

type Options = {
  quality?: number;
};
