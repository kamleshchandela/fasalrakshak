/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          green: "#1A6B2F",
          yellow: "#F5A623",
          lightGreen: "#F0F7EC",
          sage: "#E0EDD5",
          darkGreen: "#0D3D1A",
        },
        text: {
          charcoal: "#1C1C1C",
        },
        background: {
          cream: "#F9F6EE",
          pureWhite: "#FFFFFF",
        }
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        nunito: ['"Nunito"', 'sans-serif'],
        laila: ['"Laila"', 'serif'],
      },
      animation: {
        'scan-line': 'scan 2.5s ease-in-out infinite',
        'float-up': 'float 4s ease-in-out infinite',
        'particle-drift': 'drift 6s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drift: {
          '0%': { transform: 'translateY(100%) scale(0.8)', opacity: 0 },
          '20%': { opacity: 0.8 },
          '80%': { opacity: 0.6 },
          '100%': { transform: 'translateY(-100%) scale(1.2)', opacity: 0 },
        }
      }
    },
  },
  plugins: [],
}
