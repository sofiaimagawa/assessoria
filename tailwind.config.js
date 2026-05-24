/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        linen: "#F7F1EA",
        sand: "#E6D7C8",
        oat: "#C8B7A6",
        ink: "#2F2A27",
        mist: "#F4F3EF",
        sage: "#8D9B86",
        clay: "#B9795F",
        pearl: "#FFFCF7"
      },
      borderRadius: {
        gioia: "28px"
      },
      fontFamily: {
        sans: ["System"]
      }
    }
  },
  plugins: []
};
