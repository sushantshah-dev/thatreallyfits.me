import type { Config } from 'tailwindcss';

export default {
  content: ['./frontend/index.html', './frontend/src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;