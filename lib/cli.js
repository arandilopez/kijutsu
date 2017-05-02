'use strict'
const _ = require('lodash')
require('./models');
const UserService = require('./services/UserService')
const { Spinner } = require('clui')
const chalk = require('chalk');
const Cli = {}

async function run(params) {
  let spinner = new Spinner('Loadding user information 🙈  🙉  🙊 ')
  var username = params[0]
  spinner.start()
  try {
    var user = await UserService.getUserByUsername(username)
  } catch (e) {
    spinner.stop()
    console.log(chalk.red(e.message));
  }

  var userID = parseInt(user.id, 10)
  try {
    var currents = await UserService.getCurrentLibraryEntries(userID)
    var currentsTime = currents.reduce(function (carry, entry) {
      let time = _.get(entry, 'progress', 0) * _.get(entry, ['anime','episodeLength'], 0)
      return carry + time
    }, 0)

    var completed = await UserService.getCompletedLibraryEntries(userID)
    var completedTime = completed.reduce(function (carry, entry) {
      let time = _.get(entry, 'progress', 0) * _.get(entry, ['anime','episodeLength'], 0)
      return carry + time
    }, 0)

    spinner.stop()
    console.log(`👁  Time in currently watching: ${currentsTime} mins`);
    console.log(`😎  Time in completed: ${completedTime} mins`);
  } catch (e) {
    spinner.stop()
    console.log(chalk.red(e.message));
  }

}
Cli.run = run

module.exports = Cli
