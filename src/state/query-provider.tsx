'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export interface ProviderPropTypes {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const QueryProvider = (props: ProviderPropTypes) => {
  const { children } = props;

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
