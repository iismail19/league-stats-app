/**
 * Normalize champion name for URL
 */
const normalizeChampionName = (championName: string): string => {
  // Handle special cases where champion names might differ
  const nameMap: Record<string, string> = {
    'MonkeyKing': 'Wukong',
    'FiddleSticks': 'Fiddlesticks',
  };

  let normalizedName = nameMap[championName] || championName;
  
  // Normalize the name for URL
  normalizedName = normalizedName
    .replace(/\s+/g, '') // Remove spaces
    .replace(/'/g, '') // Remove apostrophes
    .replace(/\./g, ''); // Remove periods

  return normalizedName;
};

/**
 * Get champion square image URL - tries Community Dragon first (no version needed)
 */
export const getChampionImageUrl = (championName: string): string => {
  const normalizedName = normalizeChampionName(championName);
  
  // Primary: Community Dragon - no version required, more reliable
  return `https://ddragon.canisback.com/img/champion/${normalizedName}.png`;
};

/**
 * Get fallback champion image URL from official Riot CDN
 */
export const getChampionImageUrlFallback = (championName: string): string => {
  const normalizedName = normalizeChampionName(championName);
  // Using a recent version - update if needed
  const version = '14.24.1';
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${normalizedName}.png`;
};

/**
 * Get champion loading screen image URL (splash art)
 */
export const getChampionSplashUrl = (championName: string, skinNum: number = 0): string => {
  const normalizedName = championName
    .replace(/\s+/g, '')
    .replace(/'/g, '')
    .replace(/\./g, '');

  return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${normalizedName}_${skinNum}.jpg`;
};

