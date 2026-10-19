/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        console: {
          bg: '#0f1117',
          nav: '#161b22',
          sidebar: '#1c2333',
          card: '#1c2333',
          border: '#30363d',
          hover: '#21262d',
        },
        aws: {
          orange: '#FF9900',
          blue: '#1a73e8',
          dark: '#0d1117',
        },
        sim: {
          green: '#3fb950',
          yellow: '#e3b341',
          red: '#f85149',
          blue: '#58a6ff',
          purple: '#bc8cff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
