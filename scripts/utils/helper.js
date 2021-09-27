const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { log, MAIN_FILE } = require("./constant.js");

const dirPath = path.resolve(__dirname, "../../src/packages");

// packages中的路径
const entry = Object.create(null);

//log(fs.readdirSync(dirPath)); // [editor,home]
fs.readdirSync(dirPath).forEach((file) => {
  const entryPath = path.resolve(dirPath, file);
  // log(JSON.stringify(fs.statSync(entryPath))); // 文件路径的详细信息
  if (fs.statSync(entryPath)) {
    entry[file] = path.resolve(entryPath, MAIN_FILE);
  }
});

const getEntryTemplate = (packages) => {
  const entry = Object.create(null);
  const templates = [];
  packages.forEach((package) => {
    entry[package] = path.join(dirPath, package, MAIN_FILE);
    templates.push(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "../../public/index.html"),
        chunks: ["manifest", "vendors", package],
        filename: `${package}.html`,
      })
    );
  });
  return {
    entry,
    htmlPlugins: templates,
  };
};
module.exports = { entry, getEntryTemplate };
