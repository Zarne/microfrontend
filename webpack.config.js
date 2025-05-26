const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const webpack = require('webpack');
const { ContainerManager } = require( '@module-federation/managers' );
const path = require('path');



const optionExposeComponent = {
      name: 'yarum_components',
      filename: 'remoteEntry.js',
      exposes: {
        './equipes': './src/components/equipes/equipes.tsx',
        './operations': './src/components/equipes/operations.tsx',
      },

      shared: {
        react: { singleton: true, eager: true },
      }
    };
const containerManager = new ContainerManager();
containerManager.init(optionExposeComponent);
// it will set expose name automatically
optionExposeComponent.exposes = containerManager.containerPluginExposesOptions;


module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3002,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  },
  output: {
    publicPath: 'auto',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.(tsx?|ts?|js?|jsx?)$/, use: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  externals: {
    'react': 'React'
  },
  plugins: [
    // To learn more about the usage of this plugin, please visit https://webpack.js.org/plugins/module-federation-plugin/
    new ModuleFederationPlugin(optionExposeComponent),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.ProvidePlugin({
        "React": "react",
    }),
  ],
};
