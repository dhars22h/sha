/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        luxury: {
          purple: '#7c3aed',
          pink: '#db2777',
          rose: '#f43f5e',
          gold: '#f59e0b',
        }
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        luxury: ['Playfair Display', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'shine': 'shine 3s linear infinite',
        'bubble': 'bubble 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'ripple': 'ripple 3s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(400%) skewX(-15deg)' },
        },
        bubble: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.7' },
          '50%': { transform: 'translateY(-30px) scale(1.1)', opacity: '1' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '0.7' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px #7c3aed, 0 0 40px #db2777, 0 0 60px #f59e0b' },
          '100%': { boxShadow: '0 0 40px #7c3aed, 0 0 80px #db2777, 0 0 120px #f59e0b' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
