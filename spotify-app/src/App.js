import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import DetailPage from "./pages/DetailPage";
import { getAuthUrl } from "./services/spotifyApi";
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get("access_token");
      if (accessToken) {
        setToken(accessToken);
        window.history.replaceState({}, document.title, "/");
        navigate("/");
      }
    }
  }, [navigate]);

  const handleLogin = () => {
    const authUrl = getAuthUrl();
    window.location.href = authUrl;
  };

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <i className="fab fa-spotify text-green-500 text-8xl"></i>

        <button
          onClick={handleLogin}
          className="bg-green-500 text-white px-6 py-3 rounded mt-4"
        >
          Iniciar sesión con Spotify
        </button>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home token={token} />} />
      <Route path="/details/:id" element={<DetailPage token={token} />} />
    </Routes>
  );
};

export default App;
