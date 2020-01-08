const jsonfile = require('jsonfile')
const file = './bin/pfalfa.json'

async function write(payload) {
  return await jsonfile
    .writeFile(file, payload, { spaces: 2, EOL: '\r\n' })
    .then(resp => resp)
    .catch(() => undefined)
  // .catch(error => console.error(error))
}

async function read() {
  return await jsonfile
    .readFile(file, { spaces: 2, EOL: '\r\n' })
    .then(resp => resp)
    .catch(() => undefined)
  // .catch(error => console.error(error))
}

module.exports = db = { write, read }
