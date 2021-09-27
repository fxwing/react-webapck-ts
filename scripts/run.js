const inquirer = require("inquirer");
const execa = require("execa");
const { entry } = require("./utils/helper.js");
const { log, separator } = require("./utils/constant.js");
const env = process.env.NODE_ENV;
const packagesList = [...Object.keys(entry)];
if (!packagesList.length) {
  log("packages中必须要有入口文件", "error");
  return;
}
// 全部的选项
const allPackagesList = [...packagesList, "all"];

inquirer
  .prompt([
    {
      type: "checkbox",
      message: "请选择要启动的项目,空格选中",
      name: "devLists",
      choices: allPackagesList,
      validate: (values) => {
        return values.length ? true : new Error("至少选择一个项目进行启动");
      },
      filter: (values) => {
        if (values.includes("all")) return packagesList;
        return values;
      },
    },
  ])
  .then((res) => {
    const message = `当前选中的package为：${res.devLists.join(",")}`;
    log(message);
    runParallel(res.devLists);
  });

async function runParallel(packages) {
  log(`开始启动：${packages.join("-")}`);
  log("\n please await some times...");
  await build(packages);
}

async function build(packages) {
  const stringlist = packages.join(separator);
  await execa(
    "webpack",
    env === "development"
      ? ["serve", "--config", "./scripts/webpack.dev.js"]
      : ["--config", "./scripts/webpack.prod.js"],
    {
      stdio: "inherit",
      //  可以在process.env.packages中获取到
      env: {
        packages: stringlist,
      },
    }
  );
}
