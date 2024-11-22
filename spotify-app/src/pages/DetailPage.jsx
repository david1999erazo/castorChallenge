import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetails } from "../services/spotifyApi";

const DetailPage = ({ token }) => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const data = await getDetails(id, "tracks", token);
        setDetails(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error when fetch song details", error);
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [id, token]);

  const getArtistNames = (artists) => {
    return artists.map((artist) => artist.name).join(", ");
  };

  const getReleaseYear = (releaseDate) => {
    if (!releaseDate) return "";
    const year = new Date(releaseDate).getFullYear();
    return year;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
        <p className="ml-4 text-lg font-bold">Cargando...</p>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-bold">No se encontraron detalles.</p>
      </div>
    );
  }
  const imageUrl =
    details.album.images && details.album.images.length > 0
      ? details.album.images[0]?.url
      : "";

  const artistNames = getArtistNames(details.artists);
  const releaseYear = getReleaseYear(details.album.release_date);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={details.name}
            className="w-full h-64 object-contain rounded-lg mx-auto"
          />
        ) : (
          <p>No se encontró la imagen.</p>
        )}
        <h1 className="text-2xl font-bold text-center mt-4">{details.name}</h1>
        <p className="text-sm mt-2 text-gray-600">{artistNames}</p>
        <p className="text-sm mt-2 text-gray-600">{releaseYear}</p>
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
