import "./App.css";
import DataFetcher from "./components/DataFetcher";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import yasuoImage from "./assets/yasuo4.png";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen w-full bg-gray-100">
        <header className="w-full flex flex-col items-center py-8 bg-gradient-to-r from-hunter-green-500 to-asparagus-500 shadow-lg mb-8">
          <div className="flex justify-center items-center mb-6">
            <img
              src={yasuoImage}
              alt="League of Legends"
              className="object-contain max-h-48"
              style={{
                display: "inline-block",
              }}
            />
          </div>
          <h1
            className="text-4xl font-bold text-center mb-4"
            style={{ color: "#FFA500" }}
          >
            League of Legends Stats
          </h1>
          <p className="text-white/90 text-lg">Enter Game Name + Tag</p>
        </header>
        <main className="flex-1 flex flex-col items-center justify-start w-full px-4">
          <DataFetcher />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
