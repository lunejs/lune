import type {
  ImageProcessor,
  ProcessFile,
  ProcessResult
} from '@/config/image-processor/image-processor';

import { TestUtils } from '../test-utils';

export class TestImageProcessor implements ImageProcessor {
  async process(_: ProcessFile, __: string): Promise<ProcessResult[]> {
    return [
      {
        filepath: `/var/folders/file-${TestUtils.generateUUID()}`,
        filename: `${TestUtils.generateUUID()}.webp`
      }
    ];
  }
}
