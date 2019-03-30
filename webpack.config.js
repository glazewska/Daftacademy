var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
        entry: './src/index.js',
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist')
        },
        mode: 'development', // 'production'
        module: {
            rules: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.s(a|c)ss$/,
                    use: [isProduction ?
                        MiniCssExtractPlugin.loader : {
                            loader: 'style-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: isProduction
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: isProduction
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: isProduction
                            }
                        }
                    ],
                }
            ]
        },
        plugins: [
                new HtmlWebpackPlugin(),
                new MiniCssExtractPlugin({
                        // Options similar to the same options in webpackOptions.output; optional
                        filename: "style.css",
                        chunkFilename: "style.css"
                    })
                    ]
                };
