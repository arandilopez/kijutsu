'use strict'

const _ = require('lodash')
require('../models')
const UserService = require('./UserService')
const AnimeService = require('./AnimeService')
const TimeService = require('./TimeService')
const { Spinner } = require('clui')
const chalk = require('chalk')

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
    let current = await AnimeService.getCurrentLibraryEntries(userId)
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
    let completed = await AnimeService.getCompletedLibraryEntries(userId)
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
    let on_hold = await AnimeService.getOnHoldLibraryEntries(userId)
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

module.exports = {
  loadUser,
  loadCurrentLibrary,
  loadOnHoldLibrary,
  loadCompletedLibrary,
  printTotalTime
}
