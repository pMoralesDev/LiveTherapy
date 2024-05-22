const path = require('path')
const nodeExternals = require('webpack-node-externals')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        'index' : './src/index.ts'
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].js',
        publicPath: '/',
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                      configFile: 'tsconfig.json',
                    },
                },
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    },
    externals: [nodeExternals()],
   
}