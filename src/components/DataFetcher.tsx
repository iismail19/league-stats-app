import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import MatchCard from "./MatchCard";
import { transformMatchData } from "../utils/matchDataUtils";
import { Match } from "../types/matchTypes";
import { CardWithSearch } from "./ui/CardWithSearch";

const DataFetcher: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [puuid, setPuuid] = useState("");
  const [gameName, setGameName] = useState("");
  const [tagline, setTagline] = useState("");

  const fetchRiotId = async (gameName: string, tagline: string) => {
    const result = await fetch("http://localhost:5005/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameName, tagline }),
    });
    return result.json();
  };

  const matchDataList = useMutation({
    mutationFn: ({
      gameName,
      tagline,
    }: {
      gameName: string;
      tagline: string;
    }) => fetchRiotId(gameName, tagline),
    onSuccess: (data) => {
      setPuuid(data.puuid || "");
      setMatches(Array.isArray(data.matchDataList) ? data.matchDataList : []);
    },
  });

  const handleSearch = (gameNameInput: string, taglineInput: string) => {
    setGameName(gameNameInput);
    setTagline(taglineInput);
    matchDataList.mutate({ gameName: gameNameInput, tagline: taglineInput });
  };

  return (
    <div>
      <h1>Summoner Search</h1>
      <CardWithSearch onSearch={handleSearch} />
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
