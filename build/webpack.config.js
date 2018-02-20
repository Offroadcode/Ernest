const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
    entry: ['./assets/js/app.js', './assets/scss/styles.scss'],
    output: {
        filename: './dist/App_Plugins/Ernest/js/bundle.js'
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: './assets/package.manifest', to: './dist/App_Plugins/Ernest/package.manifest'},
            {from: './assets/views', to: './dist/App_Plugins/Ernest/views'}
        ]),
        new ExtractTextPlugin({
            filename: './dist/App_Plugins/Ernest/css/styles.css',
            allChunks: true
        }),
        new UglifyJSPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader?importLoaders=1',
                }),
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015', 'stage-2']
                }
            }
        ],
    } 
};