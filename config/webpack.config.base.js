const HtmlWebpackPlugin = require('html-webpack-plugin');
const { build, html, stylesScss, resolveSrc } = require('./paths');

module.exports = {
  entry: [stylesScss],
  devtool: 'source-map',
  output: {
    path: build,
    publicPath: '',
    filename: 'js/[name].[chunkhash].js'
  },
  resolve: {
    modules: ['node_modules', resolveSrc('sass/base')],
    extensions: ['.js', '.json', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: { loader: 'babel-loader', options: { cacheDirectory: true } }
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'assets/img/[name].[ext]' }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/fonts/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: html
    })
  ]
};
/*
what are the template for stylesheet produced by spritesmith
what we could do is put generated by spritesmith stylesheet and image back to icon folder and styles
so if image gets used it removed from file-loader processing
how do we switch between css and scss modes
what do we do about external libraries(font-awesome, bootstrap)
*/

/* JS processing
  -- eslint
  -- babel-loader for transpiling
  -- commonschunkplugin to separate? or vendor bundle would be enough?
  what are the browser support for babel
  so without ane presets babel-preset-env behaves as babel-preset-latest
    Babel preset that automatically determines the Babel plugins you need based on your supported environments. Uses compat-table
  basically we can specify what browsers we intend to support and it will use corresponding presets for transpiling
  are we going to add polyfills via babel-polyfills and using useBuiltIns
    optimal usage of that property of configuration is usage, which only adds specific import of feature used and not supported by targeted browsers
 */

/* For eslint configuration
  -- do we need impliedStrict that enables global strict mode
*/

/* Welp's
  -- looks like sass-loader all picky about comments, don't like the '//' variant
*/

/* 
  so the webpack cannot pickup and load files that linked in src of script tags
  means that it needs to be explicetly added as entry point

  so we can process process js files linked in html but if their loader produce error output instead of source code(like eslint)
  then it will be put in html instead of source code and html-plugin will fail
 */

/* 
  resolve.module resolves depending on type of path specified:
    absolute - only specified directory
    relative - directory and ancestors, slimilar to searchig for node_modules
  */
