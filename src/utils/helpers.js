/**
 * Formats a date into a readable string (e.g., "Jan 1, 2023")
 * @param {Date|string|number} date - The date to format
 * @returns {string} The formatted date string
 */
export const formatDate = (date) => {
  // ensure date is a Date object
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Generates a unique ID by combining timestamp and random values
 * Note: Not cryptographically secure, but sufficient for most client-side needs
 * @returns {string} A unique string ID in format "timestamp-randomchars"
 */
export function generateId() {
  const timestamp = Date.now().toString(36); // Convert timestamp to base36
  const randomPart = Math.random().toString(36).substring(2, 10); // Get 8 random chars
  return `${timestamp}-${randomPart}`;
}
