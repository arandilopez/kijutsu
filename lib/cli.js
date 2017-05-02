'use strict'
var _ = require('lodash')
require('./models');
var UserService = require('./services/UserService')

var Cli = {}

async function run(params) {
  var username = params[0]
  var user = await UserService.getUserByUsername(username)
  // console.log(user)
  var userID = parseInt(user.id, 10)

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


  console.log(`👁  Time in currently watching: ${currentsTime} mins`);
  console.log(`😎  Time in completed: ${completedTime} mins`);

}
Cli.run = run

module.exports = Cli
