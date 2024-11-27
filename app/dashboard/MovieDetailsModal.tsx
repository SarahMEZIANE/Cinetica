import React from 'react';

interface MovieDetailsModalProps {
  title: string;
  bannerPath: string;
  overview: string;
  cast: { name: string; profilePath: string }[]; // Liste des acteurs
  onClose: () => void;
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
  title,
  bannerPath,
  overview,
  cast,
  onClose,
}) => {
  const bannerUrl = `https://image.tmdb.org/t/p/original${bannerPath}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden max-w-4xl w-full relative shadow-xl">
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 focus:outline-none"
        >
          ✕
        </button>

        {/* Bannière */}
        <div className="relative h-64">
          <img
            src={bannerUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
            <h2 className="text-white text-2xl font-bold">{title}</h2>
          </div>
        </div>

        {/* Détails */}
        <div className="p-6 space-y-4">
          <p className="text-gray-700 dark:text-gray-300">{overview}</p>

          {/* Acteurs */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Cast</h3>
            <div className="flex space-x-4 overflow-x-auto">
              {cast.map((actor, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profilePath}`}
                    alt={actor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <p className="text-sm mt-2 text-center">{actor.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;
