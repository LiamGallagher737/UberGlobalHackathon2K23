/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                primary: '#E5F941',
                dark: '#434A54',
            },
            fontFamily: {
                sans: "'Comfortaa', sans",
            },
            boxShadow: {
                circle: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
            },
        },
    },
    plugins: [],
};
