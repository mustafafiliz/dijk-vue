/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'night-sky': '#292D32',
        cornflower: '#B8FBFF',
        'lucid-dreams': '#CFEBFF',
        'lynx-white': '#F6F7F9',
        'gentian-flower': '#2F69FF',
        squant: '#666666',
        smoke: '#F5F5F5'
      },
      fontSize: {
        12: '0.75rem',
        18: '1.125rem',
        24: '1.5rem',
        28: '1.75rem',
        36: '2.25rem'
      },
      borderRadius: {
        20: '20px'
      }
    }
  },
  plugins: []
}
