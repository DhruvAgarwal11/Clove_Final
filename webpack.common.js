const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  // Note: 
  // Chrome MV3 no longer allowed remote hosted code
  // Using module bundlers we can add the required code for your extension
  // Any modular script should be added as entry point
  entry: {
    firebase_config: './src/popup/firebase_config.js',
    popup: './src/popup/popup.js',
    main_script: './src/popup/main-script.js',
    options: './src/options/options.js',
    productMoneyCO2: './src/content/productMoneyCO2.js'
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "popup", "popup.html"),
      filename: "popup.html",
      chunks: ["popup"] // This is script from entry point
    }),
    // Note: you can add as many new HtmlWebpackPlugin objects  
    // filename: being the html filename
    // chunks: being the script src
    // if the script src is modular then add it as the entry point above
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "options", "options.html"),
      filename: "options.html",
      chunks: ["options"] // This is script from entry point
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "popup", "main.html"),
      filename: "main.html",
      chunks: ["main_script"] // This is script from entry point
    }),
    // Note: This is to copy any remaining files to bundler
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/manifest.json' },
        { from: './src/background/background.js' },
        { from: './src/content/content.js' },
        { from: './src/content/productMoneyCO2.js' },
        { from: './src/content/cartMoneyExtract.js' },
        { from: './src/icons/*' },
        { from: './src/css/*' }
      ],
    }),
  ],
  output: {
    // chrome load unpacked extension looks for files under dist/* folder
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
};