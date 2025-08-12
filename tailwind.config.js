/** @type {import('tailwindcss').Config} */

export default {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
