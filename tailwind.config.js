/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#26262A",
        "neutral-1": "#5754DA",
        "neutral-2": "#DA54B9",
        "neutral-3": "#BCD6FF",
        "neutral-4": "#FFE4D3",
        "neutral-glass-60": "#FFFFFF99",
        "neutral-glass-20": "#FFFFFF30",
        "neutral-tint-1": "#F6F6F6",
        "neutral-stroke-6": "#26262A0F",
        "neutral-stroke-20": "#26262A33",
        "neutral-bi-50": "#26262A80",
        "neutral-bi-40": "#615f62",
        "neutral-bi-30": "#adacac",
        "custom-gray": "#D9D9D9",
        logo: "linear-gradient(90deg, #304B6A 0.09%, #1560BD 101.22%)",
        skyCustom: "#BAD3F9",
        pinkCustom: "#FFA0DA",
      },
      backdropBlur: {
        16: "16px",
        14.86: "14.86px",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1517px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 80s linear infinite",
      },
      fontSize: {
        normal: "24px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        noto: ['"Noto Serif"', "serif"],
      },
    },
  },
};
