import React, { useState } from "react";

import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Input } from "@/components/ui/input";
import { Label } from "./label";

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
    <Card className="w-[350px] bg-cambridge-blue-400">
      <CardHeader>
        <CardTitle className="text-viridian-900">
          Enter Game Name + Tag
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-1.5">
            <div className="flex space-x-2">
              <Input
                id="name"
                placeholder="Game Name"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                className="bg-ash-gray-200 text-viridian-900 placeholder:text-viridian-600"
              />
              <Input
                id="tag"
                placeholder="#NA1"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              />
            </div>
          </div>
          <CardFooter className="flex justify-between mt-4">
            <Button
              type="submit"
              className="bg-spring-green hover:bg-spring-green-600 text-white"
            >
              Get Stats
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
