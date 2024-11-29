import { StarIcon } from 'lucide-react';
import React from 'react';

interface ShowsDetailsModalProps {
  name: string;
  overview: string;
  first_air_date: string;
  posterPath: string;
  rating: number;
  onClose: () => void;
}

const ShowsDetailsModal: React.FC<ShowsDetailsModalProps> = ({
  name,
  posterPath,
  overview,
  first_air_date,
  rating,
  onClose,
}) => {
  const bannerUrl = `https://image.tmdb.org/t/p/original${posterPath}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-40 overflow-y-scroll">
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden max-w-4xl w-full relative shadow-xl m-5">
        <button
          onClick={onClose}
          className="absolute z-50 top-4 right-4 bg-transparent text-white rounded-full p-2 focus:outline-none"
        >
          <br />
          X
        </button>
      <div className=''>
        <div className="relative ">
          <img
            src={bannerUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
            <h2 className="text-white text-2xl font-bold">{name}</h2>
          </div>
        </div>
        <div className="flex p-6 space-y-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Release Date: {first_air_date}</h3>
          </div>
          <div className=" flex items-center bg-yellow-500 text-white text-sm font-bold px-2 py-1 rounded-full shadow-lg">
            <StarIcon className="w-4 h-4 mr-1" />
            {rating.toFixed(1)}
          </div>
        </div>

        <div className="p-6 space-y-4 " >
        <h3>Overview </h3>
          <p className="text-gray-700 dark:text-gray-300">{overview}</p>

          <div>
            <h3 className="text-lg font-semibold mb-2">Cast</h3>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ShowsDetailsModal;
