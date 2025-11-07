/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/web/react/index.html",
    "./src/web/react/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navetec: {
          primary: "#ae3a8d",           // Morado principal
          "primary-dark": "#8b2e70",    // Morado oscuro
          "primary-medium": "#c557a4",  // Morado medio
          "primary-light": "#d97ec4",   // Morado claro
          "secondary-1": "#e8a5d8",     // Rosa claro
          "secondary-2": "#f2d4eb",     // Rosa muy claro
          "secondary-3": "#9b3380",     // Morado intenso
          "secondary-4": "#732560",     // Morado muy oscuro
        },
      },
      fontFamily: {
        merriweather: ["Merriweather Sans", "sans-serif"],
        futura: ["Futura PT", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
