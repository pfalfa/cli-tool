const {Command, flags} = require('@oclif/command')

class DeployCommand extends Command {
  async run() {
    const {flags} = this.parse(DeployCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/adisetiawan/project/pfalfa-cli-tool/src/commands/deploy.js`)
  }
}

DeployCommand.description = `Deploy dApps to Pfalfa IPFS Gateway
...
Extra documentation goes here
`

DeployCommand.flags = {
  name: flags.string({char: 'n', description: 'dApps name'}),
  file: flags.string({char: 'f', description: 'full path of zip file'}),
}

module.exports = DeployCommand
