/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./public/views/general_layout.pug",
    "./public/views/**/*.pug"
  ],
  theme: {
    screens:{
      'large-dt':{'min':'1000px'},
      'medium-dt':{'min':'920px','max':'1000px'},
      'small-dt':{'min':'600px','max':'920px'},
      'xs-dt':{'max':'600px'},
      'small-center':{'max':'920px'},
      'large-uncenter':{'min':'920px'}
    },
    extend: {
      backgroundImage:{
        'about':"url('./public/img/about-header-final.png"
      },
      colors:{
        'near-black':'#1B1B1A',
        'near-white':'#FAFAFA',
        'aqua-blue':'#088F99',
        'mid-gray':'#989898'
      }
    },
  },
  plugins: [],
  mode: 'jit',
}
