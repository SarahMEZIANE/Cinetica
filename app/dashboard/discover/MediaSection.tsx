import React from 'react';
import { MediaItem, MediaCollection } from './MediaCollection';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { SectionHeader } from './SectionHeader';
import { MediaSlider } from './MediaSlider';

interface MediaSectionProps {
  title: string;
  collections: MediaCollection[];
  onItemClick: (item: MediaItem) => void;
}

export const MediaSection: React.FC<MediaSectionProps> = ({ 
  title, 
  collections, 
  onItemClick 
}) => {
  const normalizeMediaItem = (item: MediaItem) => {
    if ('title' in item) {
      return {
        ...item,
        name: item.title,
        first_air_date: item.release_date
      };
    }
    return item;
  };

  return (
    <section className="py-6">
      <h1 className="text-3xl font-bold mb-8 px-4 dark:text-white">{title}</h1>
      
      <div className="space-y-12">
        {collections.map((collection, index) => (
          <div key={`${collection.title}-${index}`} className="relative">
            {collection.loading ? (
              <LoadingSpinner />
            ) : collection.error ? (
              <ErrorMessage message={collection.error} />
            ) : collection.items.length === 0 ? (
              <div className="flex items-center justify-center h-48 text-gray-500 dark:text-gray-400">
                No items available
              </div>
            ) : (
              <div>
                <SectionHeader 
                  title={collection.title} 
                />
                <MediaSlider
                  title={collection.title}
                  items={collection.items.map(normalizeMediaItem)}
                  onItemClick={onItemClick}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MediaSection;