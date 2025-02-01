import { PlaylistItem } from "@/app/types/playlist_item";
import axios, { AxiosResponse } from "axios";
import { PlaylistItemsResponse } from "@/app/types/playlist_items_response";

export async function getAllPlaylistItems(
  playlistId: string
): Promise<PlaylistItem[]> {
  const allItems: PlaylistItem[] = [];
  let nextPageToken: string | undefined;
  const maxResults = 50; // Maximum allowed

  while (true) {
    let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${process.env.NEXT_PUBLIC_API_KEY}`;
    if (nextPageToken) {
      url += `&pageToken=${nextPageToken}`;
    }

    try {
      const response: AxiosResponse<PlaylistItemsResponse> = await axios.get(
        url
      );
      const data = response.data;

      allItems.push(...data.items);

      nextPageToken = data.nextPageToken;
      if (!nextPageToken) {
        break;
      }
    } catch (error) {
      console.error("Error fetching playlist items:", error);
      throw error;
    }
  }

  return allItems;
}
