/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                microma: [
                    'Michroma',
                    'sans-serif',
                    ...defaultTheme.fontFamily.sans,
                ],
                manjari: [
                    'Manjari',
                    'sans-serif',
                    ...defaultTheme.fontFamily.sans,
                ],
                zendots: [
                    'Zen Dots',
                    'sans-serif',
                    ...defaultTheme.fontFamily.sans,
                ],
            },
        },
    },
    plugins: [],
};
