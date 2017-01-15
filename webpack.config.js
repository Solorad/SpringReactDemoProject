const path = require('path');
const webpack = require('webpack');


var node_dir = __dirname + '/node_modules';
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const plugins = [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: "c", filename: "c.js" }),
    new webpack.HotModuleReplacementPlugin()
];

if (isProd) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false,
              screw_ie8: true,
              conditionals: true,
              unused: true,
              comparisons: true,
              sequences: true,
              dead_code: true,
              evaluate: true,
              if_return: true,
              join_vars: true,
          },
          output: {
              comments: false
          },
      })
    );
} else {
    plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );
}

module.exports = {
    entry: './src/main/resources/static/js/index.js',
    devtool: isProd ? 'source-map' : 'eval',
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
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.png$/,
                loader: 'file'
            },
            {
              test: /\.less$/,
              use: [
                'style-loader',
                { loader: 'css-loader', options: { importLoaders: 1 } },
                'less-loader'
              ]
            }

        ]
    }
};