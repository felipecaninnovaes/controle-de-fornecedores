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
      spacing: {
        '20%': '20%',
        '30%': '40%',
        'N50%': '-50%',
      },
      fontFamily: {
        sans: 'Roboto, sans-serif',
      },
      width: {
        '268': '95%',
        '20%': '20%',
        '30%': '30%',
        '40%': '40%',
        '50%': '50%',
      },
      height: {
        '268': '95%',
       '85': '75%',
        '100': '100%',
        '20%': '20%',
        '50%': '80%',
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
        'SC_button_excluir' : '#ED786F',
        'SC_button_excluir_hover' : '#d99893',
        'SC_button' : '#81d16d',
        'SC_button_hover' : '#67a656',

        'SC_text_color1' : '#33436b',      }
    },
  },
  plugins: [],
}