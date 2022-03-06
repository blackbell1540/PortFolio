const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: {
            import: './src/index.js',
        },
        todolist: {
            import: './src/todolist/index.js',
        }
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    devServer: {
        hot: true,
        watchFiles: [
            'src/*',
            'src/todolist/*'
        ],
        port: 9000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            template: './src/todolist/index.html',
            filename: 'todolist/index.html',
            chunks: ['todolist']
        }),
    ],
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        ]
    }
}