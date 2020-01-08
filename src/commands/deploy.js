const fs = require('fs')
const path = require('path')
const moment = require('moment')
const Table = require('cli-table')
const { prompt } = require('inquirer')
const { Command, flags } = require('@oclif/command')
const { api, msg, db } = require('../utils')

const categories = ['High-Rish', 'Game', 'Gambling', 'Exchange', 'Finance', 'Social', 'Art', 'Tools', 'Others']

class DeployCommand extends Command {
  async run() {
    const user = await db.read()
    const { flags } = this.parse(DeployCommand)

    var name = flags.name
    var category = flags.category
    var description = flags.description
    var file = flags.file
    if (user === undefined) return this.log(msg.error('Please login first!'))
    if (category !== undefined && categories.indexOf(category) < 0)
      return this.log(msg.error(`Please choice one category dApp (${categories.join(',')})`))

    if (name === undefined) {
      const res = await prompt({
        type: 'input',
        name: 'name',
        message: 'DApp name?',
        required: true,
        validate: async input => {
          if (input === '') return this.log(msg.fail('DApp name is required!'))
          return true
        },
      })
      name = res.name
    }

    if (category === undefined) {
      const res = await prompt({
        type: 'list',
        choices: categories,
        name: 'category',
        message: 'Category DApp?',
        required: true,
        validate: async input => {
          if (input === '') return this.log(msg.fail('Category DApp is required!'))
          return true
        },
      })
      category = res.category
    }

    if (description === undefined) {
      const res = await prompt({
        type: 'input',
        name: 'description',
        message: 'Description DApp?',
        required: false,
      })
      description = res.description !== '' ? res.description : null
    }

    if (file === undefined) {
      const res = await prompt({
        type: 'input',
        name: 'file',
        message: 'Full path of zip file DApp?',
        required: true,
        validate: async input => {
          if (input === '') return this.log(msg.fail('Zip file DApp is required!'))
          return true
        },
      })
      file = res.file
    }

    fs.readFile(file, async error => {
      if (error) return this.log(msg.error(error.message))
      if (path.extname(file) !== '.zip') return this.log(msg.error('File DApp must be compressed with extension zip'))

      api
        .post(api.host.pfalfa, 'dapps', { podName: name, category, description }, user.pubkey)
        .then(async resp => {
          const { success, message, data } = resp
          if (!success) return this.log(msg.fail(message))

          const respUpload = await api.upload(api.host.pfalfa, 'ipfs/upload', file, user.pubkey)
          const table = new Table()
          table.push(
            { 'DApp Name': data.name },
            { Category: data.category },
            { 'IP Public': data.ipPublic ? data.ipPublic : '' },
            { Port: data.port ? data.port : '' },
            { 'Gun DB': data.gunDb ? data.gunDb : '' },
            { Status: data.status },
            { 'File Hash': respUpload.success ? respUpload.data.hash : '' },
            { 'Created At': moment(data.createdAt).format('DD MMM YYYY hh:mm:ss') }
          )
          return this.log(table.toString())
        })
        .catch(error => {
          return this.log(msg.error(error))
        })
    })
  }
}

DeployCommand.flags = {
  name: flags.string({ char: 'n', description: 'dApps name (required)' }),
  category: flags.string({ char: 'c', description: `category dApp (${categories.join(',')})` }),
  description: flags.string({ char: 'd', description: 'description dApp' }),
  file: flags.string({ char: 'f', description: 'full path of zip file (required)' }),
}

DeployCommand.description = `Deploy dApps to Pfalfa IPFS Gateway
...
Extra documentation goes here
`

module.exports = DeployCommand
