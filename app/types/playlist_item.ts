export interface PlaylistItem {
  snippet: {
    title: string;
    description: string;
    resourceId: {
      videoId: string;
    };
  };
}