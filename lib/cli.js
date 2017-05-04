'use strict'
const _ = require('lodash')
require('./models');
const UserService = require('./services/UserService')
const TimeService = require('./services/TimeService')
const { Spinner } = require('clui')
const chalk = require('chalk');
const Cli = {}

async function loadUser(username) {
  let spinner = new Spinner('Loadding user information...')
  spinner.start()
  try {
    let user = await UserService.getUserByUsername(username)
    spinner.stop()
    return user
  } catch (e) {
    spinner.stop()
    console.log(chalk.red(e.message));
    return null
  }
}

async function loadCurrentLibrary(userId) {
  let spinner = new Spinner('Loadding current library info...')
  spinner.start()
  try {
    let current = await UserService.getCurrentLibraryEntries(userId)
    let time = current.reduce(function (carry, entry) {
      let time = _.get(entry, 'progress', 0) * _.get(entry, ['anime','episodeLength'], 0)
      return carry + time
    }, 0)
    let parsedTime = TimeService.parseTimeInAnime(time)
    let text = `👁  Time in currently watching: ${parsedTime.months} months, ${parsedTime.days} days, ${parsedTime.hours} hours, ${parsedTime.mins} mins`
    spinner.stop()
    console.log(text)

    return time
  } catch (e) {
    spinner.stop()
    console.log(chalk.red(e.message));
  }
}

async function loadCompletedLibrary(userId) {
  let spinner = new Spinner('Loadding completed library info...')
  spinner.start()
  try {
    let completed = await UserService.getCompletedLibraryEntries(userId)
    let time = completed.reduce(function (carry, entry) {
      let time = _.get(entry, 'progress', 0) * _.get(entry, ['anime','episodeLength'], 0)
      return carry + time
    }, 0)
    let parsedTime = TimeService.parseTimeInAnime(time)
    let text = `😎  Time in completed: ${parsedTime.months} months, ${parsedTime.days} days, ${parsedTime.hours} hours, ${parsedTime.mins} mins`
    spinner.stop()
    console.log(text)

    return time
  } catch (e) {
    spinner.stop()
    console.log(chalk.red(e.message));
  }
}

async function loadOnHoldLibrary(userId) {
  let spinner = new Spinner('Loadding on-hold library info...')
  spinner.start()
  try {
    let on_hold = await UserService.getOnHoldLibraryEntries(userId)
    let time = on_hold.reduce(function (carry, entry) {
      let time = _.get(entry, 'progress', 0) * _.get(entry, ['anime','episodeLength'], 0)
      return carry + time
    }, 0)
    let parsedTime = TimeService.parseTimeInAnime(time)
    let text = `🤔  Time in on-hold: ${parsedTime.months} months, ${parsedTime.days} days, ${parsedTime.hours} hours, ${parsedTime.mins} mins`
    spinner.stop()
    console.log(text)

    return time
  } catch (e) {
    spinner.stop()
    console.log(chalk.red(e.message));
  }
}

function printTotalTime(times) {
  let time = _.sum(times)
  let parsed = TimeService.parseTimeInAnime(time)
  let text = `❤️  Time spent in anime: ${parsed.months} months, ${parsed.days} days, ${parsed.hours} hours, ${parsed.mins} mins`
  console.log(text)
}

async function run(username) {
  let user = await loadUser(username)

  console.log(chalk.green(`Welcome ${user.name}.`));
  console.log(chalk.yellow("We're fetching your stats"));

  let userId = parseInt(user.id, 10)

  let currentTime = await loadCurrentLibrary(userId)
  let onHoldTime = await loadOnHoldLibrary(userId)
  let completedTime = await loadCompletedLibrary(userId)
  printTotalTime([currentTime, completedTime, onHoldTime])
}

Cli.run = run

module.exports = Cli
