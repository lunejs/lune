import * as bcrypt from 'bcrypt';

async function hash(str: string) {
  const salt = await generateSalt();

  return bcrypt.hash(str, salt);
}

async function compare(str: string, hash: string) {
  return bcrypt.compare(str, hash);
}

async function generateSalt() {
  return await bcrypt.genSalt();
}

export const PasswordService = {
  hash,
  compare
};
