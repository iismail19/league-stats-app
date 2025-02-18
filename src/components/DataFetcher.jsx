import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const DataFetcher = () => {
  const [matches, setMatches] = useState([]);
  const [puuid, setPuuid] = useState("");
  const [gameName, setGameName] = useState("God of Wind"); // get from result of fetchRiotId todo update later

  const fetchRiotId = async () => {
    const result = await fetch("http://localhost:5005/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameName: "God of Wind", tagline: "NA1" }),
    });
    console.log(JSON.stringify({ gameName: "God of Wind", tagline: "NA1" }));
    return result.json();
  };

  const matchDataList = useMutation({
    mutationFn: fetchRiotId,
    onSuccess: (data) => {
      console.log("Fetched data:", data); // Log the fetched data
      setPuuid(data.puuid ? data.puuid : "");
      setMatches(Array.isArray(data.matchDataList) ? data.matchDataList : []); // Ensure matches is an array
    },
  });

  function getTeam(match) {
    if (match && match.info && match.info.participants) {
      const participant = match.info.participants.find(
        (user) => user.puuid === puuid
      );
      if (participant) {
        return participant.teamId; // 100 or 200
      }
    }
    return null;
  }

  function getWinner(match, teamId) {
    if (match && match.info && match.info.teams) {
      const team = match.info.teams.find((team) => team.teamId === teamId);
      if (team) {
        return team.win;
      }
    }
    return null;
  }

  // Display each map to screen - create a list of cards
  const MatchList = () => {
    if (!matches || matches.length === 0) {
      return <div>No matches found.</div>;
    }
    return matches.map((match) => {
      const teamId = getTeam(match);
      const win = getWinner(match, teamId) ? "Won" : "Lost";
      return (
        <div key={match.metadata.matchId}>
          <Card
            className="m-2"
            style={{
              margin: "0.5rem",
              border: win === "Won" ? "2px solid green" : "2px solid red",
            }}
          >
            <CardHeader>
              <CardTitle>Match Summary</CardTitle>
              <CardDescription>
                Match ID: {match.metadata.matchId}
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
                    src={"https://placehold.co/100x100/png"}
                    alt="PlaceHolder"
                  />
                </div>
                <div className="flex-1 px-4 min-w-0">
                  <p className="text-sm font-medium truncate">{gameName}</p>
                </div>
                <div className="w-32 flex-shrink-0">
                  <p className="text-sm text-gray-500">Stats Go here</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-600">
                Game Mode: {match.info.gameMode}
              </p>
            </CardFooter>
          </Card>
        </div>
      );
    });
  };

  if (matchDataList.isLoading) {
    return <div>Loading...</div>;
  }
  if (matchDataList.isError) {
    return <div>Error: {matchDataList.error.message}</div>;
  }
  return (
    <div>
      <h1>Fetched Data</h1>
      <p>Click button to get name</p>
      <Button onClick={() => matchDataList.mutate()}>
        Get Matches for God of Wind
      </Button>
      <MatchList /> {/* Call the MatchList function to render matches */}
    </div>
  );
};

export default DataFetcher;
