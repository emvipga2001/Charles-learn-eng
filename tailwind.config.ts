import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    animation: {
      'shake': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
      'disable-word': 'disable-word 4s both',
      'undisable-word': 'undisable-word 4s both',
    },
    keyframes: {
      'shake': {
        '10%, 90%': {
          transform: 'translate3d(-1px, 0, 0)'
        },
        '20%, 80%': {
          transform: 'translate3d(2px, 0, 0)'
        },
        '30%, 50%, 70%': {
          transform: 'translate3d(-4px, 0, 0)'
        },
        '40%, 60%': {
          transform: 'translate3d(4px, 0, 0)'
        }
      },
      'disable-word':{
        '100%':{
          opacity: '0'
        },
      },
      'undisable-word':{
        '50%':{
          opacity: '0'
        },
        '100%':{
          opacity: '1'
        },
      }
    }
  },
  plugins: [],
  darkMode: "class"
};
export default config;
