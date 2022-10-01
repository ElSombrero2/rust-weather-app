const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack')

module.exports = (env) => {
    return {
        entry: './src/main.ts',
        mode: (env.production) ? 'production' : 'development',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'public')
            },
            compress: true,
            port: 8000
        },
        module: {
            rules: [
                {
                    test: /\.hbs?$/,
                    use: ['handlebars-loader']
                },
                {
                    test: /\.css?$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.scss?$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.ts?$/,
                    use: ['ts-loader']
                },
                { test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/, loader: 'file-loader' },
                {
                    type: 'javascript/auto',
                    test: /\.json$/,
                    include: /(lottie)/,
                    loader: 'lottie-web-webpack-loader',
                    options: {
                      assets: {
                        scale: 1
                      }
                    }
                  }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        plugins: [
            new webpack.ProvidePlugin({process: 'process/browser'}),
            new HtmlWebpackPlugin({template: './public/index.html'}),
            new Dotenv({
                path: (env.production) ? './.env.prod' : './.env.local',
                systemvars: true
            })
        ]
    }
} 