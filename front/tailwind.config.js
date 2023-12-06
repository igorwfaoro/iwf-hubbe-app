/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                black: '#000000',
                white: '#ffffff',
                primary: '#1e3a8a',
                secondary: '#172554',
                highlight: '#f16920'
            }
        }
    },
    plugins: [require('@tailwindcss/typography')]
};
