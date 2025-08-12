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
