'use strict'
const _ = require('lodash')
require('./models');
const UserService = require('./services/UserService')
const TimeService = require('./services/TimeService')
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
    var current = await UserService.getCurrentLibraryEntries(userID)
    var currentTime = current.reduce(function (carry, entry) {
      let time = _.get(entry, 'progress', 0) * _.get(entry, ['anime','episodeLength'], 0)
      return carry + time
    }, 0)

    var completed = await UserService.getCompletedLibraryEntries(userID)
    var completedTime = completed.reduce(function (carry, entry) {
      let time = _.get(entry, 'progress', 0) * _.get(entry, ['anime','episodeLength'], 0)
      return carry + time
    }, 0)

    spinner.stop()

    var currentParsed = TimeService.parseTimeInAnime(currentTime)
    let currentText = `👁  Time in currently watching: ${currentParsed.months} months, ${currentParsed.days} days, ${currentParsed.hours} hours, ${currentParsed.mins} mins`
    console.log(currentText)


    var completedParsed = TimeService.parseTimeInAnime(completedTime)
    let completedText = `😎  Time in completed: ${completedParsed.months} months, ${completedParsed.days} days, ${completedParsed.hours} hours, ${completedParsed.mins} mins`
    console.log(completedText)
  } catch (e) {
    spinner.stop()
    console.log(chalk.red(e.message));
  }

}
Cli.run = run

module.exports = Cli
