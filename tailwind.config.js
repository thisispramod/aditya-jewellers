/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                gold: {
                    100: '#F9F1D0',
                    200: '#F0E6B8',
                    300: '#E6DA9E',
                    400: '#DCCF85',
                    500: '#D4AF37', // Classic Gold
                    600: '#AA8C2C',
                    700: '#806921',
                    800: '#554616',
                    900: '#2B230B',
                },
                silver: {
                    100: '#F7F7F7',
                    200: '#EAEAEA',
                    300: '#D9D9D9',
                    400: '#C0C0C0', // Silver
                    500: '#A6A6A6',
                    600: '#8C8C8C',
                    700: '#737373',
                    800: '#595959',
                    900: '#404040',
                }
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['Lato', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
