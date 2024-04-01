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
        raisin_black: {
          DEFAULT: "#211e2d",
          100: "#070609",
          200: "#0d0c12",
          300: "#14121c",
          400: "#1b1825",
          500: "#211e2d",
          600: "#484162",
          700: "#6e6496",
          800: "#9e97ba",
          900: "#cecbdc",
        },
        rust: {
          DEFAULT: "#a83e0e",
          100: "#220d03",
          200: "#441906",
          300: "#662608",
          400: "#88330b",
          500: "#a83e0e",
          600: "#e65613",
          700: "#f07f4a",
          800: "#f5a986",
          900: "#fad4c3",
        },
        mahogany: {
          DEFAULT: "#c34408",
          100: "#270e02",
          200: "#4e1b03",
          300: "#762905",
          400: "#9d3607",
          500: "#c34408",
          600: "#f55b14",
          700: "#f8844f",
          800: "#faad89",
          900: "#fdd6c4",
        },
        secondary: {
          DEFAULT: "#de4a01",
          100: "#2d0f00",
          200: "#591e00",
          300: "#862d01",
          400: "#b33c01",
          500: "#de4a01",
          600: "#fe671c",
          700: "#fe8d54",
          800: "#feb38d",
          900: "#ffd9c6",
        },
      },

      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        xs: ["12px", "20px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        md: ["18px", "24px"],
        lg: ["20px", "24px"],
        xl: ["20px", "24px"],
        "2xl": ["24px", "28px"],
        "3xl": ["30px", "34px"],
        "4xl": ["36px", "40px"],
        "5xl": ["40px", "40px"],
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
