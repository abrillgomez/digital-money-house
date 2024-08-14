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
      },
      textColor: {
        "custom-lime": "#C1FD35",
      },
      borderColor: {
        "custom-lime": "#C1FD35",
      },
    },
  },
  plugins: [],
};

export default config;
