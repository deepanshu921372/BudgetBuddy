import { usePersistentState } from "../context/PersistentStateContext";

/**
 * Format a number as currency
 * @param {number} value - The number to format
 * @param {string} currency - The currency code (default: from settings)
 * @param {string} locale - The locale (default: 'en-US')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = null, locale = "en-US") => {
  // Get the currency from localStorage if not provided
  if (!currency) {
    const savedState = localStorage.getItem('persistentState');
    const persistentState = savedState ? JSON.parse(savedState) : { settings: { currency: 'USD' } };
    currency = persistentState.settings.currency;
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
};

/**
 * Truncate a string if it exceeds a certain length
 * @param {string} str - The string to truncate
 * @param {number} length - Maximum length before truncation
 * @param {string} suffix - String to append after truncation (default: '...')
 * @returns {string} Truncated string
 */
export const truncate = (str, length = 100, suffix = "...") => {
  if (!str || str.length <= length) {
    return str;
  }
  return str.substring(0, length).trim() + suffix;
};

/**
 * Capitalize the first letter of a string
 * @param {string} str - The string to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str || typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Format a number with thousands separators
 * @param {number} value - The number to format
 * @param {string} locale - The locale (default: 'en-US')
 * @returns {string} Formatted number string
 */
export const formatNumber = (value, locale = "en-US") => {
  return new Intl.NumberFormat(locale).format(value);
};

/**
 * Format a percentage
 * @param {number} value - The value to format as percentage
 * @param {number} decimals - Number of decimal places (default: 1)
 * @param {string} locale - The locale (default: 'en-US')
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, decimals = 1, locale = "en-US") => {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
};