import { customAlphabet } from 'nanoid';

const PREFIX = 'LNSK';
const CROCKFORD = '23456789ABCDEFGHJKMNPQRSTVWXYZ';
const ID_LENGTH = 40;

const CrockfordAlphabet = customAlphabet(CROCKFORD, ID_LENGTH);

/**
   * @description
   * Generates a new API key with the Lune format.
   *
   * @format
   * ```
   * LUSK_38QARV01ET0G6Z2CJD9VA2ZZAR0
   * └──┘ └─────────────────────────┘
   * Prefix   Crockford Base32 UUID  

   * ```
   *
   * The key consists of:
   * - A prefix "LUSK" Lune Storefront Key
   * - A unique Key generated using Crockford Base32 encoding
   *
   * Inspired by:
   * @see https://github.com/agentstation/uuidkey
   */
function generate() {
  const key = CrockfordAlphabet();

  return `${PREFIX}_${key}`;
}

/**
 * @description
 * Validates an API key format and checksum.
 * Returns true if the checksum matches the content.
 */
function validate(key: string) {
  const regex = new RegExp(`^${PREFIX}_([A-Z0-9]+)$`);

  return regex.test(key);
}

export const ApiKey = {
  generate,
  validate
};
