export const getSkip = (page: number, size: number) => {
  if (page === 1) return 0;

  return size * (page - 1);
};
