"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAllPlaylistItems } from "@/lib/api";
import { getTodoistAuthUrl } from "@/utils/todoist";

export default function PlaylistInput() {
  const [playlistLink, setPlaylistLink] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistLink(event.target.value);
  };

  // const handleAuthSubmit = async () => {
    
  // }

  const handleSubmit = async () => {
    console.log(playlistLink);

    const playlistId = playlistLink.split("=")[1];
    console.log(playlistId);

    try {
      const playlistItems = await getAllPlaylistItems(playlistId);
      //todo: add functionality for todoist here
      playlistItems.forEach((item) => {
        console.log(item["snippet"]["title"]);
      });
    } catch (error) {
      console.error("Error fetching playlist:", error);
    }

    window.location.href = getTodoistAuthUrl();
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
        {/* <Button onClick={handleAuthSubmit} className="w-full">
          Authorise to Todoist
        </Button> */}
        <Button onClick={handleSubmit} className="w-full">
          Submit
        </Button>
      </div>
    </div>
  );
}
