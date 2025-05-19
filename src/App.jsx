import "./App.css";
import DataFetcher from "./components/DataFetcher";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import yasuoImage from "./assets/yasuo4.png"; // Add this import

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen w-full bg-gray-100">
        <header className="w-full flex flex-col items-center py-6 bg-gradient-to-r from-hunter-green-500 to-asparagus-500 shadow-lg">
          <div className="flex justify-center items-center mb-4">
            <img
              src={yasuoImage}
              alt="League of Legends"
              className="object-contain"
              style={{
                display: "inline-block",
              }}
            />
          </div>
          <h1
            className="text-3xl font-bold text-parchment-500 text-center mb-2"
            style={{ color: "orange" }}
          >
            League of Legends Stats
          </h1>
        </header>
        <main className="flex-1 flex flex-col items-center justify-start w-full">
          <DataFetcher />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
