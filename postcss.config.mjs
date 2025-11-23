const tailwindConfig = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './shared/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: ['theme-blue', 'theme-green'],
};

const config = {
  plugins: {
    '@tailwindcss/postcss': tailwindConfig,
  },
};

export default config;
