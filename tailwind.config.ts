import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#09090b",
          900: "#09090b",
          800: "#18181b",
          700: "#27272a",
          500: "#71717a",
          400: "#a1a1aa",
          200: "#e4e4e7",
          100: "#f4f4f5",
          50: "#fafafa",
        },
        accent: {
          blue: {
            DEFAULT: "#1d4ed8",
            dark: "#1e3a8a",
            light: "#3b82f6",
            subtle: "#eff6ff",
            border: "#bfdbfe",
          },
          red: {
            DEFAULT: "#dc2626",
            dark: "#991b1b",
            light: "#ef4444",
            subtle: "#fef2f2",
            border: "#fecaca",
          },
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
        mono: [
          '"SF Mono"',
          "Consolas",
          '"Liberation Mono"',
          "Menlo",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
