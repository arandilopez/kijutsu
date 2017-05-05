'use strict'
const chalk = require('chalk');
const { loadLibraryFor, loadUser, printTotalTime } = require('./services/CliService');
async function run(username) {
  let user = await loadUser(username)

  console.log(chalk.green(`Welcome ${user.name}.`));
  console.log(chalk.yellow("We're fetching your stats"));

  let userId = parseInt(user.id, 10)

  let currentTime = await loadLibraryFor(userId, {type: 'current'})
  let onHoldTime = await loadLibraryFor(userId, {type: 'on_hold'})
  let droppedTime = await loadLibraryFor(userId, {type: 'dropped'})
  let completedTime = await loadLibraryFor(userId, {type: 'completed'})
  printTotalTime([currentTime, completedTime, onHoldTime, droppedTime])
}

module.exports = { run }
