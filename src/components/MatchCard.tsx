import React from "react";
import { TransformedMatchData } from "../types/matchTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface MatchCardProps {
  data: TransformedMatchData;
  gameName: string;
}

const MatchCard: React.FC<MatchCardProps> = ({ data, gameName }) => {
  return (
    <Card
      className="m-2"
      style={{
        margin: "0.5rem",
        border: data.win ? "2px solid green" : "2px solid red",
      }}
    >
      <CardHeader>
        <CardTitle>Match Summary</CardTitle>
        <CardDescription>Match ID: {data.matchId}</CardDescription>
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
              Kills: {data.kills} | Deaths: {data.deaths} | Assists:{" "}
              {data.assists}
            </p>
            <p className="text-sm text-gray-500">KDA: {data.kda}</p>
            <p className="text-sm text-gray-500">
              Kill Participation: {data.killParticipation}%
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-600">Game Mode: {data.gameMode}</p>
      </CardFooter>
    </Card>
  );
};

export default MatchCard;
