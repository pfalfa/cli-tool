const Table = require('cli-table')
const { prompt } = require('inquirer')
const { Command, flags } = require('@oclif/command')
const { api, msg, db } = require('../utils')

class LoginCommand extends Command {
  async run() {
    const { flags } = this.parse(LoginCommand)
    var email = flags.email
    var passphare = flags.passphare

    if (email === undefined) {
      const res = await prompt({
        type: 'input',
        name: 'email',
        message: 'Your email?',
        required: true,
        validate: async input => {
          if (input === '') return this.log(msg.fail('Email is required!'))
          return true
        },
      })
      email = res.email
    }

    if (passphare === undefined) {
      const res = await prompt({
        type: 'password',
        name: 'passphare',
        message: 'Your passphare?',
        required: true,
        validate: async input => {
          if (input === '') return this.log(msg.fail('Passphare/password is required!'))
          return true
        },
      })
      passphare = res.passphare
    }

    api
      .post(api.host.ihub, 'auth/login', { email, passphare })
      .then(resp => {
        const { success, message, data } = resp
        if (!success) return this.log(msg.fail(message))

        const table = new Table()
        const user = {
          email: (data && data.profile && data.profile.email) || '',
          pubkey: (data && data.pub) || '',
        }

        db.write(user)
        table.push({ Email: user.email }, { 'Public Key': user.pubkey })
        return this.log(table.toString())
      })
      .catch(error => {
        return this.log(msg.error(error))
      })
  }
}

LoginCommand.flags = {
  email: flags.string({ char: 'e', description: 'developer email (required)' }),
  passphare: flags.string({ char: 'p', description: 'developer passphare/password (required)' }),
}

LoginCommand.description = `Login to Pfalfa Identity Hub
...
Extra documentation goes here
`

module.exports = LoginCommand
