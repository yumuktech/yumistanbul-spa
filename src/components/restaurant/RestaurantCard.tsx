import React from 'react';
import { formatPriceTier, formatRating } from '../../data/mappers';
import type { RestaurantListItem } from '../../data/schemas';
import './RestaurantCard.css';

export interface RestaurantCardProps {
  restaurant: RestaurantListItem;
  onClick?: () => void;
  className?: string;
}

/**
 * RestaurantCard component for displaying restaurant in grid/list
 * 
 * Accessibility:
 * - Semantic article element
 * - Click handler on card for navigation
 * - Alt text on images
 * - Color contrast meets WCAG AA
 */
export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onClick,
  className = '',
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <article
      className={`restaurant-card ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
    >
      <div className="restaurant-card__content">
        <div className="restaurant-card__header">
          <h2 className="restaurant-card__name">{restaurant.name}</h2>
          <div className="restaurant-card__badges">
            <span className="badge badge-rating">⭐ {formatRating(restaurant.rating)}</span>
            <span className="badge badge-price">{formatPriceTier(restaurant.priceTier)}</span>
          </div>
        </div>
        <div className="restaurant-card__district">{restaurant.location.district}</div>
        <div className="restaurant-card__features">
          {['alcohol','outdoor','meal','coffee','dessert']
            .filter(tag => restaurant.tags.includes(tag))
            .slice(0,3)
            .map(tag => (
              <span key={tag} className="restaurant-card__feature" aria-label={tag}>{tag}</span>
            ))}
        </div>
      </div>
    </article>
  );
};
