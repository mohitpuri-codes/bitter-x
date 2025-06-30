import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import Router from './Routes/router';
import { useMemo } from 'react';
import { Context } from './contexts/notification.context';

function App() {
  const queryClient = new QueryClient();
  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

  return (
    <>
      <ErrorBoundary>
        <Context.Provider value={contextValue}>
          <QueryClientProvider client={queryClient}>
            <Router />
          </QueryClientProvider>
        </Context.Provider>
      </ErrorBoundary>
    </>
  );
}

export default App;
