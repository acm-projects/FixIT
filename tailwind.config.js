/** @type {import('tailwindcss').Config} **/
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#672557",
        secondary: {
          DEFAULT: "#B1A180",
          100: "#D2BE92",
          200: "#E4D3BA",
        },
        green: {
          DEFAULT: "#236034",
        },
      },
      transitionDuration: {
        default: "50ms",
        5: "5ms",
      },
      scale: {
        95: ".95",
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
      spacing: {
        "157px": "157px",
        "13px": "13px",
      },
    },
  },
  plugins: [],
};
