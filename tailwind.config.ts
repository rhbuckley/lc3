import type { Config } from "tailwindcss";
import defailtTheme from "tailwindcss/defaultTheme";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },

            colors: {
                light: {
                    DEFAULT: "#E6E8EB",
                    50: "#F1F2F4",
                    100: "#E6E8EB",
                    200: "#C7CBD2",
                    300: "#A8AFB9",
                    400: "#8992A0",
                    500: "#6B7686",
                    600: "#525A66",
                    700: "#393F47",
                    800: "#202328",
                    900: "#070809",
                    950: "#000000",
                },
            },

            fontFamily: {
                sans: ["var(--font-inter)", ...defailtTheme.fontFamily.sans],
                mono: [
                    "var(--font-plex-mono)",
                    ...defailtTheme.fontFamily.mono,
                ],
                monsterrat: [
                    "var(--font-montserrat)",
                    ...defailtTheme.fontFamily.sans,
                ],
            },
        },
    },
    plugins: [require("daisyui")],
};
export default config;
