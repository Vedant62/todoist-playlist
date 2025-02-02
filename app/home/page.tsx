"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAllPlaylistItems } from "@/lib/api";
// import axios from "axios";
import { useSearchParams } from "next/navigation";
// import { getTodoistAuthUrl } from "@/utils/todoist";
// import { addPlaylistTask } from "@/lib/add_task";

export default function PlaylistInput() {
  const [playlistLink, setPlaylistLink] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");
  const searchParams = useSearchParams();

  // Handle OAuth callback
  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");
      const state = searchParams.get("state");

      if (code && state) {
        try {
          const response = await fetch("/api/auth", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
          });

          const data = await response.json();
          console.log("got this access token: ", data.access_token);
          setAccessToken(data.access_token);
        } catch (error) {
          console.error("OAuth error:", error);
        }
      }
    };

    handleCallback();
  }, [searchParams]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistLink(event.target.value);
  };

  const handleSubmit = async () => {
    const playlistId = playlistLink.split("=")[1];

    try {
      const playlistItems = await getAllPlaylistItems(playlistId);
      const taskList: string[] = [];
      playlistItems.forEach((task) => {
        taskList.push(task["snippet"]["title"]);
      });

      // Call our API route instead of Todoist directly
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: accessToken,
          taskList: taskList,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add tasks");
      }

      // Handle success (maybe show a success message or redirect)
      console.log("Tasks added successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
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
          {accessToken ? "Submit" : "Authorize with Todoist"}
        </Button>
      </div>
    </div>
  );
}
