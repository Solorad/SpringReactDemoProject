var path = require('path');

var node_dir = __dirname + '/node_modules';

module.exports = {
    entry: './src/main/resources/static/js/index.js',
    devtool: 'sourcemaps',
    resolve: {
        alias: {
            'stompjs': node_dir + '/stompjs/lib/stomp.js',
        }
    },
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            },
            { test: /\.png$/, loader: 'file' }
        ]
    }
};