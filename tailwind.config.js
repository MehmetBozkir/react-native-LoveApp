/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", // Projenizin ana dosyası
    "./app/**/*.{js,jsx,ts,tsx}", // app klasörü altındaki tüm JavaScript/TypeScript dosyaları
    "./app/(tabs)/**/*.{js,jsx,ts,tsx}", // app/(tabs) klasörü altındaki tüm dosyalar
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
