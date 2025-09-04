import { VendyxConfig } from '@/config';

export const TEST_VENDYX_CONFIG: VendyxConfig = {
  app: {
    port: 4000
  },
  auth: {
    jwtSecret: 'secret',
    jwtExpiresIn: 7 * 24 * 60 * 60 // 7 days
  },
  db: {
    url: 'postgresql://app_user:womteC_ruqri0_punqah@localhost:6500/vendyx_test?schema=public'
  }
};
