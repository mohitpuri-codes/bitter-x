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
        <QueryClientProvider client={queryClient}>
          <Context.Provider value={contextValue}>
            <Router />
          </Context.Provider>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
