import { useState, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (gameName: string, tagline: string) => void;
  isLoading?: boolean;
}

export const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmed = input.trim();
    const match = trimmed.match(/^(.+?)\s*#(.+)$/);

    if (!match) {
      setError('Please enter summoner name in format: Name #Tag (e.g., God of Wind #NA1)');
      return;
    }

    const gameName = match[1].trim();
    const tagline = match[2].trim().toUpperCase();

    onSearch(gameName, tagline);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError('');
              }}
              placeholder="Search summoner (e.g., God of Wind #NA1)"
              className="w-full px-6 py-4 bg-[#1e2328] border border-[#2d3748] rounded-lg text-white placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={isLoading}
            />
            {error && (
              <p className="absolute -bottom-6 left-0 text-red-400 text-sm mt-1">{error}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
    </div>
  );
};

