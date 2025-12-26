import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'mindmap-primary': '#667eea',
        'mindmap-secondary': '#764ba2',
        'mindmap-accent': '#f093fb',
      },
      animation: {
        'node-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['light', 'dark', 'cupcake', 'cyberpunk', 'forest', 'sunset'],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
}
