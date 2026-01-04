const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005';

export interface SearchRequest {
  gameName: string;
  tagline: string;
}

export interface MatchListResponse {
  puuid: string;
  matchDataList: any[];
  failedMatches: string[];
  summonerId?: string; // Optional: encryptedSummonerId if available from match data
}

export interface SummonerData {
  id: string;
  puuid: string;
  name: string;
  summonerLevel: number;
}

export const searchSummoner = async (gameName: string, tagline: string): Promise<MatchListResponse> => {
  const response = await fetch(`${API_BASE_URL}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ gameName, tagline }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch summoner data');
  }

  return response.json();
};

export const getSummonerByPuuid = async (puuid: string, tagline: string = 'NA1'): Promise<SummonerData | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/summoner/puuid/${puuid}?tagline=${encodeURIComponent(tagline)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('Summoner data fetched successfully:', data);
      return data;
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error(`Failed to fetch summoner (${response.status}):`, errorData);
      // Check if it's a CORS error
      if (response.status === 0 || response.type === 'opaque') {
        console.error('CORS error detected - backend may not be running or CORS not configured');
      }
      return null;
    }
  } catch (err) {
    console.error('Failed to fetch summoner:', err);
    if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
      console.error('Network error - check if backend is running on', API_BASE_URL);
    }
    return null;
  }
};

export const parseSummonerInput = (input: string): { gameName: string; tagline: string } | null => {
  const trimmed = input.trim();
  const match = trimmed.match(/^(.+?)\s*#(.+)$/);
  
  if (!match) {
    return null;
  }

  return {
    gameName: match[1].trim(),
    tagline: match[2].trim().toUpperCase(),
  };
};
