'use strict'

const _ = require('lodash')
require('../models')
const UserService = require('./UserService')
const AnimeService = require('./AnimeService')
const TimeService = require('./TimeService')
const TextService = require('./TextService')
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

async function loadLibraryFor(userId, options) {
  let spinner = new Spinner(`Loadding ${options.type} library info...`)
  spinner.start()
  try {
    let current = await AnimeService.getEntriesFor(userId, { status: options.type })
    let time = TimeService.timeReducer(current)
    let parsedTime = TimeService.parseTimeInAnime(time)
    let text = TextService.textParser(parsedTime, options.type)
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
  let text = TextService.textParser(parsed, null)
  console.log(text)
}

module.exports = {
  loadUser,
  loadLibraryFor,
  printTotalTime
}
