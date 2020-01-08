const chalk = require('chalk')

function error(str) {
  return chalk.red(chalk.bold.red('[Fail]'), str)
}

function fail(str) {
  return chalk.magenta(chalk.bold.magenta('[Fail]'), str)
}

function success(str) {
  return chalk.green(chalk.bold.green('[Success]'), str)
}

module.exports = msg = { error, fail, success }
