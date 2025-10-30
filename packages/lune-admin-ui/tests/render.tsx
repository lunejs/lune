import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render as TestingLibraryRender } from '@testing-library/react';

import { Toaster } from '@lune/ui';

export function render(ui: React.ReactElement) {
  const queryClient = new QueryClient();

  return TestingLibraryRender(
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {ui}
    </QueryClientProvider>
  );
}
