const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'public')
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                include: /node_modules/,
                test: /\.(eot|gif|otf|png|svg|ttf|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: ['file-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
        title: 'Caching',
        template: './src/index.html',
        favicon: './src/favicon.ico',
        inject: true
    }),
    new CopyWebpackPlugin([
        {
            context: './src/images',
            from: '**/*',
            to: './images'
        }
    ])
    
],

    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'https://localhost:44320/api'
        })
    }
}