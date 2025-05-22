import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import MatchCard from "./MatchCard";
import { transformMatchData } from "../utils/matchDataUtils";
import { Match } from "../types/matchTypes";
import { CardWithSearch } from "./ui/CardWithSearch";

const DataFetcher: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [puuid, setPuuid] = useState("");
  const [gameName, setGameName] = useState("");
  const [tagline, setTagline] = useState("");
  const [failedMatches, setFailedMatches] = useState<string[]>([]);
  const [unresolvedFailedMatches, setUnresolvedFailedMatches] = useState<
    string[]
  >([]);

  const fetchRiotId = async (gameName: string, tagline: string) => {
    const result = await fetch("http://localhost:5005/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameName, tagline }),
    });
    return result.json();
  };

  const pollForRetriedMatch = (matchId: string) => {
    fetch(`http://localhost:5005/retried-match/${matchId}`).then(
      async (res) => {
        if (res.ok) {
          const data = await res.json();
          if (data.match) {
            setMatches((prev) => [...prev, data.match]);
            setFailedMatches((prev) => prev.filter((id) => id !== matchId));
          } else {
            setUnresolvedFailedMatches((prev) => [...prev, matchId]);
            setFailedMatches((prev) => prev.filter((id) => id !== matchId));
          }
        } else {
          setUnresolvedFailedMatches((prev) => [...prev, matchId]);
          setFailedMatches((prev) => prev.filter((id) => id !== matchId));
        }
      }
    );
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
      setFailedMatches(
        Array.isArray(data.failedMatches) ? data.failedMatches : []
      );
      (data.failedMatches || []).forEach((matchId: string) => {
        pollForRetriedMatch(matchId);
      });
    },
  });

  const handleSearch = (gameNameInput: string, taglineInput: string) => {
    setGameName(gameNameInput);
    setTagline(gameNameInput);
    setUnresolvedFailedMatches([]);
    matchDataList.mutate({ gameName: gameNameInput, tagline: taglineInput });
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl px-2">
      <CardWithSearch onSearch={handleSearch} />
      <div className="flex flex-col w-full gap-4 mt-4">
        {matchDataList.isError && (
          <div>Error: {matchDataList.error.message}</div>
        )}
        {matches.length === 0 && !matchDataList.isMutating && puuid && (
          <div>No matches found.</div>
        )}
        {matches.map((match) => (
          <MatchCard
            key={match.metadata.matchId}
            data={transformMatchData(match, puuid)}
            gameName={gameName}
            matchData={match}
          />
        ))}
        {failedMatches.length > 0 && (
          <div className="text-yellow-600 mt-4">
            Retrying {failedMatches.length} failed match
            {failedMatches.length > 1 ? "es" : ""}...
          </div>
        )}
        {unresolvedFailedMatches.length > 0 && (
          <div className="text-red-600 mt-4">
            Unable to retrieve {unresolvedFailedMatches.length} match
            {unresolvedFailedMatches.length > 1 ? "es" : ""} after retry.
          </div>
        )}
      </div>
    </div>
  );
};

export default DataFetcher;
