const CLIENT_ID = "3778a4185f7c47179726d33fd0a8d0cc";
const REDIRECT_URI = "http://localhost:3000/callback";
const SCOPES = "user-read-private user-read-email";

export const getAuthUrl = () => {
  const url = new URL("https://accounts.spotify.com/authorize");
  url.searchParams.append("client_id", CLIENT_ID);
  url.searchParams.append("response_type", "token");
  url.searchParams.append("redirect_uri", REDIRECT_URI);
  url.searchParams.append("scope", SCOPES);
  return url.toString();
};

export const searchSpotify = async (query, token, limit = 30, offset = 0) => {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track,artist,album&limit=${limit}&offset=${offset}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};

export const getDetails = async (id, type, token) => {
  const response = await fetch(`https://api.spotify.com/v1/${type}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
