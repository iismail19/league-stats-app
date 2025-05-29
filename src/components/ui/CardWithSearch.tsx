import React, { useState } from "react";
import { Card, CardContent } from "./card";
import { Input } from "@/components/ui/input";

interface CardWithSearchProps {
  onSearch: (gameName: string, tagline: string) => void;
}

export function CardWithSearch({ onSearch }: CardWithSearchProps) {
  const [gameName, setGameName] = useState("");
  const [tagline, setTagline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(gameName, tagline);
  };

  return (
    <Card className="w-[400px] bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Input
              id="name"
              placeholder="Game Name"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              className="flex-[2] bg-gray-700 text-white border-gray-600 placeholder:text-gray-400 focus:border-blue-500"
            />
            <Input
              id="tag"
              placeholder="#NA1"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="flex-1 bg-gray-700 text-white border-gray-600 placeholder:text-gray-400 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="h-8 w-[80px] rounded-md bg-blue-600 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400"
            >
              Get Stats
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
