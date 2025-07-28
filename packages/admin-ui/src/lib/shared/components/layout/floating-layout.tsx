import { Logo } from '../logo';

export const FloatingLayout = ({ children }: Props) => {
  return (
    <div className="h-screen bg-muted flex flex-col gap-6 pt-40">
      <header className="flex items-center gap-2 justify-center">
        <Logo />
        <h1 className="font-semibold text-sm">Vendyx</h1>
      </header>
      {children}
    </div>
  );
};

type Props = {
  children: React.ReactNode;
};
