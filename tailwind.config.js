/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        bgSidemenu: '#333132',
        bgChattype: '#3E3C3D',
        bgChat: '#525252',
        bgEachChat: '#656565',
        bgSearch: '#555555',
        bgModal: '#333',
        bgMessageText: '#929292',
        borderColor: '#eee'
      },
    },
  },
  plugins: [],
};
