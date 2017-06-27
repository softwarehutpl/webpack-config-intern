const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(env) {
    return {
        entry: {
            app: './src/app.js',
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },

        module: {
            rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                })
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader'],
                })
            }, {
                test: /\.jpg$/,
                use: ["file-loader"],
            }, {
                test: /\.png$/,
                use: ["url-loader?mimetype=image/png"],
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }]
        },

        plugins: [
            new ExtractTextPlugin({
                filename: '[name].bundle.css',
                allChunks: true,
                disable: env === 'dev',
            }),
        ],
    };
};
