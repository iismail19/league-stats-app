import React from "react";
import { Match, TransformedMatchData, PlayerRow } from "../types/matchTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import queueData from "../data/queue.json";
import { Queue } from "../types/queueTypes";
import styles from "../styles/MatchCard.module.css";

interface MatchCardProps {
  data: TransformedMatchData;
  matchData: Match;
  gameName: string;
}

const MatchCard: React.FC<MatchCardProps> = ({ data, matchData, gameName }) => {
  // Find the queue description based on the queueId
  const queue: Queue | undefined = queueData.find(
    (q) => q.queueId === Number(matchData.info.queueId)
  );

  const queueDescription = queue ? queue.description : "Unknown Queue";

  // Group players by teamId
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
      };

      if (!acc[player.teamId]) {
        acc[player.teamId] = [];
      }
      acc[player.teamId].push(playerRow);
      return acc;
    },
    {}
  );

  return (
    <Card
      className="m-2 w-full"
      style={{
        margin: "0.5rem",
        border: data.win ? "2px solid green" : "2px solid red",
      }}
    >
      <CardHeader>
        <CardTitle>{gameName}</CardTitle>
        <p>{data.matchId}</p>
        <CardDescription>
          {data.win ? "Victory" : "Defeat"} - {queueDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="w-full"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="w-14 h-14 flex-shrink-0">
            <img
              className="w-full h-full object-cover rounded"
              src={data.photoUrl}
              alt="Champion"
            />
          </div>
          <div className="flex-1 px-4 min-w-0">
            <p className="text-sm font-medium truncate">{gameName}</p>
          </div>
          <div className="w-32 flex-shrink-0">
            <p className="text-sm text-gray-500">
              ⚔️: {data.kills} | ☠️: {data.deaths} | 🤝: {data.assists}
            </p>
            <p className="text-sm text-gray-500">KDA: {data.kda}</p>
            <p className="text-sm text-gray-500">
              Kill/Par: {data.killParticipation}%
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="w-full block">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Teams</AccordionTrigger>
            <AccordionContent>
              <div className={`${styles.teamContainer} my-4 px-4`}>
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
                        border: `2px solid ${
                          isWinningTeam ? "#4ade80" : "#ef4444"
                        }`,
                        background: isMyTeam
                          ? "rgba(59, 130, 246, 0.1)"
                          : "transparent",
                      }}
                    >
                      <div className="p-4">
                        <h3 className="font-semibold mb-4 text-center flex items-center justify-center gap-2">
                          Team {teamId === 100 ? "Blue" : "Red"}
                          {isMyTeam && (
                            <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">
                              Your Team
                            </span>
                          )}
                        </h3>
                        <div className="space-y-2">
                          {(teams[teamId] || []).map((player) => (
                            <div
                              key={player.puuid}
                              className={`${styles.playerRow} ${
                                player.puuid === data.puuid
                                  ? "bg-blue-50 -mx-4 px-4"
                                  : ""
                              }`}
                            >
                              <div className={styles.championIcon}>
                                <img
                                  src={`https://ddragon.leagueoflegends.com/cdn/15.9.1/img/champion/${player.championName}.png`}
                                  alt={player.championName}
                                  className="w-full h-full object-cover rounded"
                                />
                              </div>

                              <div className={styles.playerInfo}>
                                <p
                                  className={
                                    player.puuid === data.puuid
                                      ? "font-semibold"
                                      : ""
                                  }
                                >
                                  {player.championName}
                                </p>

                                <div className={styles.stats}>
                                  <p className="text-sm text-gray-500">
                                    ⚔️: {player.kills} | ☠️: {player.deaths} |
                                    🤝: {player.assists}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    KDA:{" "}
                                    {(
                                      (player.kills + player.assists) /
                                      Math.max(1, player.deaths)
                                    ).toFixed(2)}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Kill/Par:{" "}
                                    {Math.round(
                                      ((player.kills + player.assists) /
                                        Math.max(
                                          1,
                                          teams[teamId].reduce(
                                            (sum, p) => sum + p.kills,
                                            0
                                          )
                                        )) *
                                        100
                                    )}
                                    %
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  );
};

export default MatchCard;
