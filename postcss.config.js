// postcss.config.js

module.exports = {
  plugins: {
    tailwindcss: {
      content: ["./components/**/*.{html,js}"],
    },
    autoprefixer: {},
  },
}