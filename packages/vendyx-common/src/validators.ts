export const isUUID = (value: string) => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
};

export const isTruthy = <T>(a: T): a is NonNullable<T> => Boolean(a);
