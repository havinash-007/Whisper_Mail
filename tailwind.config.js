/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
                dancing: ['"Dancing Script"', 'cursive'],
                indie: ['"Indie Flower"', 'cursive'],
                inter: ['Inter', 'sans-serif'],
            },
            colors: {
                paper: '#FFF8F2',
                wax: '#8B0000',
                accent: '#F8C8DC',
                parchment: '#E8D5B7',
                'letter-text': '#3B2F2F',
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'float-slow': 'floatSlow 5s ease-in-out infinite',
                'heartbeat': 'heartbeat 2s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'cursor': 'cursorBlink 1s step-end infinite',
                'petal-fall': 'petalFall 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                floatSlow: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '33%': { transform: 'translateY(-7px) rotate(2deg)' },
                    '66%': { transform: 'translateY(-3px) rotate(-1deg)' },
                },
                heartbeat: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '14%': { transform: 'scale(1.15)' },
                    '28%': { transform: 'scale(1)' },
                    '42%': { transform: 'scale(1.1)' },
                    '56%': { transform: 'scale(1)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 0 0 rgba(248, 200, 220, 0.4)' },
                    '50%': { boxShadow: '0 0 0 10px rgba(248, 200, 220, 0)' },
                },
                cursorBlink: {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0 },
                },
                petalFall: {
                    '0%': { transform: 'translateY(-20px) rotate(0deg)', opacity: 0 },
                    '10%': { opacity: 1 },
                    '90%': { opacity: 0.8 },
                    '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: 0 },
                },
            },
            backdropBlur: {
                warm: '12px',
            },
        },
    },
    plugins: [],
}
