import { PlaylistItem } from "./playlist_item";

export interface PlaylistItemsResponse {
    items: PlaylistItem[];
    nextPageToken?: string;
  }