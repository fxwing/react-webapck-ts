const chalk = require("chalk");
// 固定的入口文件 packages/**/index.tsx
const MAIN_FILE = "index.tsx";

const error = chalk.bold.red;
const warning = chalk.hex("#FFA500");
const success = chalk.green;

const maps = {
  error,
  warning,
  success,
};

const log = (message, type = "success") => {
  console.log(maps[type](message));
};

// 打包多个文件的连接符*
// 比如打包editor和home->editor*home
const separator = "*";
// 固定端口
const BASE_PORT = 9000;

module.exports = {
  MAIN_FILE,
  log,
  separator,
  BASE_PORT,
};
