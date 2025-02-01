"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Axios } from "axios";

export default function PlaylistInput() {
  const [playlistLink, setPlaylistLink] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistLink(event.target.value);
  };

  const handleSubmit = () => {
    console.log(playlistLink);
    // Here you would add your logic to process the playlist link
    const playlistId = playlistLink.split("=")[1];
    console.log(playlistId);

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-sm">
        <h1 className="text-xl font-medium text-center text-gray-700 mb-6">
          Paste your playlist link
        </h1>
        <Input
          type="text"
          placeholder="https://www.youtube.com/playlist?list=..."
          className="w-full mb-4"
          value={playlistLink}
          onChange={handleInputChange}
        />
        <Button onClick={handleSubmit} className="w-full">
          Submit
        </Button>
      </div>
    </div>
  );
}
