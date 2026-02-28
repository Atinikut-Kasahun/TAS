import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#004139", // Deep Forest Green
                accent: "#00A65F",  // Mint Green
                secondary: "#1A1C23",
                cream: "#F9F8F6",
                dark: "#12141D",
                brandYellow: "#F6E000", // Droga Brand Yellow
                brandBlue: "#152033",   // Workable-style Deep Blue
                'workableGray': {
                    '50': "#F9FAFB",
                    '100': "#F3F4F6",
                    '200': "#E5E7EB",
                    '300': "#D1D5DB",
                    '400': "#9CA3AF",
                    '500': "#6B7280",
                    '600': "#4B5563",
                    '700': "#374151",
                    '800': "#1F2937",
                    '900': "#111827",
                },
            },
            fontFamily: {
                inter: ["Inter", "sans-serif"],
            },
            backgroundImage: {
                "gradient-hero": "linear-gradient(135deg, #F9F8F6 0%, #F1EDE9 100%)",
                "gradient-accent": "linear-gradient(90deg, #004139, #00A65F)",
            },
        },
    },
    plugins: [],
};
export default config;
