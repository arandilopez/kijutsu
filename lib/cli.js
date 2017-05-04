'use strict'
const chalk = require('chalk');
const CLI = require('./services/CliService');
async function run(username) {
  let user = await CLI.loadUser(username)

  console.log(chalk.green(`Welcome ${user.name}.`));
  console.log(chalk.yellow("We're fetching your stats"));

  let userId = parseInt(user.id, 10)

  let currentTime = await CLI.loadCurrentLibrary(userId)
  let onHoldTime = await CLI.loadOnHoldLibrary(userId)
  let completedTime = await CLI.loadCompletedLibrary(userId)
  CLI.printTotalTime([currentTime, completedTime, onHoldTime])
}

module.exports = { run }
