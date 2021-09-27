//  webpack 基础配置文件
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const { separator } = require("./utils/constant.js");
const { getEntryTemplate } = require("./utils/helper.js");
const packages = process.env.packages.split(separator);
const { entry, htmlPlugins } = getEntryTemplate(packages);
module.exports = {
  mode: "development",
  // entry: {
  //   main: path.resolve(__dirname, "../src/packages/home/index.tsx"),
  //   editor: path.resolve(__dirname, "../src/packages/editor/index.tsx"),
  // },
  entry,
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "../src"),
      "@containers": path.resolve(__dirname, "../src/containers"),
      "@packages": path.resolve(__dirname, "../src/packages"),
    },
    mainFiles: ["index", "main"], // 解析文件路径
    extensions: [".tsx", ".ts", ".json", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        // babel-loader 只是一个桥梁  真正需要其他预设的babel插件
        use: "babel-loader",
      },
      //asset 资产的意思
      {
        test: /\.(png|jpe?g|svg|gif)$/, // 注意这里是type 不是use
        type: "asset/inline", //相当于file-loader  超过一定字节使用file-loader  copy 不超过使用dataurl
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext][query]",
        },
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, //  代替style-loader
          },
          "css-loader",
          "postcss-loader",
          { loader: "resolve-url-loader", options: { keepQuery: true } },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    // chunks 是指生成的html中仅包含chunk的模块
    // new HtmlWebpackPlugin({
    //   filename: "main.html",
    //   chunks: ["main"],
    //   template: path.resolve(__dirname, "../public/index.html"),
    // }),
    // new HtmlWebpackPlugin({
    //   filename: "editor.html",
    //   chunks: ["editor"],
    //   template: path.resolve(__dirname, "../public/index.html"),
    // }),
    ...htmlPlugins,
  ],
};
