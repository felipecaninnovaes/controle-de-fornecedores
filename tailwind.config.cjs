/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif',
      },
      width: {
        '268': '95%',
      },
      height: {
        '268': '95%',
        //    '85': '28.0rem',
       '85': '75%',
        '100': '100%',
      },
      colors: {
        'SC_background': '#faffff',
        'SC_background2': '#e4ebf2',
        'SC_background3': '#F1F1F1',
        'SC_background4' : '#e5e6e3',
        'SC_border1': '#d5d5d7',
        'SC_input' : '#dbdbdb',

        'SC_button_edit' : '#e5b782',
        'SC_button_edit_hover' : '#daad7c',
        'SC_button_excluir' : '#eda5a2',
        'SC_button_excluir_hover' : '#d99893',
        'SC_button' : '#bad1b4',
        'SC_button_hover' : '#aabfa4',

        'SC_text_color1' : '#33436b',      }
    },
  },
  plugins: [],
}
