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
        smoke: '#F5F5F5',
        orochimaru: '#D9D9D9',
        gamora: '#0FBA00',
        beluga: '#F1F1F1',
        'wild-dove': '#8A8A8A'
      },
      fontSize: {
        12: '0.75rem',
        14: '0.875rem',
        18: '1.125rem',
        20: '1.25rem',
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
