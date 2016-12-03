import 'babel-polyfill'
import glob from 'glob'
import path from 'path'
import webpack from 'webpack'

const DEBUG = !process.argv.includes('--release')
const VERBOSE = process.argv.includes('--verbose')

export default {
  cache: DEBUG,

  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE
  },

  entry: {
    app: path.join(__dirname, 'src/app.js'),
    edit: path.join(__dirname, 'src/edit.js'),
    game: path.join(__dirname, 'src/game.js'),
    test: glob.sync(path.join(__dirname, 'src/js/**/*.test.js'))
  },

  output: {
    publicPath: '/',
    sourcePrefix: '  ',
    path: path.join(__dirname, 'docs'),
    filename: '[name].js'
  },

  target: 'web',

  devtool: DEBUG ? 'inline-source-map' : false,

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV || (DEBUG ? 'development' : 'production')}"`
    }),
    ...(DEBUG ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: VERBOSE
        }
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
    ])
  ],

  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    root: [
      path.join(__dirname, 'src/js'),
      path.join(__dirname, 'resources')
    ]
  },

  module: {
    loaders: [{
      test: /\.html$/,
      loader: 'html?minimize'
    }, {
      // app
      test: /\.js[x]?$/,
      include: [path.join(__dirname, 'src')],
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    }, {
      // test
      test: /\.test\.js[x]?$/,
      include: [path.join(__dirname, 'src/js')],
      loaders: ['mocha', 'babel']
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.scss$/,
      include: [path.join(__dirname, 'src')],
      loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?outputStyle=expanded&sourceMap'
    }, {
      test: /\.mustache$/,
      include: [path.join(__dirname, 'src/templates')],
      loader: 'mustache'
    }, {
      test: /\.(svg|png|jpg)$/,
      include: [path.join(__dirname, 'resources')],
      loader: 'url-loader'
    }]
  },

  sassLoader: {
    includePaths: [
      path.join(__dirname, 'src/sass'),
      path.join(__dirname, 'node_modules/node-normalize-scss')
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    port: 8080,
    hot: true,
    inline: true
  }
}
