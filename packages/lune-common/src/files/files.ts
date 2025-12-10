export const filesize = (size: number) => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 ** 2) return `${Math.round(size / 1024)} KB`;
  if (size < 1024 ** 3) return `${Math.round(size / 1024 ** 2)} MB`;

  return `${Math.round(size / 1024 ** 3)} GB`;
};
