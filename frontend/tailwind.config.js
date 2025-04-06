import daisyui from "daisyui";
import { THEMES } from "./src/constants/index.ts";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: THEMES,
  },
};
