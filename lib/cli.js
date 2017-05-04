'use strict'
const chalk = require('chalk');
const CLI = require('./services/CliService');
async function run(username) {
  let user = await CLI.loadUser(username)

  console.log(chalk.green(`Welcome ${user.name}.`));
  console.log(chalk.yellow("We're fetching your stats"));

  let userId = parseInt(user.id, 10)

  let currentTime = await CLI.loadLibraryFor(userId, {type: 'current'})
  let onHoldTime = await CLI.loadLibraryFor(userId, {type: 'on_hold'})
  let droppedTime = await CLI.loadLibraryFor(userId, {type: 'dropped'})
  let completedTime = await CLI.loadLibraryFor(userId, {type: 'completed'})
  CLI.printTotalTime([currentTime, completedTime, onHoldTime, droppedTime])
}

module.exports = { run }
