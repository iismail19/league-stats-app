import { Match, TransformedMatchData } from "../types/matchTypes";

export const transformMatchData = (
  match: Match,
  puuid: string
): TransformedMatchData => {
  const participant = match.info.participants.find(
    (user) => user.puuid === puuid
  );
  if (!participant) {
    throw new Error("Participant not found in match data");
  }

  const teamId = participant.teamId;
  const win =
    match.info.teams.find((team) => team.teamId === teamId)?.win || false;
  const champion = participant.championName;
  const kills = participant.kills || 0;
  const deaths = participant.deaths || 0;
  const assists = participant.assists || 0;
  const kda =
    deaths === 0
      ? (kills + assists).toString()
      : ((kills + assists) / deaths).toFixed(2);

  const teamKills = match.info.participants
    .filter((user) => user.teamId === teamId)
    .reduce((total, user) => total + (user.kills || 0), 0);

  const killParticipation =
    teamKills > 0 ? Math.round(((kills + assists) / teamKills) * 100) : 0;
  const lane = participant.lane || "Unknown";
  const cs = participant.totalMinionsKilled ?? 0;
  const riotIdGameName = participant.riotIdGameName || "Unknown";

  return {
    matchId: match.metadata.matchId,
    gameMode: match.info.gameMode,
    win,
    champion,
    kills,
    deaths,
    assists,
    kda,
    killParticipation,
    photoUrl: `https://ddragon.leagueoflegends.com/cdn/15.9.1/img/champion/${champion}.png`,
    lane,
    cs,
    riotIdGameName,
    puuid,
  };
};
