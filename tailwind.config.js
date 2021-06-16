module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          ghost: 'hsl(209, 100%, 70%)',
          light: 'hsl(209, 100%, 60%)',
          DEFAULT: 'hsl(209, 100%, 55%)',
          dark: 'hsl(209, 100%, 50%)',
          mute: 'hsl(209, 100%, 40%)',
        },
      },
    },
    screens: {
      desktop: { min: '1441px' },

      labtop: { max: '1440px' },

      'sm-labtop': { max: '1024px' },

      tablet: { max: '768px' },

      mobile: { max: '425px' },
    },
  },
  variants: {},
  plugins: [],
};
