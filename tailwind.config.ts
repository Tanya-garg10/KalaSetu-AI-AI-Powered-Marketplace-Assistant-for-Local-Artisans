import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{ts,tsx}",
        "./src/components/**/*.{ts,tsx}",
        "./src/app/**/*.{ts,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "1rem",
            screens: { "2xl": "1280px" },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                terracotta: {
                    50: "#FDF5EE",
                    100: "#FAE5D2",
                    200: "#F3C39A",
                    300: "#EA9F62",
                    400: "#DD7E3A",
                    500: "#C9621D",
                    600: "#A84D14",
                    700: "#7E3A10",
                    800: "#56270C",
                    900: "#321707",
                },
                teal: {
                    500: "#0E7A6E",
                    600: "#0B5F56",
                    700: "#0A4D46",
                },
                cream: "#FBF3E8",
            },
            fontFamily: {
                display: ['"Fraunces"', "ui-serif", "Georgia"],
                sans: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui"],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(12px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-400px 0" },
                    "100%": { backgroundPosition: "400px 0" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-8px)" },
                },
            },
            animation: {
                "fade-up": "fade-up 0.6s ease-out forwards",
                shimmer: "shimmer 2s linear infinite",
                float: "float 4s ease-in-out infinite",
            },
            backgroundImage: {
                "warm-radial":
                    "radial-gradient(circle at top right, #FAE5D2 0%, #FBF3E8 40%, #FFFFFF 80%)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;
