import type {
  ImageProcessor,
  ProcessFile,
  ProcessResult
} from '@/config/image-processor/image-processor';

import { TestHelper } from '../test-helper';

export class TestImageProcessor implements ImageProcessor {
  async process(_: ProcessFile, __: string): Promise<ProcessResult[]> {
    return [
      {
        filepath: `/var/folders/file-${TestHelper.generateUUID()}`,
        filename: `${TestHelper.generateUUID()}.webp`
      }
    ];
  }
}
