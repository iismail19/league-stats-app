import React from "react";
import { useMutation } from "@tanstack/react-query";
const DataFetcher = () => {
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
      console.log(data);
    },
  });

  // Display each map to screen
  const MatchList = (matches) => {
    return matches?.map((match) => {
      <div>{match.info.gameId}</div>;
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
      {" "}
      <h1>Fetched Data</h1> <p>{"Click button to get name"}</p>{" "}
      <button onClick={() => matchDataList.mutate()}>
        {" "}
        Get Matches for God of Wind{" "}
      </button>{" "}
    </div>
  );
};
export default DataFetcher;
