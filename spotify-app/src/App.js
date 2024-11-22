import React, { useState, useEffect } from "react";
import { getAuthUrl } from "./services/spotifyApi";
import Home from "./pages/Home";

const App = () => {
  const [token, setToken] = useState(null);

  const handleLogin = () => {
    window.location.href = getAuthUrl();
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.replace("#", ""));
      setToken(params.get("access_token"));
    }
  }, []);

  if (!token) {
    return (
      <div className="flex items-center justify-center h-screen">
        <button
          onClick={handleLogin}
          className="bg-green-500 text-white px-6 py-3 rounded"
        >
          Iniciar sesión con Spotify
        </button>
      </div>
    );
  }

  return <Home token={token} />;
};

export default App;
