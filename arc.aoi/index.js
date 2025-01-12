const { ArcFunctions } = require("./arcfunctions.js");
const chalk = require("chalk")
const { version } = require("./package.json")

module.exports = {
  ArcFunctions
};

console.log(chalk.red(`Modified Version of aoi.js is installed. Please do not install official and use modified one because its meant to be used for arc.aoi`))
console.log(chalk.green(`arc.aoi - Version: ${version}`));