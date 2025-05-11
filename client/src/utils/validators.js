/**
 * Check if a string is a valid email
 * @param {string} email - The email to validate
 * @returns {boolean} Whether the email is valid
 */
export const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  /**
   * Check if a password meets the requirements
   * @param {string} password - The password to validate
   * @param {number} minLength - Minimum password length (default: 6)
   * @returns {boolean} Whether the password is valid
   */
  export const isValidPassword = (password, minLength = 6) => {
    return password && password.length >= minLength;
  };
  
  /**
   * Check if a string is empty or only whitespace
   * @param {string} str - The string to check
   * @returns {boolean} Whether the string is empty
   */
  export const isEmpty = (str) => {
    return !str || /^\s*$/.test(str);
  };
  
  /**
   * Check if a value is a valid number
   * @param {*} value - The value to check
   * @returns {boolean} Whether the value is a valid number
   */
  export const isNumber = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };
  
  /**
   * Check if a value is a positive number
   * @param {*} value - The value to check
   * @returns {boolean} Whether the value is a positive number
   */
  export const isPositiveNumber = (value) => {
    return isNumber(value) && parseFloat(value) > 0;
  };
  
  /**
   * Validate a form field
   * @param {string} field - Field name
   * @param {*} value - Field value
   * @param {Object} rules - Validation rules
   * @returns {string|null} Error message or null if valid
   */
  export const validateField = (field, value, rules) => {
    // Required validation
    if (rules.required && isEmpty(value)) {
      return `${field} is required`;
    }
  
    // Email validation
    if (rules.email && !isEmpty(value) && !isValidEmail(value)) {
      return "Invalid email address";
    }
  
    // Min length validation
    if (rules.minLength && !isEmpty(value) && value.length < rules.minLength) {
      return `${field} must be at least ${rules.minLength} characters`;
    }
  
    // Max length validation
    if (rules.maxLength && !isEmpty(value) && value.length > rules.maxLength) {
      return `${field} must be no more than ${rules.maxLength} characters`;
    }
  
    // Number validation
    if (rules.number && !isEmpty(value) && !isNumber(value)) {
      return `${field} must be a valid number`;
    }
  
    // Positive number validation
    if (rules.positive && !isEmpty(value) && !isPositiveNumber(value)) {
      return `${field} must be a positive number`;
    }
  
    // Custom validator
    if (rules.validator && !rules.validator.fn(value)) {
      return rules.validator.message;
    }
  
    return null;
  };