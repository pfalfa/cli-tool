const { prompt } = require('inquirer')
const { Command, flags } = require('@oclif/command')
const { api, msg } = require('../utils')

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
        return this.log(msg.success(data))
      })
      .catch(error => {
        return this.log(msg.error(error))
      })
  }
}

LoginCommand.description = `Login to Pfalfa Identity Hub
...
Extra documentation goes here
`

LoginCommand.flags = {
  email: flags.string({ char: 'e', description: 'developer email (required)' }),
  passphare: flags.string({ char: 'p', description: 'developer passphare/password (required)' }),
}

module.exports = LoginCommand
