module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {

    screens: {

      'phone': '400px',
      
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }

    },

    extend: {

      spacing: {

              '96': '24rem',
              '100': '28rem',
              '112': '32rem',
              '116': '33rem',
              '128': '36rem',
              '144': '40rem',
              '160': '44rem',
              '176': '48rem',
              '192': '52rem',
              '208': '56rem',


    },

      colors: {

      'main': '#EDF5E1',
      'text': '#5CDB95',
      'side': '#05386B',
      'header':'#379683',
      'test': '#F3F6FB',

      },

      fontFamily: {

        'Quicksand': ['Quicksand-Bold', 'Arial', 'sans-serif'],
        'Open_Sans': ['Open Sans', 'sans-serif'],
      },
  },




    extend: {},
  },
  plugins: [],
}
