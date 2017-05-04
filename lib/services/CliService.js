'use strict'

const _ = require('lodash')
require('../models')
const UserService = require('./UserService')
const AnimeService = require('./AnimeService')
const TimeService = require('./TimeService')
const { Spinner } = require('clui')
const chalk = require('chalk')

function timeReducer(animes) {
  let times = animes.map(function (entry) {
    return _.get(entry, 'progress', 0) * _.get(entry, ['anime','episodeLength'], 0)
  })
  return _.sum(times)
}

function textParser(times, type) {
  let prefix = ''
  switch (type) {
    case 'current':
      prefix = '👁  Time in currently watching:'
      break;
    case 'completed':
      prefix = '😎  Time in completed:'
      break;
    case 'on_hold':
      prefix = '🤔  Time in on-hold:'
      break;
    case 'dropped':
      prefix = '😕  Time in dropped:'
      break;
    default:
      prefix = '❤️  Time spent in anime:'
      break;
  }

  return prefix + ` ${times.months} months, ${times.days} days, ${times.hours} hours, ${times.mins} mins`
}

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

async function loadLibraryFor(userId, options) {
  let spinner = new Spinner(`Loadding ${options.type} library info...`)
  spinner.start()
  try {
    let current = await AnimeService.getEntriesFor(userId, { status: options.type })
    let time = timeReducer(current)
    let parsedTime = TimeService.parseTimeInAnime(time)
    let text = textParser(parsedTime, options.type)
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
  let text = textParser(parsed, null)
  console.log(text)
}

module.exports = {
  loadUser,
  loadLibraryFor,
  printTotalTime
}
