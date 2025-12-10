import { filesize } from '../files';

describe('files', () => {
  describe('filesize', () => {
    test('returns size in bytes when less than 1024 B', () => {
      expect(filesize(378)).toBe('378 B');
    });

    test('returns size in kilobytes when between 1 KB and 1 MB', () => {
      expect(filesize(2048)).toBe('2 KB');
    });

    test('returns size in megabytes when between 1 MB and 1 GB', () => {
      expect(filesize(1_500_000)).toBe('1 MB');
    });

    test('returns size in gigabytes when between 1 GB and 1 TB', () => {
      expect(filesize(5_000_000_000)).toBe('5 GB');
    });
  });
});
