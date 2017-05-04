'use strict'
const _ = require('lodash');

function parseTimeInAnime(time) {
  return parseDaysToMonths(time)
}

function parseMinsToHours(time) {
  let mins = time % 60
  let hours = Math.floor(time / 60)
  return { hours, mins }
}

function parseHoursToDays(time) {
  let {hours, mins} = parseMinsToHours(time)
  let days = Math.floor(hours / 24)
  hours = hours % 24

  return {days, hours, mins}
}

function parseDaysToMonths(time) {
  let {days, hours, mins} = parseHoursToDays(time)
  let months = Math.floor(days / 30) // consider a month as 30 days
  days = days % 30

  return {months, days, hours, mins}
}

function timeReducer(animes) {
  let times = animes.map(function (entry) {
    return _.get(entry, 'progress', 0) * _.get(entry, ['anime','episodeLength'], 0)
  })
  return _.sum(times)
}

module.exports = {
  parseTimeInAnime,
  parseMinsToHours,
  parseHoursToDays,
  parseDaysToMonths,
  timeReducer
}
