import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { getCDNUrl } from '../utils/constants';

export interface GalleryImage {
  id: number;
  title: string;
  description: string;
  src: string;
  type: 'image' | 'video';
  thumbnail?: string; // Optional thumbnail for videos
}

interface GalleryCardProps {
  item: {
    id: number;
    category: string;
    title: string;
    description: string;
    images: GalleryImage[];
  };
  onImageClick: (images: GalleryImage[], initialIndex: number) => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, onImageClick }) => {
  const firstImage = item.images[0];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="group cursor-pointer"
      onClick={() => onImageClick(item.images, 0)}
    >
      <div className="relative overflow-hidden rounded-lg bg-gray-800 aspect-square">
        {/* Static Image Display */}
        <div className="absolute inset-0">
          {firstImage.type === 'video' ? (
            <div className="relative w-full h-full">
              <img
                src={getCDNUrl(firstImage.thumbnail || firstImage.src)}
                alt={firstImage.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                draggable={false}
                loading="lazy"
              />
              {/* Video Play Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-black/70 rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                </div>
              </div>
            </div>
          ) : (
            <img
              src={getCDNUrl(firstImage.src)}
              alt={firstImage.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              draggable={false}
              loading="lazy"
            />
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center text-white">
            <p className="text-sm mb-2">
              {firstImage.type === 'video' ? 'Click to play video' : 'Click to view gallery'}
            </p>
            {item.images.length > 1 && (
              <p className="text-xs text-gray-300">
                {item.images.length} images
              </p>
            )}
          </div>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-white font-semibold text-lg mb-1">
            {item.title}
          </h3>
          <p className="text-gray-300 text-sm mb-2">
            {item.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full">
              {item.category}
            </span>
            <div className="flex items-center space-x-2">
              {firstImage.type === 'video' && (
                <span className="text-gray-400 text-xs flex items-center">
                  <Play className="w-3 h-3 mr-1" />
                  Video
                </span>
              )}
              {item.images.length > 1 && (
                <span className="text-gray-400 text-xs">
                  {item.images.length} items
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryCard;