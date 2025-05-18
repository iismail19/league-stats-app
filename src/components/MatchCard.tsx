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
      <CardFooter>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Teams</AccordionTrigger>
            <AccordionContent>
              {Object.entries(teams).map(([teamId, players]) => (
                <Card key={teamId} className="mb-4">
                  <CardHeader>
                    <CardTitle>Team {teamId}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {players.map((player) => (
                      <div
                        key={player.puuid}
                        className="flex justify-between items-center border-b py-2"
                      >
                        <div className="flex items-center">
                          <img
                            src={`https://ddragon.leagueoflegends.com/cdn/15.9.1/img/champion/${player.championName}.png`}
                            alt={player.championName}
                            className="w-8 h-8 rounded mr-2"
                          />
                          <span className="text-sm font-medium">
                            {player.championName}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          K/D/A: {player.kills}/{player.deaths}/{player.assists}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  );
};

export default MatchCard;
