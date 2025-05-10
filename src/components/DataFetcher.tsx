import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import MatchCard from "./MatchCard";
import { transformMatchData } from "../utils/matchDataUtils";
import { Match } from "../types/matchTypes";

const DataFetcher: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
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

  return (
    <div>
      <h1>Fetched Data</h1>
      <p>Click button to get name</p>
      <Button
        onClick={() => matchDataList.mutate()}
        disabled={matchDataList.isMutating}
      >
        {matchDataList.isMutating
          ? "Loading..."
          : "Get Matches for God of Wind"}
      </Button>
      <div>
        {matchDataList.isError && (
          <div>Error: {matchDataList.error.message}</div>
        )}
        {matches.length === 0 && !matchDataList.isMutating ? (
          <div>No matches found.</div>
        ) : (
          matches.map((match) => (
            <MatchCard
              key={match.metadata.matchId}
              data={transformMatchData(match, puuid)}
              gameName={gameName}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DataFetcher;
