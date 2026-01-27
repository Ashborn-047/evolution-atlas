/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'progress': 'progress 3s infinite',
            },
            keyframes: {
                progress: {
                    '0%, 100%': { height: '0%' },
                    '50%': { height: '100%' },
                }
            }
        },
    },
    plugins: [],
};
