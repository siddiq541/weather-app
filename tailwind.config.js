/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // App Router pages/components
    "./src/components/**/*.{js,ts,jsx,tsx}", // Reusable components
  ],
  theme: { extend: {} },
  plugins: [],
};
