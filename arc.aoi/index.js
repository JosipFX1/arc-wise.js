const { ArcFunctions } = require("./arcfunctions.js");
const chalk = require("chalk")
const { version } = require('../package.json');

module.exports = {
  ArcFunctions
};

setTimeout(async () => {
console.log(chalk.red(`
╭──────────────────────────────────────────────────────────────────────────────────────────────╮
│            arc.aoi                                                                           │
│      Modified Version of aoi.js is installed.                                                │
│ Please do not install official and use modified one because its meant to be used for arc.aoi │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯`))
}, 5000)

setTimeout(async () => {
console.log(chalk.blueBright(`
╭───────────────────────────────╮
│            arc.aoi            │
│         Version: ${version}        │
│ https://discord.gg/MmJ3PQWVSS │
╰───────────────────────────────╯`))
}, 5000)