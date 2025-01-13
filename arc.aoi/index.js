const { ArcFunctions } = require("./arcfunctions.js");
const chalk = require("chalk")
const { version } = require('../package.json');

module.exports = {
  ArcFunctions
};

console.log(chalk.blue(`
  ╭───────────────────────────────╮
  │            arc.aoi            │
  │         Version: ${version}        │
  │ https://discord.gg/MmJ3PQWVSS │
  ╰───────────────────────────────╯`))

console.log(chalk.red(`
╭──────────────────────────────────────────────────────────────────────────────────────────────╮
│            arc.aoi                                                                           │
│      Modified Version of aoi.js is installed.                                                │
│ Please do not install official and use modified one because its meant to be used for arc.aoi │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯`))