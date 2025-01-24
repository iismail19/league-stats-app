import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

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
    if (match) {
      const teamId = match.info.participants.find((user) => user.puuid === puuid).teamId;
      return teamId;
    }
    return null;
  }

  function getWinner(match, teamId) {
      if (match) {
        const win = match.info.teams.find((team) => team.teamId === teamId).win;
        return win;
      }
      return null
  }

  // Display each map to screen
  const MatchList = () => {
    if (!matches || matches.length === 0) {
      return <div>No matches found.</div>;
    }
    return matches.map((match) => {
      const teamId = getTeam(match);
      const win = getWinner(match, teamId) ? "Won" : "Lost";
      return <div key={match.metadata.matchId}>{match.metadata.matchId} and {teamId} and {win} </div>;
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
      <button onClick={() => matchDataList.mutate()}>
        Get Matches for God of Wind
      </button>
      <MatchList /> {/* Call the MatchList function to render matches */}
    </div>
  );
};

export default DataFetcher;
