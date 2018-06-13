let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */


// BABEL config
mix.webpackConfig({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'stage-2']
          }
        }
      }
    ]
  }
})


mix.react('resources/assets/js/app.js', 'public/js')
	.sass('resources/assets/sass/app.scss', 'public/css')
    .styles(['resources/assets/styles/dist/semantic.css',
        'resources/assets/css/animate.css', 'resources/assets/css/fontawesome-all.min.css'],'public/css/all.css');
