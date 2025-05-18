export interface Participant {
  puuid: string;
  teamId: number;
  championName: string;
  kills: number;
  deaths: number;
  assists: number;
}

export interface Team {
  teamId: number;
  win: boolean;
}

export interface Match {
  metadata: {
    matchId: string;
  };
  info: {
    gameMode: string;
    participants: Participant[];
    teams: Team[];
    queueId: number;
  };
}

export interface TransformedMatchData {
  matchId: string;
  gameMode: string;
  win: boolean;
  champion: string;
  kills: number;
  deaths: number;
  assists: number;
  kda: string;
  killParticipation: number;
  photoUrl: string;
}

export interface PlayerRow {
  puuid: string;
  championName: string;
  kills: number;
  deaths: number;
  assists: number;
  win: boolean;
  teamId: number;
}
