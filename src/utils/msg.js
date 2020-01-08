const chalk = require('chalk')
const killpid = require('./killpid')

function error(str) {
  killpid()
  return chalk.red(chalk.bold.red('[Fail]'), str)
}

function fail(str) {
  killpid()
  return chalk.magenta(chalk.bold.magenta('[Fail]'), str)
}

function success(str) {
  killpid()
  return chalk.green(chalk.bold.green('[Success]'), str)
}

module.exports = msg = { error, fail, success }
