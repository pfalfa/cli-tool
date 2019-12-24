const {Command, flags} = require('@oclif/command')

class ProfileCommand extends Command {
  async run() {
    const {flags} = this.parse(ProfileCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from /Users/adisetiawan/project/pfalfa-cli-tool/src/commands/profile.js`)
  }
}

ProfileCommand.description = `Get Pfalfa Identity Hub Profile
...
Extra documentation goes here
`

module.exports = ProfileCommand
