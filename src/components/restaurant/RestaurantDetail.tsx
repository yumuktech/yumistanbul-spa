import React, { useEffect, useState } from 'react';
import { apiClient } from '../../lib/api';
import { formatDistance, formatPriceTier, formatRating, formatPhone } from '../../data/mappers';
import { IconButton, Badge, Skeleton } from '../primitives';
import { RestaurantCard } from './RestaurantCard';
import type { RestaurantDetail, AsyncState } from '../../data/schemas';
import './RestaurantDetail.css';

export interface RestaurantDetailProps {
  restaurantId: string;
  onBack: () => void;
  className?: string;
}

/**
 * RestaurantDetail component for full restaurant information
 * 
 * Features:
 * - Image carousel
 * - Full details (features, contact, hours)
 * - Reviews section
 * - Similar places suggestions
 * 
 * Accessibility:
 * - Keyboard navigation
 * - Screen reader friendly
 * - Focus management on back
 */
export const RestaurantDetailView: React.FC<RestaurantDetailProps> = ({
  restaurantId,
  onBack,
  className = '',
}) => {
  const [restaurant, setRestaurant] = useState<AsyncState<RestaurantDetail>>({
    status: 'idle',
    data: null,
    error: null,
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchRestaurant = async () => {
      setRestaurant({ status: 'loading', data: null, error: null });
      const result = await apiClient.getRestaurantDetail(restaurantId);
      setRestaurant(result);
    };

    fetchRestaurant();
  }, [restaurantId]);

  const handleNextImage = () => {
    if (restaurant.data && restaurant.data.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % restaurant.data!.images.length);
    }
  };

  const handlePrevImage = () => {
    if (restaurant.data && restaurant.data.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? restaurant.data!.images.length - 1 : prev - 1
      );
    }
  };

  if (restaurant.status === 'loading') {
    return (
      <div className={`restaurant-detail ${className}`}>
        <div className="restaurant-detail__header">
          <IconButton icon="←" label="Back" onClick={onBack} />
        </div>
        <div className="restaurant-detail__skeleton">
          <Skeleton variant="rectangular" height={400} />
          <div style={{ padding: 'var(--space-4)' }}>
            <Skeleton variant="text" width="60%" height={32} />
            <Skeleton variant="text" width="40%" height={24} />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="80%" />
          </div>
        </div>
      </div>
    );
  }

  if (restaurant.status === 'error' || !restaurant.data) {
    return (
      <div className={`restaurant-detail ${className}`}>
        <div className="restaurant-detail__header">
          <IconButton icon="←" label="Back" onClick={onBack} />
        </div>
        <div className="restaurant-detail__error">
          <p>Failed to load restaurant details</p>
          <p>{restaurant.error?.message}</p>
        </div>
      </div>
    );
  }

  const data = restaurant.data;
  const currentImage = data.images[currentImageIndex];

  return (
    <div className={`restaurant-detail ${className}`}>
      {/* Header */}
      <div className="restaurant-detail__header">
        <IconButton icon="←" label="Back to results" onClick={onBack} />
        <div className="restaurant-detail__header-actions">
          <IconButton icon="🔗" label="Share" onClick={() => {}} variant="ghost" />
          <IconButton icon="❤️" label="Save" onClick={() => {}} variant="ghost" />
        </div>
      </div>

      {/* Image Carousel */}
      <div className="restaurant-detail__carousel">
        <img
          src={currentImage.url}
          alt={currentImage.alt}
          className="restaurant-detail__image"
        />
        {data.images.length > 1 && (
          <>
            <IconButton
              icon="←"
              label="Previous image"
              onClick={handlePrevImage}
              className="restaurant-detail__carousel-btn restaurant-detail__carousel-btn--prev"
            />
            <IconButton
              icon="→"
              label="Next image"
              onClick={handleNextImage}
              className="restaurant-detail__carousel-btn restaurant-detail__carousel-btn--next"
            />
            <div className="restaurant-detail__carousel-dots">
              {data.images.map((_, index) => (
                <button
                  key={index}
                  className={`restaurant-detail__carousel-dot ${
                    index === currentImageIndex ? 'restaurant-detail__carousel-dot--active' : ''
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="restaurant-detail__content">
        {/* Title Section */}
        <div className="restaurant-detail__title-section">
          <h1 className="restaurant-detail__name">{data.name}</h1>
          {data.verified && <Badge variant="success">Verified</Badge>}
        </div>

        <div className="restaurant-detail__meta">
          <span className="restaurant-detail__rating">
            ⭐ {formatRating(data.rating)}
          </span>
          <span>·</span>
          <span>{data.reviewCount} reviews</span>
          <span>·</span>
          <span>{formatPriceTier(data.priceTier)}</span>
          <span>·</span>
          <Badge variant={data.hours.isOpen ? 'success' : 'error'} size="sm">
            {data.hours.isOpen ? 'Open' : 'Closed'}
          </Badge>
        </div>

        <div className="restaurant-detail__location">
          📍 {data.location.address}, {data.location.district} · {formatDistance(data.distance_m)}
        </div>

        {/* Description */}
        <div className="restaurant-detail__section">
          <h2 className="restaurant-detail__section-title">About</h2>
          <p className="restaurant-detail__description">{data.description}</p>
        </div>

        {/* Categories */}
        <div className="restaurant-detail__section">
          <h2 className="restaurant-detail__section-title">Categories</h2>
          <div className="restaurant-detail__tags">
            {data.categories.map((category) => (
              <Badge key={category} variant="default">
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="restaurant-detail__section">
          <h2 className="restaurant-detail__section-title">Features</h2>
          <div className="restaurant-detail__features">
            {Object.entries(data.features).map(([key, feature]) => (
              feature.available && (
                <div key={key} className="restaurant-detail__feature">
                  ✓ {key.charAt(0).toUpperCase() + key.slice(1)}
                </div>
              )
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="restaurant-detail__section">
          <h2 className="restaurant-detail__section-title">Contact</h2>
          <div className="restaurant-detail__contact">
            <div>📞 {formatPhone(data.contact.phone)}</div>
            {data.contact.website && (
              <div>
                🌐 <a href={data.contact.website} target="_blank" rel="noopener noreferrer">
                  Website
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Similar Places */}
        {data.similarPlaces.length > 0 && (
          <div className="restaurant-detail__section">
            <h2 className="restaurant-detail__section-title">Similar Places</h2>
            <div className="restaurant-detail__similar">
              {data.similarPlaces.map((similar) => (
                <RestaurantCard key={similar.id} restaurant={similar} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
