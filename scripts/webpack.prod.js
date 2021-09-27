const { merge } = require("webpack-merge");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FriendlyErrorsWebplackPlugin = require("friendly-errors-webpack-plugin");
const baseConfig = require("./webpack.base.js");

const prodConfig = {
  mode: "production",
  devtool: "source-map",
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "../dist"),
  },
  plugins: [new CleanWebpackPlugin(), new FriendlyErrorsWebplackPlugin()],
};

module.exports = merge(baseConfig, prodConfig);
