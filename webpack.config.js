const webpack = require('webpack');
const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const node_dir = __dirname + '/node_modules';

const plugins = [
  new webpack.NamedModulesPlugin(),
  new webpack.optimize.CommonsChunkPlugin({ name: "c", filename: "c.js" })
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
  output: {
    path: __dirname,
    filename: './src/main/resources/static/built/bundle.js',
  },
  resolve: {
    alias: {
      'stompjs': node_dir + '/stompjs/lib/stomp.js',
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {test: /\.png$/,
        use: "file-loader"
      }
    ]
  },
  plugins
};