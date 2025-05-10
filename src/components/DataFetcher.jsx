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

// Utility functions for match data
const getParticipant = (match, puuid) =>
  match?.info?.participants?.find((user) => user.puuid === puuid);

const getTeam = (match, puuid) => getParticipant(match, puuid)?.teamId || null;

const getWinner = (match, teamId) =>
  match?.info?.teams?.find((team) => team.teamId === teamId)?.win || null;

const getChampion = (match, puuid) =>
  getParticipant(match, puuid)?.championName || null;

const getKills = (match, puuid) => getParticipant(match, puuid)?.kills || 0;

const getDeaths = (match, puuid) => getParticipant(match, puuid)?.deaths || 0;

const getAssists = (match, puuid) => getParticipant(match, puuid)?.assists || 0;

const calculateKda = (kills, deaths, assists) =>
  deaths === 0 ? kills + assists : ((kills + assists) / deaths).toFixed(2);

const getKillParticipation = (match, puuid) => {
  const participant = getParticipant(match, puuid);
  if (participant) {
    const teamId = participant.teamId;
    const teamKills = match.info.participants
      .filter((user) => user.teamId === teamId)
      .reduce((total, user) => total + user.kills, 0);

    if (teamKills > 0) {
      const playerContributions = participant.kills + participant.assists;
      return Math.round((playerContributions / teamKills) * 100);
    }
  }
  return 0;
};

// MatchCard Component
const MatchCard = ({ match, puuid, gameName }) => {
  const teamId = getTeam(match, puuid);
  const win = getWinner(match, teamId) ? "Won" : "Lost";
  const champion = getChampion(match, puuid);
  const kills = getKills(match, puuid);
  const deaths = getDeaths(match, puuid);
  const assists = getAssists(match, puuid);
  const kda = calculateKda(kills, deaths, assists);
  const killParticipation = getKillParticipation(match, puuid);
  const photoUrl = `https://ddragon.leagueoflegends.com/cdn/15.9.1/img/champion/${champion}.png`;

  return (
    <Card
      className="m-2"
      style={{
        margin: "0.5rem",
        border: win === "Won" ? "2px solid green" : "2px solid red",
      }}
    >
      <CardHeader>
        <CardTitle>Match Summary</CardTitle>
        <CardDescription>Match ID: {match.metadata.matchId}</CardDescription>
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
              src={photoUrl}
              alt="Champion"
            />
          </div>
          <div className="flex-1 px-4 min-w-0">
            <p className="text-sm font-medium truncate">{gameName}</p>
          </div>
          <div className="w-32 flex-shrink-0">
            <p className="text-sm text-gray-500">
              Kills: {kills} | Deaths: {deaths} | Assists: {assists}
            </p>
            <p className="text-sm text-gray-500">KDA: {kda}</p>
            <p className="text-sm text-gray-500">
              Kill Participation: {killParticipation}%
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-600">
          Game Mode: {match.info.gameMode}
        </p>
      </CardFooter>
    </Card>
  );
};

// Main DataFetcher Component
const DataFetcher = () => {
  const [matches, setMatches] = useState([]);
  const [puuid, setPuuid] = useState("");
  const [gameName, setGameName] = useState("God of Wind");

  const fetchRiotId = async () => {
    const result = await fetch("http://localhost:5005/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameName: "God of Wind", tagline: "NA1" }),
    });
    return result.json();
  };

  const matchDataList = useMutation({
    mutationFn: fetchRiotId,
    onSuccess: (data) => {
      setPuuid(data.puuid || "");
      setMatches(Array.isArray(data.matchDataList) ? data.matchDataList : []);
    },
  });

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
      <div>
        {matches.length === 0 ? (
          <div>No matches found.</div>
        ) : (
          matches.map((match) => (
            <MatchCard
              key={match.metadata.matchId}
              match={match}
              puuid={puuid}
              gameName={gameName}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DataFetcher;
