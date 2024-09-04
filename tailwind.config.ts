/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xxs: [{ min: "100px", max: "374px" }],
      xs: [{ min: "375px", max: "600px" }],
      s: "601px",
      md: "901px",
      lg: "1200px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        albastru: "#6fbbcd",
        aliceblue: "#f0f8ff",
        palette: {
          primary: "#000000",
        },
      },
      fontSize: {
        "17rem": ["1.7rem", "1"],
        "1.1rem": ["1.1rem", "1"],
        "1rem": ["1rem", "1"],
        "08rem": ["0.8rem", "1"],
      },
    },
  },
  plugins: [],
};
