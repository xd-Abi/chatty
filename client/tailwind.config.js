/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        vivid: '#FFFFFF',
        dim: '#FAFBFD',
      },
      colors: {
        primary: '#0577FD',
        secondary: '#084FA3',
      },
      textColor: {
        vivid: '#000000',
        dim: '#ACADAF',
      },
    },
  },
  plugins: [],
};
