const path = require("path");
const baseConfig = require("./webpack.base.js");
const { merge } = require("webpack-merge");

const devConfig = {
  mode: "development",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "../public"),
    },
    hot: true,
    compress: true,
    port: 9000,
  },
};
module.exports = merge(baseConfig, devConfig);
