'use strict'

const _ = require('lodash')
require('../models')
const { getUserByUsername } = require('./UserService')
const { getEntriesFor, mapToTimes } = require('./AnimeService')
const { splitTime, timeReducer } = require('./TimeService')
const { textParser } = require('./TextService')
const { Spinner } = require('clui')
const chalk = require('chalk')

async function loadUser(username) {
  let spinner = new Spinner('Loadding user information...')
  spinner.start()
  try {
    let user = await getUserByUsername(username)
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
    let current = await getEntriesFor(userId, { status: options.type })
    let time = timeReducer( mapToTimes(current) )
    let parsedTime = splitTime(time)
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
  let time = timeReducer(times)
  let parsed = splitTime(time)
  let text = textParser(parsed, null)
  console.log(text)
}

module.exports = {
  loadUser,
  loadLibraryFor,
  printTotalTime
}
