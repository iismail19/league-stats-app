import "./App.css";
import DataFetcher from "./components/DataFetcher";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen w-full bg-gray-100">
        <header className="w-full flex justify-center items-center py-4 bg-white shadow">
          <h1 className="text-2xl font-bold">My API Data Display</h1>
        </header>
        <main className="flex-1 flex flex-col items-center justify-start w-full">
          <DataFetcher />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
