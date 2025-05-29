import React from "react";
import { Match, TransformedMatchData, PlayerRow } from "../types/matchTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import queueData from "../data/queue.json";
import { Queue } from "../types/queueTypes";
import styles from "../styles/MatchCard.module.css";

interface MatchCardProps {
  data: TransformedMatchData;
  matchData: Match;
  gameName: string;
}

const MatchCard: React.FC<MatchCardProps> = ({ data, matchData, gameName }) => {
  const queue = queueData.find(
    (q) => q.queueId === Number(matchData.info.queueId)
  );
  const queueDescription = queue?.description || "Unknown Queue";

  const teams = matchData.info.participants.reduce(
    (acc: Record<number, PlayerRow[]>, player) => {
      const playerRow: PlayerRow = {
        puuid: player.puuid,
        championName: player.championName,
        kills: player.kills,
        deaths: player.deaths,
        assists: player.assists,
        win:
          matchData.info.teams.find((team) => team.teamId === player.teamId)
            ?.win || false,
        teamId: player.teamId,
        lane: player.lane || "Unknown",
        cs: player.totalMinionsKilled ?? 0,
        riotIdGameName: player.riotIdGameName || "Unknown",
      };

      if (!acc[player.teamId]) {
        acc[player.teamId] = [];
      }
      acc[player.teamId].push(playerRow);
      return acc;
    },
    {}
  );

  const getWinGradient = () =>
    "linear-gradient(135deg, #A7C957 0%, #86A347 100%)";
  const getLossGradient = () =>
    "linear-gradient(135deg, #BC4749 0%, #A13E40 100%)";

  return (
    <Card
      className={`${styles.mainCard}`}
      style={{
        background: data.win ? getWinGradient() : getLossGradient(),
        color: "white",
      }}
    >
      <CardHeader className="py-2 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12">
              <img
                className="w-full h-full rounded-lg shadow-md"
                src={data.photoUrl}
                alt="Champion"
              />
            </div>
            <div>
              <CardTitle className="text-lg font-bold mb-0">
                {data.win ? "Victory" : "Defeat"} - {queueDescription}
              </CardTitle>
              <CardDescription className="text-white/90 text-sm">
                {data.lane} • {gameName}
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">
              {data.kills}/{data.deaths}/{data.assists}
            </div>
            <div className="text-sm text-white/90">
              KDA {data.kda} • CS {data.cs}
            </div>
          </div>
        </div>
      </CardHeader>

      <div className={styles.footer}>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="w-full">Teams</AccordionTrigger>
            <AccordionContent>
              <div className={styles.teamContainer}>
                {[100, 200].map((teamId) => {
                  const isWinningTeam = teams[teamId]?.[0]?.win;
                  const isMyTeam = teams[teamId]?.some(
                    (player) => player.puuid === data.puuid
                  );

                  return (
                    <div
                      key={teamId}
                      className={styles.teamCard}
                      style={{
                        background: isMyTeam
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      <div className={styles.teamHeader}>
                        <h3 className="text-sm font-semibold">
                          Team {teamId === 100 ? "Blue" : "Red"}
                        </h3>
                      </div>
                      <div className={styles.teamPlayers}>
                        {(teams[teamId] || []).map((player) => (
                          <div
                            key={player.puuid}
                            className={`${styles.playerRow} ${
                              player.puuid === data.puuid ? "bg-white/10" : ""
                            }`}
                          >
                            <div className={styles.championIcon}>
                              <img
                                src={`https://ddragon.leagueoflegends.com/cdn/15.9.1/img/champion/${player.championName}.png`}
                                alt={player.championName}
                                className="w-full h-full object-cover rounded-md"
                              />
                            </div>

                            <div className={styles.playerInfo}>
                              <div>
                                <p className={styles.championName}>
                                  {player.riotIdGameName}
                                </p>
                                <p className={styles.lane}>{player.lane}</p>
                              </div>

                              <div className={styles.stats}>
                                <p className="text-sm font-medium">
                                  {player.kills}/{player.deaths}/
                                  {player.assists}
                                </p>
                                <p className="text-xs text-white/70">
                                  CS: {player.cs}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Card>
  );
};

export default MatchCard;
