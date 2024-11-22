import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetails } from "../services/spotifyApi";

const DetailPage = ({ token }) => {
  const { id } = useParams(); // Obtiene el id de la URL
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getDetails(id, "tracks", token); // Usa el id para obtener los detalles de la canción
      console.log(data);

      setDetails(data);
    };
    fetchDetails();
  }, [id, token]);

  if (!details) return <p>Cargando...</p>;

  // Verifica si images existe antes de intentar acceder a la primera imagen
  const imageUrl =
    details.album.images && details.album.images.length > 0
      ? details.album.images[0]?.url
      : "";

  return (
    <div className="p-6">
      {imageUrl ? (
        <img src={imageUrl} alt={details.name} className="w-1/2 mx-auto" />
      ) : (
        <p>No se encontró la imagen.</p>
      )}
      <h1 className="text-3xl font-bold mt-4">{details.name}</h1>
      <audio controls src={details.preview_url} className="mt-4 w-full">
        Tu navegador no soporta el reproductor de audio.
      </audio>
    </div>
  );
};

export default DetailPage;
