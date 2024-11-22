export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyDetails {
  name: string;
  images: SpotifyImage[];
  preview_url?: string;
}
