import "./App.css";
import DataFetcher from "./components/DataFetcher";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>My API Data Display</h1>
        <DataFetcher />
      </div>
    </QueryClientProvider>
  );
}

export default App;
