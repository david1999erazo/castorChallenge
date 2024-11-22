import React, { useState, useEffect } from "react";
import { getAuthUrl } from "./services/spotifyApi";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DetailPage from "./pages/DetailPage";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("spotify_token"));

  const handleLogin = () => {
    window.location.href = getAuthUrl();
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.replace("#", ""));
      const accessToken = params.get("access_token");
      if (accessToken) {
        localStorage.setItem("spotify_token", accessToken); // Guardar token
        setToken(accessToken);
        window.location.hash = ""; // Limpiar el hash de la URL
      }
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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home token={token} />} />
        <Route path="/details/:id" element={<DetailPage token={token} />} />
      </Routes>
    </Router>
  );
};

export default App;
