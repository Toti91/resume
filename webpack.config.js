const path = require('path');
const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncWebpackPlugin = require('browser-sync-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
});


const config = {
    entry: `${SRC_DIR}/index.js`,
    output: {
        path: DIST_DIR,
        filename: 'bundle.js',
        publicPath: '/'
    },
    devtool: 'source-map',
    watch: true,
    devServer: {
        port: 3000,
        contentBase: './src',
        watchContentBase: true
    },
    module: {
        rules: [
            {
                test: /\.js?/,
                include: SRC_DIR,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["es2015", "stage-2"]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'public/images/',
                    publicPath: '/public/images/',
                }
            }
        ],
        loaders: [
            // the url-loader uses DataUrls. 
            // the file-loader emits files. 
            { 
              test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
              loader: "url-loader?limit=10000&mimetype=application/font-woff" 
            },
            { 
              test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
              loader: "file-loader" 
            },
          ]
    },
    plugins: [
        extractPlugin,
        new HtmlWebpackPlugin({
            template: `${SRC_DIR}/index.html`,
            title: 'Bingo Dingo'
        })
        
    ]
}

module.exports = config;
