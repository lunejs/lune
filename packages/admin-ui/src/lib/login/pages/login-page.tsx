import { Logo } from '@/lib/shared/components/logo';
import { LoginForm } from '../components/login-form/login-form';

export const LoginPage = () => {
  return (
    <div className="h-screen bg-muted flex flex-col gap-6 items-center pt-40">
      <header className="flex items-center gap-2">
        <Logo />
        <h1 className="font-semibold text-sm">Vendyx</h1>
      </header>
      <LoginForm />
    </div>
  );
};
