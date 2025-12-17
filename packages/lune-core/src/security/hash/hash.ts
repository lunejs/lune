import * as bcrypt from 'bcrypt';

const hash = async (str: string) => {
  const salt = await generateSalt();

  return bcrypt.hash(str, salt);
};

const compare = async (str: string, hash: string) => {
  return await bcrypt.compare(str, hash);
};

const generateSalt = async () => {
  return await bcrypt.genSalt();
};

export const PasswordHasher = {
  hash,
  compare
};
