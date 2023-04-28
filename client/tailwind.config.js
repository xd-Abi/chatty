/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#F3F6F9',
      },
      borderColor: {
        vivid: '#E0E3E7',
      },
      textColor: {
        vivid: '#0A1929',
        dim: '#3E5060',
      },
      stroke: {
        vivid: '#0A1929',
        dim: '#3E5060',
      },
    },
  },
  plugins: [],
};
