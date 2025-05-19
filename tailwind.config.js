/** @type {import('tailwindcss').Config} */
import { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        "desert-sand": {
          DEFAULT: "#d2ab99",
          100: "#321f16",
          200: "#653e2c",
          300: "#975d42",
          400: "#bc8166",
          500: "#d2ab99",
          600: "#dbbbad",
          700: "#e4ccc1",
          800: "#edddd6",
          900: "#f6eeea",
        },
        "ash-gray": {
          DEFAULT: "#bdbea9",
          100: "#28291f",
          200: "#50513d",
          300: "#797a5c",
          400: "#9d9f7f",
          500: "#bdbea9",
          600: "#cacab9",
          700: "#d7d8cb",
          800: "#e4e5dc",
          900: "#f2f2ee",
        },
        "cambridge-blue": {
          DEFAULT: "#8db38b",
          100: "#1a2619",
          200: "#334d32",
          300: "#4d734b",
          400: "#679964",
          500: "#8db38b",
          600: "#a3c2a1",
          700: "#bad1b9",
          800: "#d1e0d0",
          900: "#e8f0e8",
        },
        viridian: {
          DEFAULT: "#56876d",
          100: "#111b16",
          200: "#22362b",
          300: "#335041",
          400: "#446b56",
          500: "#56876d",
          600: "#71a489",
          700: "#95bba7",
          800: "#b8d2c4",
          900: "#dce8e2",
        },
        "spring-green": {
          DEFAULT: "#04724d",
          100: "#01170f",
          200: "#022d1f",
          300: "#02442e",
          400: "#035b3d",
          500: "#04724d",
          600: "#07bd80",
          700: "#1cf7ae",
          800: "#67fac9",
          900: "#b3fce4",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
