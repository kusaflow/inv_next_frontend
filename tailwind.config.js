/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'oceanic-blue': {
          50: '#f2f8fa', // lightest blue for backgrounds, like the sky reflected on the water
          100: '#e6f1f5', // lighter blue for hover states or accents
          200: '#c0ddea', // soft blue for less prominent UI elements
          300: '#99c9df', // medium blue for secondary buttons or icons
          400: '#4da1ca', // standard blue for primary buttons or active states
          500: '#0079b5', // a darker blue for text or important elements (like the deep ocean)
          600: '#006da3', // slightly darker for hover states on text or elements
          700: '#005988', // dark blue for headers or important text
          800: '#00466d', // darker blue for contrast against light backgrounds
          900: '#003758' // very dark blue for footers, headers, or strong accents
        },
        'teal-sea': {
          50: '#f0fdfa', // a very light teal for a soft, sea-foam-inspired background
          100: '#ccfbf1', // light teal for interactive elements or accents
          200: '#99f6e4', // clear, vibrant teal for buttons and icons
          300: '#5eead4', // medium teal for active states or callouts
          400: '#2dd4bf', // a rich teal for elements you want to emphasize
          500: '#14b8a6', // a darker teal, strong and clear like tropical waters
          600: '#0d9488', // bold teal for text and important interactive elements
          700: '#0f766e', // deep teal for strong emphasis and headers
          800: '#115e59', // deeper teal for footer or larger text elements
          900: '#134e4a' // the darkest teal for maximum contrast and readability
        },
        'off-white': '#fdfaf6', // for backgrounds and UI elements
        'rich-soil': '#5d4e40', // for text and accenting components
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}