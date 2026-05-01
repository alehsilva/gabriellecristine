import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#faf8f5',
          100: '#f5f1ea',
          200: '#ede6dd',
          300: '#e5d9ca',
          400: '#d9cab3',
          500: '#c9b596',
        },
        sage: {
          50: '#f0f4f0',
          100: '#d9e5d9',
          200: '#b8d1b8',
          300: '#96bd96',
          400: '#75a975',
          500: '#5c8a5c',
          600: '#4a6e4a',
        },
        primary: {
          50: '#f9f5f2',
          100: '#f2e9e1',
          200: '#e6d4c4',
          300: '#d4b399',
          400: '#c29371',
          500: '#b07550',
          600: '#9e5e3e',
          700: '#7d4a31',
          800: '#5c3624',
        },
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#25D366',
          600: '#16a34a',
          700: '#15803d',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
