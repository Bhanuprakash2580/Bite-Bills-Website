import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export const StarRating = ({ rating, size = 16, className }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          size={size}
          className="fill-gold text-gold"
        />
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <div className="relative">
          <Star size={size} className="text-muted-foreground" />
          <Star
            size={size}
            className="fill-gold text-gold absolute inset-0"
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          />
        </div>
      )}

      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          size={size}
          className="text-muted-foreground"
        />
      ))}
    </div>
  );
};