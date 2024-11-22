import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetails } from "../services/spotifyApi";

const DetailPage = ({ token }) => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getDetails(id, "tracks", token);
      setDetails(data);
    };
    fetchDetails();
  }, [id, token]);

  if (!details) return <p>Cargando...</p>;

  const imageUrl =
    details.album.images && details.album.images.length > 0
      ? details.album.images[0]?.url
      : "";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={details.name}
            className="w-full h-64 object-cover rounded-lg mx-auto"
          />
        ) : (
          <p>No se encontró la imagen.</p>
        )}
        <h1 className="text-2xl font-bold text-center mt-4">{details.name}</h1>
        <audio
          controls
          src={details.preview_url}
          className="mt-4 w-full rounded-md bg-gray-100"
        >
          Tu navegador no soporta el reproductor de audio.
        </audio>
      </div>
    </div>
  );
};

export default DetailPage;
