/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        indeterminate: {
          "0%": { left: "-100%", width: "100%" },
          "100%": { left: "100%", width: "10%" },
        },
      },
      animation: {
        "progress-indeterminate": "indeterminate 1.5s infinite linear",
      },
    },
  },
  plugins: [],
};
