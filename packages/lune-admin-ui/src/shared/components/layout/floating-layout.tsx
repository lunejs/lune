import { Link } from 'react-router';

import { Logo } from '../logo';

export const FloatingLayout = ({ children }: Props) => {
  return (
    <div className="h-screen bg-muted flex flex-col items-center gap-6 pt-40">
      <header className="flex items-center gap-2 justify-center">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <h1 className="font-semibold text-sm">Lune</h1>
        </Link>
      </header>
      {children}
    </div>
  );
};

type Props = {
  children: React.ReactNode;
};
