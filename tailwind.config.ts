import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        "custom-dark": "#201F22",
        "custom-gray": "#3A393E",
        "custom-lime": "#C1FD35",
        "custom-red": "#FE4B39",
        "custom-gray-light": "#CECECE",
        "custom-white": "#EEEAEA",
        "custom-lime-dark": "#9FE42D",
      },
      textColor: {
        "custom-lime": "#C1FD35",
        "custom-dark": "#201F22",
        "black-opacity-50": "rgba(0, 0, 0, 0.5)",
        "custom-gray-light": "#CECECE",
        "custom-gray": "#979797",
      },
      borderColor: {
        "custom-lime": "#C1FD35",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};

export default config;
