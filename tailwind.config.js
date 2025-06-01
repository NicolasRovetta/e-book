import typography from '@tailwindcss/typography';


/** @type {import('tailwindcss').Config} */
// tailwind.config.js
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,svelte,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins:[typography],
};
