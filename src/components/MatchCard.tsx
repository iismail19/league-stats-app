import React from "react";
import { Match, TransformedMatchData } from "../types/matchTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
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
      <CardFooter></CardFooter>
    </Card>
  );
};

export default MatchCard;
