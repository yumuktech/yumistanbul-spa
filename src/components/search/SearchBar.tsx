import React, { useState, useEffect, useRef } from 'react';
import { apiClient } from '../../lib/api';
import type { SearchSuggestion, AsyncState } from '../../data/schemas';
import { IconButton } from '../primitives';
import './SearchBar.css';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * SearchBar component with autocomplete suggestions
 * 
 * Accessibility:
 * - ARIA combobox pattern
 * - Keyboard navigation (ArrowUp/Down, Enter, Escape)
 * - Screen reader announcements
 * - Focus management
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search restaurants, categories, districts...',
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<AsyncState<SearchSuggestion[]>>({
    status: 'idle',
    data: null,
    error: null,
  });
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Fetch suggestions when query changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (value.length < 2) {
        setSuggestions({ status: 'idle', data: null, error: null });
        return;
      }

      setSuggestions({ status: 'loading', data: null, error: null });
      const result = await apiClient.getSearchSuggestions(value);
      setSuggestions(result);
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setSelectedIndex(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value);
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    onChange(suggestion.text);
    onSearch(suggestion.text);
    setIsFocused(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!suggestions.data || suggestions.data.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.data!.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        if (selectedIndex >= 0 && suggestions.data[selectedIndex]) {
          e.preventDefault();
          handleSuggestionClick(suggestions.data[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsFocused(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  const showSuggestions =
    isFocused && suggestions.status === 'success' && suggestions.data && suggestions.data.length > 0;

  return (
    <div className={`search-bar ${className}`}>
      <form onSubmit={handleSubmit} role="search" className="search-bar__form">
        <div className="search-bar__input-wrapper">
          <span className="search-bar__icon" aria-hidden="true">
            🔍
          </span>
          <input
            ref={inputRef}
            type="search"
            className="search-bar__input"
            value={value}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label="Search"
            aria-autocomplete="list"
            aria-controls="search-suggestions"
            aria-expanded={showSuggestions || undefined}
            autoComplete="off"
          />
          {value && (
            <IconButton
              icon="×"
              label="Clear search"
              size="sm"
              variant="ghost"
              onClick={handleClear}
              className="search-bar__clear"
            />
          )}
        </div>

        {showSuggestions && (
          <div
            ref={suggestionsRef}
            id="search-suggestions"
            className="search-bar__suggestions"
            role="listbox"
          >
            {suggestions.data!.map((suggestion, index) => (
              <button
                key={`${suggestion.type}-${suggestion.id || index}`}
                type="button"
                className={`search-bar__suggestion ${
                  index === selectedIndex ? 'search-bar__suggestion--selected' : ''
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
                role="option"
                aria-selected={index === selectedIndex}
              >
                {suggestion.icon && (
                  <span className="search-bar__suggestion-icon" aria-hidden="true">
                    {suggestion.icon}
                  </span>
                )}
                <div className="search-bar__suggestion-content">
                  <div className="search-bar__suggestion-text">{suggestion.text}</div>
                  {suggestion.district && (
                    <div className="search-bar__suggestion-meta">{suggestion.district}</div>
                  )}
                </div>
                <span className="search-bar__suggestion-type">{suggestion.type}</span>
              </button>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};
