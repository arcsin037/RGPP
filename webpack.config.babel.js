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
        test: glob.sync(path.join(__dirname, 'src/js/**/*.test.js'))
    },

    output: {
        publicPath: '/',
        sourcePrefix: '  ',
        path: path.join(__dirname, 'public'),
        filename: '[name].js'
    },

    target: 'web',

    devtool: DEBUG ? 'cheap-module-eval-source-map' : false,

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': `"${process.env.NODE_ENV || (DEBUG ? 'development' : 'production')}"`
        }),
        ...(DEBUG ? [] : [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    screw_ie8: true,
                    warnings: VERBOSE
                }
            }),
            new webpack.optimize.AggressiveMergingPlugin()
        ])
    ],

    resolve: {
        extensions: ['', '.js', '.json'],
        root: path.join(__dirname, 'src/js')
    },

    module: {
        loaders: [
            {test: /\.html$/, loader: 'html?minimize'},
            // for app
            {test: /\.js[x]?$/, include: [path.join(__dirname, 'src')], loader: 'babel'},
            // for test
            {test: /\.test\.js$/, include: [path.join(__dirname, 'src/js')], loaders: ['mocha', 'babel']},
            {test: /\.json$/, loader: 'json'},
            {test: /\.css$/, loader: 'style!css'}
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 8080,
        hot: true,
        inline: true
    }
}
