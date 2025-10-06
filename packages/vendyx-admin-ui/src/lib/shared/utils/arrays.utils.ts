export const isLast = (index: number, array: unknown[]) => index === array.length - 1;
export const isFirst = (index: number) => index === 0;

export const isArray = (arr: any): arr is any[] => Array.isArray(arr);
