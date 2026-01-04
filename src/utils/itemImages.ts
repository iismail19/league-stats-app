/**
 * Get item image URL from Riot Data Dragon
 */
export const getItemImageUrl = (itemId: number): string | null => {
  if (itemId === 0) return null; // No item
  
  // Using a static version - can be updated if needed
  const version = '14.24.1';
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemId}.png`;
};

/**
 * Get summoner spell image URL
 */
export const getSummonerSpellImageUrl = (spellId: number): string => {
  const spellMap: Record<number, string> = {
    1: 'SummonerBoost', // Cleanse
    3: 'SummonerExhaust', // Exhaust
    4: 'SummonerFlash', // Flash
    6: 'SummonerHaste', // Ghost
    7: 'SummonerHeal', // Heal
    11: 'SummonerSmite', // Smite
    12: 'SummonerTeleport', // Teleport
    13: 'SummonerMana', // Clarity
    14: 'SummonerIgnite', // Ignite
    21: 'SummonerBarrier', // Barrier
    30: 'SummonerPoroRecall', // Poro Recall
    31: 'SummonerPoroThrow', // Poro Throw
    32: 'SummonerMark', // Mark
    39: 'SummonerMark', // Mark
  };

  const spellName = spellMap[spellId] || 'SummonerFlash';
  const version = '14.24.1';
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spellName}.png`;
};

