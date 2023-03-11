/** @type {import('tailwindcss').Config} */
module.exports = {
    /** "purge" and "mode" appeared on the tutorial and not from automatic instalation */
    mode: "jit",
    purge: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],

    /** "content" was from the automatic instalation */

    //   content: [
    //       "./pages/**/*.{js,ts,jsx,tsx}",
    //       "./components/**/*.{js,ts,jsx,tsx}",
    //       "./app/**/*.{js,ts,jsx,tsx}",
    // ],
    theme: {
        extend: {
            colors: {
                amazon_blue: {
                    light: "#232F3E",
                    DEFAULT: "#131921",
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/line-clamp")],
};