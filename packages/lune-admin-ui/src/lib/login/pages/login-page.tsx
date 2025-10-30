import { FloatingLayout } from '@/shared/components/layout/floating-layout';

import { LoginForm } from '../components/login-form/login-form';

export const LoginPage = () => {
  return (
    <FloatingLayout>
      <LoginForm />
    </FloatingLayout>
  );
};
