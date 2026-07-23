import scrollbarHide from 'tailwind-scrollbar-hide';
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#0A0A0B',
        surface: '#141414',
        'surface-2': '#1C1C1C',
        paper: '#FAFAF8',
        ink: '#1A1A19',
        ivory: '#F2F1EE',
        muted: '#8A8883',
        champagne: {
          DEFAULT: '#C9A876',
          light: '#DCC094',
          dim: '#A3855C',
        },
      },
      fontFamily: {
        sans: ['"Manrope"', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(0, 0, 0, 0.04)',
        lifted: '0 20px 40px -12px rgba(0, 0, 0, 0.25)',
        glow: '0 0 20px -2px rgba(201, 168, 118, 0.25)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [scrollbarHide],
};
