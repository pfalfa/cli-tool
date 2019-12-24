const {Command, flags} = require('@oclif/command')

class ListCommand extends Command {
  async run() {
    const {flags} = this.parse(ListCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/adisetiawan/project/pfalfa-cli-tool/src/commands/list.js`)
  }
}

ListCommand.description = `List existing dApps
...
Extra documentation goes here
`



module.exports = ListCommand
