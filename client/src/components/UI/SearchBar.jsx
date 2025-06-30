import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

/**
 * Reusable SearchBar component
 * 
 * @param {Object} props - Component props
 * @param {string} props.placeholder - Placeholder text
 * @param {Function} props.onSearch - Function called when search is triggered (pressing Enter or clicking the search button)
 * @param {Function} props.onChange - Optional function called on every input change
 * @param {string} props.initialValue - Optional initial value for the input
 * @param {boolean} props.autoFocus - Whether the input should be focused on mount
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.withButton - Whether to show a search button
 * @param {boolean} props.allowClear - Whether to show a clear button
 */
const SearchBar = ({
  placeholder = 'Search...',
  onSearch,
  onChange,
  initialValue = '',
  autoFocus = false,
  className = '',
  withButton = false,
  allowClear = true,
  ...rest
}) => {
  const [value, setValue] = useState(initialValue);
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };
  
  const handleClear = () => {
    setValue('');
    if (onChange) {
      onChange('');
    }
    if (onSearch) {
      onSearch('');
    }
  };
  
  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(value);
    }
  };
  
  return (
    <div className={`flex relative ${className}`}>
      <div className="relative flex-grow">
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          {...rest}
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        
        {allowClear && value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <FaTimes />
          </button>
        )}
      </div>
      
      {withButton && (
        <button
          type="button"
          onClick={handleSearchClick}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      )}
    </div>
  );
};

export default SearchBar;