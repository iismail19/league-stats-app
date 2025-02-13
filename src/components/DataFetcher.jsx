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

  // Display each map to screen
  const MatchList = () => {
    if (!matches || matches.length === 0) {
      return <div>No matches found.</div>;
    }
    return matches.map((match) => {
      const teamId = getTeam(match);
      const win = getWinner(match, teamId) ? "Won" : "Lost";
      return (
        <div key={match.metadata.matchId}>
          <Card className="m-2" style={{ margin: "0.5rem", border: win === "Won" ? "2px solid green" : "2px solid red" }}>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Match Data for match Id: {match.metadata.matchId}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Team: {teamId} & Result: {win} </p>
            </CardContent>
            <CardFooter>
              <p>Game Mode: {match.info.gameMode}</p>
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
