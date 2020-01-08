const jsonfile = require('jsonfile')
const file = './bin/pfalfa.json'

function write(payload) {
  return jsonfile.writeFileSync(file, payload, { spaces: 2, EOL: '\r\n' })
}

function read() {
  return jsonfile.readFileSync(file, { spaces: 2, EOL: '\r\n' })
}

module.exports = db = { write, read }
