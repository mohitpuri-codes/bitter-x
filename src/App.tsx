import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import Router from "./Routes/router";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
