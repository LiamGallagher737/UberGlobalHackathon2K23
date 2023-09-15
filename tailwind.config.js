/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                primary: "#000000",
                accent: "#4cdf75",
            }
        },
    },
    plugins: [],
};
