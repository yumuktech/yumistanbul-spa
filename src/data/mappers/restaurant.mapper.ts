/**
 * Data transformation utilities for restaurant data
 * 
 * These mappers format raw data for display in the UI:
 * - Price tier (1, 2, 3) → Visual symbols (₺, ₺₺, ₺₺₺)
 * - Distance in meters → Human-readable format (850m, 1.5 km)
 * - Hours → User-friendly strings (Open until 23:00, Closed)
 */

/**
 * Format price tier to Turkish Lira symbols
 * 
 * @param tier - Price tier (1 = budget, 2 = moderate, 3 = expensive)
 * @returns Formatted price string
 * 
 * @example
 * formatPriceTier(1) // "₺"
 * formatPriceTier(2) // "₺₺"
 * formatPriceTier(3) // "₺₺₺"
 */
export function formatPriceTier(tier: 1 | 2 | 3): '₺' | '₺₺' | '₺₺₺' {
  const map = {
    1: '₺',
    2: '₺₺',
    3: '₺₺₺',
  } as const;
  
  return map[tier];
}

/**
 * Format distance in meters to human-readable string
 * 
 * @param meters - Distance in meters
 * @returns Formatted distance string
 * 
 * @example
 * formatDistance(450) // "450 m"
 * formatDistance(850) // "850 m"
 * formatDistance(1500) // "1.5 km"
 * formatDistance(12500) // "12.5 km"
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${meters} m`;
  }
  
  const km = meters / 1000;
  return `${km.toFixed(1)} km`;
}

/**
 * Format hours to user-friendly string
 * 
 * @param isOpen - Whether restaurant is currently open
 * @param closesAt - Closing time (HH:MM format)
 * @param opensAt - Opening time (HH:MM format)
 * @returns Formatted hours string
 * 
 * @example
 * formatHours(true, '23:00', '11:00') // "Open until 23:00"
 * formatHours(false, '23:00', '11:00') // "Closed · Opens at 11:00"
 */
export function formatHours(isOpen: boolean, closesAt: string, opensAt: string): string {
  if (isOpen) {
    return `Open until ${closesAt}`;
  }
  
  return `Closed · Opens at ${opensAt}`;
}

/**
 * Format rating to one decimal place
 * 
 * @param rating - Rating value
 * @returns Formatted rating string
 * 
 * @example
 * formatRating(4.7) // "4.7"
 * formatRating(4) // "4.0"
 */
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

/**
 * Format review count with locale-appropriate thousands separator
 * 
 * @param count - Number of reviews
 * @returns Formatted review count string
 * 
 * @example
 * formatReviewCount(42) // "42"
 * formatReviewCount(1234) // "1,234"
 * formatReviewCount(5678) // "5,678"
 */
export function formatReviewCount(count: number): string {
  return count.toLocaleString('en-US');
}

/**
 * Truncate text to specified length with ellipsis
 * 
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 * 
 * @example
 * truncateText('A long restaurant name', 15) // "A long restaur…"
 * truncateText('Short', 15) // "Short"
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  return `${text.slice(0, maxLength)}…`;
}

/**
 * Format phone number for display
 * 
 * @param phone - Phone number (e.g., "+90 212 555 1234")
 * @returns Formatted phone number
 * 
 * @example
 * formatPhone('+90 212 555 1234') // "+90 212 555 1234"
 * formatPhone('02125551234') // "0212 555 1234"
 */
export function formatPhone(phone: string): string {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // If it starts with +90, format as international
  if (cleaned.startsWith('+90')) {
    const number = cleaned.slice(3);
    return `+90 ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
  }
  
  // If it starts with 0, format as domestic
  if (cleaned.startsWith('0')) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  
  return phone;
}

/**
 * Get relative time string (e.g., "2 hours ago")
 * 
 * @param date - Date string or Date object
 * @returns Relative time string
 * 
 * @example
 * getRelativeTime('2024-01-15T10:00:00Z') // "2 days ago"
 */
export function getRelativeTime(date: string | Date): string {
  const now = new Date();
  const then = typeof date === 'string' ? new Date(date) : date;
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMins < 1) {
    return 'Just now';
  }
  
  if (diffMins < 60) {
    return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  if (diffDays < 30) {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  }
  
  return then.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
