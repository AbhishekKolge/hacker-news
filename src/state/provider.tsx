'use client';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ProviderPropTypes } from './types';

const queryClient = new QueryClient();

const Provider = (props: ProviderPropTypes) => {
  const { children } = props;

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Provider;
