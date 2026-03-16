/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '-0.01em' }],
                sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '-0.01em' }],
                base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '-0.01em' }],
                lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
                xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em', fontWeight: 'bold' }],
                '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.01em', fontWeight: 'bold' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.01em', fontWeight: 'bold' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.01em', fontWeight: 'bold' }],
                '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.01em', fontWeight: 'bold' }],
                '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.01em', fontWeight: 'bold' }],
                '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.01em', fontWeight: 'bold' }],
                '8xl': ['5.25rem', { lineHeight: '1', letterSpacing: '-0.01em', fontWeight: 'bold' }],
                '9xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.01em', fontWeight: 'bold' }],
            },
            fontFamily: {
                heading: ["Syne", "sans-serif"],
                body: ["DM Sans", "sans-serif"],
                serif: ["Playfair Display", "serif"]
            },
            colors: {
                darkBg: '#1A0F0A',
                darkBg2: '#2A1810',
                cream: '#F4E6D8',
                softWhite: '#FFF8F2',
                gold: '#C89A5A',
                goldLight: '#E8BB7A',
                choco: '#5A2E1F',
                primary: '#5A2E1F',
                accent: '#C89A5A',
                background: '#FFF8F2',
                foreground: '#1A0F0A',
                secondary: '#F4E6D8',
                muted: '#F4E6D8',
                'muted-foreground': '#6B7280',
                border: '#E5E7EB',
                card: '#FFF8F2',
                'card-foreground': '#1A0F0A',
                'primary-foreground': '#FFFFFF',
                'secondary-foreground': '#1A0F0A',
                'accent-foreground': '#FFFFFF',
                link: '#5A2E1F'
            },
            animation: {
                'marquee': 'marquee 25s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
