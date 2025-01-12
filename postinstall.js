const { execSync } = require('child_process');
const chalk = require("chalk")

try {
  execSync('git pull .');
  console.log(chalk.green('✅ Pulled latest files from repository (arc.aoi)!'));
} catch (error) {
  console.error(chalk.red('❌ Failed to pull latest files from repository arc.aoi:', error));
}

try {
  execSync('npm install chalk');
  console.log(chalk.green('✅ Installed Chalk | Version 4.1.2'));
} catch (error) {
  console.error(chalk.red('❌ Failed to install dependencies:', error));
}

try {
  execSync('npm install https://github.com/JosipFX1/aoi.js-arc.aoi');
  console.log(chalk.green('✅ Installed aoi.js V6.9.0 | Modified version'));
} catch (error) {
  console.error(chalk.red('❌ Failed to install dependencies:', error));
}