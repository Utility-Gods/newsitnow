const { fontFamily } = require("tailwindcss/defaultTheme");

/**@type {import("tailwindcss").Config} */
module.exports = {
  darkMode: ["class", '[data-kb-theme="dark"]'],
  content: ["./src/**/*.{ts,tsx}"],
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

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          foreground: "hsl(var(--error-foreground))",
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

        primary: {
          DEFAULT: "#051733",
          100: "#01050a",
          200: "#020914",
          300: "#030e1f",
          400: "#041229",
          500: "#051733",
          600: "#0d3b86",
          700: "#1560d8",
          800: "#5a93ef",
          900: "#acc9f7",
        },
        dark_purple: {
          DEFAULT: "#3e1c31",
          100: "#0d060a",
          200: "#190b14",
          300: "#26111e",
          400: "#331728",
          500: "#3e1c31",
          600: "#79365f",
          700: "#b1528d",
          800: "#cb8cb3",
          900: "#e5c5d9",
        },
        claret: {
          DEFAULT: "#76202e",
          100: "#170609",
          200: "#2e0d12",
          300: "#46131c",
          400: "#5d1925",
          500: "#76202e",
          600: "#ad2f44",
          700: "#d05469",
          800: "#e08d9b",
          900: "#efc6cd",
        },
        auburn: {
          DEFAULT: "#af252c",
          100: "#230709",
          200: "#470f12",
          300: "#6a161b",
          400: "#8d1e24",
          500: "#af252c",
          600: "#d63c43",
          700: "#e06d72",
          800: "#ea9da1",
          900: "#f5ced0",
        },
        secondary: {
          DEFAULT: "#e72929",
          100: "#310505",
          200: "#610b0b",
          300: "#921010",
          400: "#c31616",
          500: "#e72929",
          600: "#ec5252",
          700: "#f17e7e",
          800: "#f5a9a9",
          900: "#fad4d4",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Lato"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--kb-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--kb-accordion-content-height)" },
          to: { height: 0 },
        },
        "content-show": {
          from: { opacity: 0, transform: "scale(0.96)" },
          to: { opacity: 1, transform: "scale(1)" },
        },
        "content-hide": {
          from: { opacity: 1, transform: "scale(1)" },
          to: { opacity: 0, transform: "scale(0.96)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "content-show": "content-show 0.2s ease-out",
        "content-hide": "content-hide 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
