import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for proper class merging
 *
 * @param {...any} classes - Classes to merge
 * @returns {string} Merged class string
 */
export const cn = (...classes) => {
  return twMerge(clsx(...classes));
};
