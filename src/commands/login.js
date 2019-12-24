const {Command, flags} = require('@oclif/command')

class LoginCommand extends Command {
  async run() {
    const {flags} = this.parse(LoginCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/adisetiawan/project/pfalfa-cli-tool/src/commands/login.js`)
  }
}

LoginCommand.description = `Login to Pfalfa Identity Hub
...
Extra documentation goes here
`

LoginCommand.flags = {
  email: flags.string({char: 'e', description: 'developer email'}),
}

module.exports = LoginCommand
