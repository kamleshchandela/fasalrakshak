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
          green: "#22C55E", // Lighter, more vibrant, natural green
          darkGreen: "#166534", // Deep forest green
          lightGreen: "#F0FDF4", // Very faint green tint for backgrounds
          sage: "#DCFCE7",
          yellow: "#FBBF24", // Warmer, more organic yellow
        },
        text: {
          charcoal: "#1F2937",
        },
        background: {
          cream: "#FAFAF9", // Warm off-white
          pureWhite: "#FFFFFF",
        }
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        nunito: ['"Nunito"', 'sans-serif'],
        laila: ['"Laila"', 'serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        syne: ['"Syne"', 'sans-serif'],
      },
      boxShadow: {
        'organic': '0 10px 40px -10px rgba(34, 197, 94, 0.1)',
        'organic-hover': '0 20px 50px -15px rgba(34, 197, 94, 0.2)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.05)',
      },
      animation: {
        'scan-line': 'scan 2.5s ease-in-out infinite',
        'float-up': 'float 4s ease-in-out infinite',
        'particle-drift': 'drift 6s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        drift: {
          '0%': { transform: 'translateY(100%) scale(0.8)', opacity: 0 },
          '20%': { opacity: 0.8 },
          '80%': { opacity: 0.6 },
          '100%': { transform: 'translateY(-100%) scale(1.2)', opacity: 0 },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}
