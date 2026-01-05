import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { MatchCard } from './components/MatchCard';
import { PlayerStatsPanel } from './components/PlayerStatsPanel';
import { RankCard } from './components/RankCard';
import { searchSummoner, getSummonerByPuuid } from './utils/api';
import type { MatchListResponse, SummonerData } from './utils/api';

function App() {
  const [matches, setMatches] = useState<MatchListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedName, setSearchedName] = useState<string>('');
  const [tagline, setTagline] = useState<string>('NA1');
  const [summonerData, setSummonerData] = useState<SummonerData | null>(null);

  const handleSearch = async (gameName: string, taglineInput: string) => {
    setIsLoading(true);
    setError(null);
    setSearchedName(`${gameName} #${taglineInput}`);
    setTagline(taglineInput.toUpperCase());
    setSummonerData(null);

    try {
      const data = await searchSummoner(gameName, taglineInput);
      console.log('Received data:', data);
      console.log('Match count:', data.matchDataList?.length);
      setMatches(data);
      
      // Fetch summoner data for rank card
      // First try to use summonerId from match data if available
      if (data.summonerId) {
        console.log('Using summonerId from match data:', data.summonerId);
        setSummonerData({ id: data.summonerId, puuid: data.puuid, name: '', summonerLevel: 0 });
      } else if (data.puuid) {
        // Fallback: try to fetch from API with tagline for regional server
        // Don't block on this - RankCard can work with just puuid
        getSummonerByPuuid(data.puuid, taglineInput)
          .then((summoner) => {
            console.log('Summoner data fetched:', summoner);
            if (summoner) {
              setSummonerData(summoner);
            }
          })
          .catch((err) => {
            console.warn('Failed to fetch summoner data (non-critical):', err);
            // Don't set error - rank card can still work with just puuid
          });
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch match data');
      setMatches(null);
      setSummonerData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1419]">
      {/* Header */}
      <header className="border-b border-[#2d3748] bg-[#1a1f2e]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-white mb-2">League Stats</h1>
          <p className="text-[#a0a0a0]">Search for summoner match history</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-[#a0a0a0]">Loading match data...</p>
          </div>
        )}

        {/* Results */}
        {matches && !isLoading && (
          <div className="flex gap-6">
            {/* Left Sidebar */}
            <aside className="flex-shrink-0">
              <div className="sticky top-8 space-y-4">
                {matches?.puuid && (
                  <RankCard 
                    encryptedSummonerId={summonerData?.id || matches.summonerId || 'placeholder'} 
                    tagline={tagline} 
                    puuid={matches.puuid}
                  />
                )}
                <PlayerStatsPanel puuid={matches.puuid} />
              </div>
            </aside>

            {/* Main Content - Match History */}
            <div className="flex-1 min-w-0">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Match History for {searchedName}
                </h2>
                <p className="text-[#a0a0a0]">
                  {matches.matchDataList?.length || 0} matches found
                </p>
              </div>
              {matches.matchDataList && matches.matchDataList.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {matches.matchDataList
                      .map((match) => (
                        <MatchCard
                          key={match.metadata.matchId}
                          match={match}
                          playerPuuid={matches.puuid}
                        />
                      ))
                      .filter(Boolean)}
                  </div>
                {/* Show message if no cards rendered */}
                {matches.matchDataList.length > 0 && 
                 matches.matchDataList.filter((match) => {
                   const player = match.info.participants.find((p: any) => p.puuid === matches.puuid);
                   return !!player;
                 }).length === 0 && (
                  <div className="text-center py-8 text-yellow-400">
                    <p>Matches found but player data not available. Check console for details.</p>
                  </div>
                )}
                {/* Debug info - remove in production */}
                {import.meta.env.DEV && (
                  <details className="mt-6 p-4 bg-[#1a1f2e] rounded-lg text-xs">
                    <summary className="cursor-pointer text-[#a0a0a0] mb-2">Debug Info</summary>
                    <pre className="text-[#6b7280] overflow-auto">
                      {JSON.stringify({ 
                        puuid: matches.puuid, 
                        matchCount: matches.matchDataList.length,
                        firstMatchParticipants: matches.matchDataList[0]?.info?.participants?.map((p: any) => p.puuid).slice(0, 3)
                      }, null, 2)}
                    </pre>
                  </details>
                )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-[#a0a0a0]">No matches found for this summoner.</p>
                </div>
              )}
              {matches.failedMatches && matches.failedMatches.length > 0 && (
                <div className="mt-4 text-sm text-yellow-400">
                  Note: {matches.failedMatches.length} match(es) failed to load
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!matches && !isLoading && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⚔️</div>
            <h2 className="text-2xl font-bold text-white mb-2">Search for a Summoner</h2>
            <p className="text-[#a0a0a0]">
              Enter a summoner name and tagline to view their match history
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
