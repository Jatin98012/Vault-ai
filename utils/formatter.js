// src/utils/formatters.js

/**
 * Formats a number into Indian Rupee (INR) currency style.
 * @param {number} amount - The numeric value to format.
 */
export const formatINR = (amount) => {
  if (isNaN(amount)) return "₹0";

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0, // Removes decimal points for a cleaner dashboard look
  }).format(amount);
};