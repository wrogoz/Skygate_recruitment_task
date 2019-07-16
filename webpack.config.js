const config = {
  server: {
    host: 'localhost',
    port: 3330,
  },
};

const webpack = require('webpack');
const path = require('path');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV;
const plugins = [];

if (env !== 'preproduction') {
  plugins.push(
    ...[
      new HtmlWebpackPlugin({
        inject: true,
        templateParameters: {
          userlane: env === 'production',
        },
        template: `${path.resolve(
          path.join(__dirname, 'web'),
        )}/index/index.html`,
      }),
    ],
  );
}

if (env === 'production') {
  plugins.push(
    ...[
      new UglifyjsWebpackPlugin(),
      new CompressionPlugin({
        test: /\.js(\?.*)?$/i,
      }),
    ],
  );
}

plugins.push(...[
  new webpack.DefinePlugin({
    GLOBAL_ENV: JSON.stringify(env),
  }),
]);

module.exports = {
  entry: {
    app: './src/index',
  },
  mode: env === 'production' ? 'production' : 'development',
  output: {
    filename: `[name].[contenthash]${env === 'production' ? '.min' : ''}.js`,
    path: path.resolve(path.join(__dirname, 'public')),
  },
  devtool: env !== 'production' && 'source-map',
  devServer: {
    host: config.server.host,
    port: config.server.port,
    open: true,
    historyApiFallback: true,
    disableHostCheck: true,
    contentBase: path.join(__dirname, 'public'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [path.join(__dirname, 'node_modules')],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          allowTsInNodeModules: true,
        },
      },
      {
        test: /\.scss$/,
        enforce: 'pre',
        loaders: ['import-glob-loader2'],
      },
      {
        test: /\.s?css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 128000,
            },
          },
        ],
      },
    ],
  },
  plugins,
};
