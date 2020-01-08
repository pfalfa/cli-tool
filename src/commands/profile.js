const Table = require('cli-table')
const { Command } = require('@oclif/command')
const { api, msg, db } = require('../utils')

class ProfileCommand extends Command {
  async run() {
    const user = await db.read()
    if (user === undefined) return this.log(msg.error('Please login first!'))

    api
      .get(api.host.ihub, 'users', user.pubkey)
      .then(resp => {
        const { success, message, data } = resp
        if (!success) return this.log(msg.fail(message))

        const table = new Table()
        table.push({ Email: data.alias }, { 'Public Key': data.pub })
        return this.log(table.toString())
      })
      .catch(error => {
        return this.log(msg.error(error))
      })
  }
}

ProfileCommand.description = `Get Pfalfa Identity Hub Profile
...
Extra documentation goes here
`

module.exports = ProfileCommand
