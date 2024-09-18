import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter"],
      },
      backgroundColor: {
        base: "var(--color-base-background)",
        button: "var(--color-button-background)",
      },
      textColor: {
        base: "var(--color-base-content)",
        highlight: "var(--color-highlight-content)",
        button: "var(--color-button-text)",
      },
    },
  },
  plugins: [],
};
export default config;
