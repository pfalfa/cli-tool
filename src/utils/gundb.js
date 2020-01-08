const Gun = require('gun')
const killpid = require('./killpid')
require('gun/sea')
require('gun/lib/webrtc')

const gun = Gun({ file: 'db', peers: ['https://pfalfa-ihub.pfalfa.io/gun'], axe: false })

async function auth(email, passphare) {
  const user = gun.user().recall({ sessionStorage: false })
  return new Promise((resolve, reject) => {
    user.auth(email, passphare, ack => {
      if (ack && ack.err) return reject(ack.err)
      user.leave()
      killpid()
      return resolve({
        email: ack.put.alias || '',
        pubkey: ack.put.pub || '',
      })
    })
  })
}

module.exports = gundb = { gun, auth }
