import { randomBytes, createHash } from 'crypto';
import { customAlphabet } from 'nanoid';

const PREFIX = 'VXSK';
const CROCKFORD = '23456789ABCDEFGHJKMNPQRSTVWXYZ';
const ID_LENGTH = 40;
const ENTROPY_BYTES = 6;
const CHECKSUM_LENGTH = 8;

const CrockfordAlphabet = customAlphabet(CROCKFORD, ID_LENGTH);

/**
   * @description
   * Generates a new API key with the Vendyx format.
   *
   * @format
   * ```
   * VXSK_38QARV01ET0G6Z2CJD9VA2ZZAR0XJJLSO7WBNWY3F_A1B2C3D8
   * └──┘ └─────────────────────────┘└────────────┘ └──────┘
   * Prefix   Crockford Base32 UUID     Entropy     Checksum

   * ```
   *
   * The key consists of:
   * - A prefix "VXSK" Vendyx Storefront Key
   * - A unique Key generated using Crockford Base32 encoding
   * - A random entropy string for additional uniqueness
   * - A checksum derived from the key content for validation
   *
   * Inspired by:
   * @see https://github.com/agentstation/uuidkey
   */
function generate() {
  const key = CrockfordAlphabet();
  const entropy = randomBytes(ENTROPY_BYTES).toString('base64url');
  const raw = `${key}${entropy}`;

  const checksum = computeChecksum(raw);

  return `${PREFIX}_${raw}_${checksum}`;
}

/**
 * @description
 * Validates an API key format and checksum.
 * Returns true if the checksum matches the content.
 */
function validate(key: string) {
  const regex = new RegExp(
    `^${PREFIX}_([A-Z0-9]+)([a-zA-Z0-9-_]+)_([a-zA-Z0-9]{${CHECKSUM_LENGTH}})$`
  );

  const match = key.match(regex);
  if (!match) return false;

  const [, uuid, entropy, checksum] = match;
  const raw = `${uuid}${entropy}`;
  const expectedChecksum = computeChecksum(raw);

  return checksum === expectedChecksum;
}

function computeChecksum(input: string) {
  return createHash('sha256').update(input).digest('base64url').slice(0, CHECKSUM_LENGTH);
}

export const ApiKey = {
  generate,
  validate
};
