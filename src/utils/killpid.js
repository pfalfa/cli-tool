const ps = require('ps-node')

function killpid() {
  setTimeout(() => {
    ps.kill(process.pid, 'SIGKILL')
  }, 1000)
}

module.exports = killpid
