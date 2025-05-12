import "./App.css";
import DataFetcher from "./components/DataFetcher";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-screen mx-auto bg-gray-100">
        <h1 className="text-center text-2xl font-bold py-4">
          My API Data Display
        </h1>
        <DataFetcher />
      </div>
    </QueryClientProvider>
  );
}

export default App;
