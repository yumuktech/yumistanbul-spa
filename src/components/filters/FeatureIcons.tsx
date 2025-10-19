import React from 'react';

// Minimal cartoon-like inline SVG icons (no external assets) keeping bundle tiny.
// Each icon is a 24x24 viewBox with rounded shapes and flat colors for a playful feel.

export type CoreFeature = 'alcohol' | 'outdoor' | 'meal' | 'coffee' | 'dessert';

interface FeatureIconProps {
  feature: CoreFeature;
  size?: number;
  className?: string;
  'aria-hidden'?: boolean;
}

const AlcoholIcon: React.FC<{ size: number; className?: string }> = ({ size, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Alcohol"
  >
    <rect x="6" y="2" width="12" height="6" rx="2" fill="#FFC94D" stroke="#C88000" strokeWidth="1.5" />
    <path d="M9 8h6v9.5a3.5 3.5 0 1 1-6 0V8Z" fill="#FFE6A3" stroke="#C88000" strokeWidth="1.5" />
    <circle cx="12" cy="17.5" r="1.5" fill="#FFC94D" />
  </svg>
);

const OutdoorIcon: React.FC<{ size: number; className?: string }> = ({ size, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Outdoor"
  >
    <circle cx="8" cy="14" r="4" fill="#6CC24A" stroke="#2F7D32" strokeWidth="1.5" />
    <rect x="7.25" y="10" width="1.5" height="8" fill="#2F7D32" />
    <path d="M2 21h20" stroke="#2F7D32" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="16" cy="8" r="5" fill="#A5D86A" stroke="#2F7D32" strokeWidth="1.5" />
    <rect x="15.25" y="3" width="1.5" height="10" fill="#2F7D32" />
  </svg>
);

const MealIcon: React.FC<{ size: number; className?: string }> = ({ size, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Meal"
  >
    <rect x="3" y="9" width="18" height="10" rx="2" fill="#FFD7D7" stroke="#CC5C5C" strokeWidth="1.5" />
    <path d="M7 9V7.5A2.5 2.5 0 0 1 9.5 5H14.5A2.5 2.5 0 0 1 17 7.5V9" stroke="#CC5C5C" strokeWidth="1.5" />
    <circle cx="12" cy="14" r="2" fill="#FF9F9F" />
  </svg>
);

const CoffeeIcon: React.FC<{ size: number; className?: string }> = ({ size, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Coffee"
  >
    <rect x="5" y="7" width="12" height="10" rx="3" fill="#C69C6D" stroke="#5B3A1E" strokeWidth="1.5" />
    <path d="M17 9h2.25A2.75 2.75 0 0 1 22 11.75v.5A2.75 2.75 0 0 1 19.25 15H17" stroke="#5B3A1E" strokeWidth="1.5" />
    <path d="M9 7c0-.5.2-1 .5-1.5.3-.5.5-1 .5-1.5M13 7c0-.5.2-1 .5-1.5.3-.5.5-1 .5-1.5" stroke="#5B3A1E" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const DessertIcon: React.FC<{ size: number; className?: string }> = ({ size, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Dessert"
  >
    <path d="M5 10h14l-1.5 9a2 2 0 0 1-2 1.7H8.5A2 2 0 0 1 6 19L5 10Z" fill="#FFE1E8" stroke="#D86686" strokeWidth="1.5" />
    <path d="M9 10c0-2 1.5-4 3-5 1.5 1 3 3 3 5" stroke="#D86686" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="14" r="2" fill="#FF9FB6" />
  </svg>
);

export const FeatureIcon: React.FC<FeatureIconProps> = ({ feature, size = 28, className, ...rest }) => {
  switch (feature) {
    case 'alcohol':
      return <AlcoholIcon size={size} className={className} {...rest} />;
    case 'outdoor':
      return <OutdoorIcon size={size} className={className} {...rest} />;
    case 'meal':
      return <MealIcon size={size} className={className} {...rest} />;
    case 'coffee':
      return <CoffeeIcon size={size} className={className} {...rest} />;
    case 'dessert':
      return <DessertIcon size={size} className={className} {...rest} />;
    default:
      return null;
  }
};

export const CORE_FEATURES: { id: CoreFeature; label: string }[] = [
  { id: 'alcohol', label: 'Alcohol' },
  { id: 'outdoor', label: 'Outdoor' },
  { id: 'meal', label: 'Meal' },
  { id: 'coffee', label: 'Coffee' },
  { id: 'dessert', label: 'Dessert' },
];

export default FeatureIcon;
