/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'inherit': ['inherit'],
    },
    extend: {
      width: {
        '268': '95%',
      },
      height: {
        '268': '95%',
        '85': '75%',
        '100': '100%',
      },
      colors: {
        'SC_background': '#beccfb',
        'SC_background2': '#ffffff',
        'SC_background3': '#F1F1F1',
        'SC_border1': '#888888',
        'SC_input' : '#dbdbdb',
        'SC_button' : '#5c6bb8',
        'SC_button_hover' : '#4d5899',
      }
    },
  },
  plugins: [],
}
