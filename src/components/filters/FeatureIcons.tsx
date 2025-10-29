import React from 'react';

export type CoreFeature = 'alcohol' | 'outdoor' | 'dessert' | 'meal' | 'coffee';
export type SpecialFeature = 'date-night' | 'work-friendly' | 'group-friendly';

interface GlyphProps {
  size?: number;
  className?: string;
  'aria-hidden'?: boolean;
}

const strokeColor = '#1f2329';
const accentColor = '#ff3b30';

const createSvg = (path: React.ReactNode, size = 32, className?: string, ariaHidden?: boolean) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role={ariaHidden ? 'presentation' : 'img'}
    aria-hidden={ariaHidden}
  >
    {path}
  </svg>
);

const Alcohol: React.FC<GlyphProps> = ({ size = 32, className, 'aria-hidden': ariaHidden }) =>
  createSvg(
    <>
      <path
        d="M9 3.5h14v3c0 3.866-3.134 7-7 7s-7-3.134-7-7v-3Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 13.5v8M12 27.5h8"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="9.5" r="2" fill={accentColor} opacity="0.15" />
    </>,
    size,
    className,
    ariaHidden
  );

const Outdoor: React.FC<GlyphProps> = ({ size = 32, className, 'aria-hidden': ariaHidden }) =>
  createSvg(
    <>
      <path
        d="M16 4.5v15M12 18.5l4 6 4-6"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="9" r="5" stroke={strokeColor} strokeWidth="2" />
      <path d="M7 27.5h18" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
    </>,
    size,
    className,
    ariaHidden
  );

const Dessert: React.FC<GlyphProps> = ({ size = 32, className, 'aria-hidden': ariaHidden }) =>
  createSvg(
    <>
      <path
        d="M9 17.5h14l-1.5 6.5a2 2 0 0 1-1.94 1.5H12.44a2 2 0 0 1-1.94-1.5L9 17.5Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 17.5c0-2.5 2-5 4-6 2 1 4 3.5 4 6"
        stroke={accentColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="21" r="1.5" fill={accentColor} opacity="0.2" />
    </>,
    size,
    className,
    ariaHidden
  );

const Meal: React.FC<GlyphProps> = ({ size = 32, className, 'aria-hidden': ariaHidden }) =>
  createSvg(
    <>
      <rect
        x="7"
        y="14"
        width="18"
        height="9"
        rx="2"
        stroke={strokeColor}
        strokeWidth="2"
      />
      <path
        d="M12 14v-2a4 4 0 0 1 4-4 4 4 0 0 1 4 4v2"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M11 21h10" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
    </>,
    size,
    className,
    ariaHidden
  );

const Coffee: React.FC<GlyphProps> = ({ size = 32, className, 'aria-hidden': ariaHidden }) =>
  createSvg(
    <>
      <rect
        x="7"
        y="11"
        width="14"
        height="12"
        rx="3"
        stroke={strokeColor}
        strokeWidth="2"
      />
      <path
        d="M21 13h2.5a3.5 3.5 0 0 1 0 7H21"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 6.5c0 1.5-2 2-2 3.5M16 6.5c0 1.5-2 2-2 3.5"
        stroke={accentColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>,
    size,
    className,
    ariaHidden
  );

const DateNight: React.FC<GlyphProps> = ({ size = 28, className, 'aria-hidden': ariaHidden }) =>
  createSvg(
    <>
      <path
        d="M10 10c0-2.21 1.79-4 4-4 1.62 0 3 1.11 3.6 2.4C18.2 7.11 19.58 6 21.2 6 23.41 6 25.2 7.79 25.2 10c0 4.8-9.2 10-9.2 10S10 14.8 10 10Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M16 20v4" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
    </>,
    size,
    className,
    ariaHidden
  );

const WorkFriendly: React.FC<GlyphProps> = ({ size = 28, className, 'aria-hidden': ariaHidden }) =>
  createSvg(
    <>
      <rect
        x="9"
        y="11"
        width="14"
        height="12"
        rx="2"
        stroke={strokeColor}
        strokeWidth="2"
      />
      <path
        d="M12 11V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M9 16h14" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
    </>,
    size,
    className,
    ariaHidden
  );

const GroupFriendly: React.FC<GlyphProps> = ({ size = 28, className, 'aria-hidden': ariaHidden }) =>
  createSvg(
    <>
      <circle cx="12" cy="11" r="3" stroke={strokeColor} strokeWidth="2" />
      <circle cx="20" cy="11" r="3" stroke={strokeColor} strokeWidth="2" />
      <path
        d="M7 23c0-3 2.5-5.5 5.5-5.5S18 20 18 23"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16.5 17.8A5.5 5.5 0 0 1 22 23"
        stroke={accentColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>,
    size,
    className,
    ariaHidden
  );

export const FeatureIcon: React.FC<GlyphProps & { feature: CoreFeature }> = ({
  feature,
  size,
  className,
  ...rest
}) => {
  switch (feature) {
    case 'alcohol':
      return <Alcohol size={size} className={className} {...rest} />;
    case 'outdoor':
      return <Outdoor size={size} className={className} {...rest} />;
    case 'dessert':
      return <Dessert size={size} className={className} {...rest} />;
    case 'meal':
      return <Meal size={size} className={className} {...rest} />;
    case 'coffee':
      return <Coffee size={size} className={className} {...rest} />;
    default:
      return null;
  }
};

export const SpecialIcon: React.FC<GlyphProps & { feature: SpecialFeature }> = ({
  feature,
  size,
  className,
  ...rest
}) => {
  switch (feature) {
    case 'date-night':
      return <DateNight size={size} className={className} {...rest} />;
    case 'work-friendly':
      return <WorkFriendly size={size} className={className} {...rest} />;
    case 'group-friendly':
      return <GroupFriendly size={size} className={className} {...rest} />;
    default:
      return null;
  }
};

export const CORE_FEATURES: Array<{ id: CoreFeature; label: string }> = [
  { id: 'alcohol', label: 'Alcohol' },
  { id: 'outdoor', label: 'Outdoor' },
  { id: 'dessert', label: 'Dessert' },
  { id: 'meal', label: 'Meal' },
  { id: 'coffee', label: 'Coffee' },
];

export const SPECIAL_FEATURES: Array<{ id: SpecialFeature; label: string }> = [
  { id: 'date-night', label: 'Date Night' },
  { id: 'work-friendly', label: 'Work Friendly' },
  { id: 'group-friendly', label: 'Group Friendly' },
];
