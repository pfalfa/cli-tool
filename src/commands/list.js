const moment = require('moment')
const Table = require('cli-table')
const { Command } = require('@oclif/command')
const { api, msg, db } = require('../utils')

class ListCommand extends Command {
  async run() {
    const user = await db.read()
    if (user === undefined) return this.log(msg.error('Please login first!'))

    api
      .get(api.host.pfalfa, 'dapps', user.pubkey)
      .then(resp => {
        const { success, message, data } = resp
        if (!success) return this.log(msg.fail(message))

        const table = new Table({
          head: ['DApp Name', 'Category', 'IP Public', 'Port', 'Gun DB', 'Status', 'Created At'],
        })
        data.length > 0 &&
          data.forEach(i => {
            table.push([
              i.name || '',
              i.category || '',
              i.ipPublic || '',
              i.port || '',
              i.gunDb || '',
              i.status || '',
              (i.createdAt && moment(i.createdAt).format('DD MMM YYYY hh:mm:ss')) || '',
            ])
          })

        return this.log(table.toString())
      })
      .catch(error => {
        return this.log(msg.error(error))
      })
  }
}

ListCommand.description = `List existing dApps
...
Extra documentation goes here
`

module.exports = ListCommand
