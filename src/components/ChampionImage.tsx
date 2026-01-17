import { useState } from 'react';
import { getChampionImageUrl, getChampionImageUrlFallback } from '../utils/championImages';

interface ChampionImageProps {
  championName: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
};

export const ChampionImage = ({ championName, size = 'md', className = '' }: ChampionImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  if (imageError) {
    return (
      <div
        className={`${sizeClasses[size]} rounded bg-[#0f1419] flex items-center justify-center text-xs font-bold ${className}`}
      >
        {championName.substring(0, 3).toUpperCase()}
      </div>
    );
  }

  const imageUrl = useFallback 
    ? getChampionImageUrlFallback(championName)
    : getChampionImageUrl(championName);

  return (
    <img
      src={imageUrl}
      alt={championName}
      className={`${sizeClasses[size]} ${className || 'rounded'} object-cover`}
      onError={() => {
        if (!useFallback) {
          // Try fallback URL
          setUseFallback(true);
        } else {
          // Both failed, show placeholder
          console.warn(`Failed to load champion image for: ${championName}`, {
            primaryUrl: getChampionImageUrl(championName),
            fallbackUrl: getChampionImageUrlFallback(championName),
          });
          setImageError(true);
        }
      }}
      loading="lazy"
    />
  );
};

