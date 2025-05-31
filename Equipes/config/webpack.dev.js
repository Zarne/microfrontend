const path = require("path");
const paths = require('./paths')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const CopyPlugin = require("copy-webpack-plugin");
const ModuleFederationPlugin = require("@module-federation/enhanced").ModuleFederationPlugin;

const mfepackage = require("../package.json");
const mfeDependencies = { ...mfepackage.dependencies };

const common = require('./webpack.common.js')

module.exports = merge(common, {

      
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',

  // Enable: It is possible testing in IE 11, but reload / replacement will break due to a bug in webpack 5 !
  // Disable: It is possible to use hot relad / replacement but not using IE 11 !
  // target: ['web', 'es5'], 

  // enable devServer-logging
  infrastructureLogging: {
    level: 'verbose',
    debug:[(name) => name.includes('webpack-dev-server')],
  },
  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 9400,
    host: 'localhost',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    },
    
    server: {
      type: "https",
      options: {
        key: path.join(__dirname, "./ssl/localhost-key.pem"),
        cert: path.join(__dirname, "./ssl/localhost-cert.pem"),
        ca: path.join(__dirname, "./ssl/rootCA.pem"),
      },
    }
  },

  plugins: [
    
    new CopyPlugin({
      patterns: [
        { from: "public/assets/images", to: "assets/images" },
        { from: "public/locales", to: "locales" },
        {
          from: path.resolve(__dirname, "dev/env-config.js"),
          to: "environmentConfig/env-config.js",
        },
      ],
    }),
    
    new ModuleFederationPlugin({
        name: "yarum",
        filename: "remoteEntry.js",
        exposes: {
          "./EquipesInjector": path.resolve(paths.src, "views/equipes/EquipesInjector.js"),
          "./Plannings": path.resolve(paths.src, "views/plannings/Plannings.tsx"),
        },
        shared: {
          react: {                  singleton: true, eager: true },
          "react-dom": {            singleton: true, eager: true },
          "react-dom/client": {     singleton: true },
          "react-error-boundary": { singleton: true, requiredVersion: mfeDependencies["react-error-boundary"],}
        },
        getPublicPath: 'function() {return window.env.module.equipe.url + "/"}',
        dev: true
      }),
  ],
})

