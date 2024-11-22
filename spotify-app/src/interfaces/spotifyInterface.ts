export interface SpotifyDetails {
  id: string;
  name: string;
  preview_url: string;
  images: { url: string }[];
  album: { images: { url: string }[] };
}
