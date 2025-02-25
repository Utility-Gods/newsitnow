const { fontFamily } = require("tailwindcss/defaultTheme");

/**@type {import("tailwindcss").Config} */
module.exports = {
  darkMode: ["class", '[data-kb-theme="dark"]'],
  content: ["./src/**/*.{ts,tsx}"],
  layers: {
    "no-tailwindcss": {
      // Add any styles you want to disable here
      ".no-tailwindcss": {
        all: "unset",
      },
    },
  },
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
          DEFAULT: "#ff5b19",
          100: "#381000",
          200: "#702000",
          300: "#a83000",
          400: "#e04000",
          500: "#ff5b19",
          600: "#ff7b47",
          700: "#ff9c75",
          800: "#ffbda3",
          900: "hsl(17, 100%, 91%)",
        },
        atomic_tangerine: {
          DEFAULT: "#f29f76",
          100: "#421a06",
          200: "#85340c",
          300: "#c74f12",
          400: "#ec7235",
          500: "#f29f76",
          600: "#f5b393",
          700: "#f7c6ae",
          800: "#fad9c9",
          900: "#fcece4",
        },
        eggshell: {
          DEFAULT: "#e5e3d2",
          100: "#383520",
          200: "#6f6b40",
          300: "#a59e62",
          400: "#c5c19a",
          500: "#e5e3d2",
          600: "#eae9db",
          700: "#efeee4",
          800: "#f5f4ed",
          900: "hsl(45, 29%, 97%)",
        },
        ash_gray: {
          DEFAULT: "#cad7d0",
          100: "#243029",
          200: "#485f53",
          300: "#6c8f7c",
          400: "#9bb4a6",
          500: "#cad7d0",
          600: "#d5dfda",
          700: "#e0e7e3",
          800: "#eaefec",
          900: "#f5f7f6",
        },
        light_blue: {
          DEFAULT: "#aecacd",
          100: "#1d2d2f",
          200: "#395a5e",
          300: "#56878c",
          400: "#7eabb0",
          500: "#aecacd",
          600: "#bdd4d7",
          700: "#cedfe1",
          800: "#deeaeb",
          900: "#eff4f5",
        },
        dim_gray: {
          DEFAULT: "#627072",
          100: "#141717",
          200: "#272d2e",
          300: "#3b4445",
          400: "#4f5b5d",
          500: "#627072",
          600: "#7f9092",
          700: "#9fabad",
          800: "#bfc7c9",
          900: "#dfe3e4",
        },
        night: {
          DEFAULT: "#161616",
          100: "#050505",
          200: "#090909",
          300: "#0e0e0e",
          400: "#121212",
          500: "#161616",
          600: "#454545",
          700: "#747474",
          800: "#a2a2a2",
          900: "#d1d1d1",
        },
        text: {
          DEFAULT: "#000000",
          500: "hsl(0, 0%, 9%)",
          inverted: "#fff",
        },

        background: {
          DEFAULT: "#fff",
          100: "#050505",
          200: "#090909",
          300: "#0e0e0e",
          400: "#121212",
          500: "#161616",
          600: "#454545",
          700: "#747474",
          800: "#a2a2a2",
          900: "#d1d1d1",
        },

        secondary: {
          DEFAULT: "#051733",
          foreground: "#fff",
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
        base: ["16px", "20px"],
        md: ["18px", "22px"],
        lg: ["20px", "24px"],
        xl: ["22px", "28px"],
        "2xl": ["24px", "30px"],
        "3xl": ["30px", "36px"],
        "4xl": ["36px", "42px"],
        "5xl": ["40px", "48px"],
      },
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
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
