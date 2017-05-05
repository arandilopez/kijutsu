'use strict'
const _ = require('lodash');
const AnimeService = require('./AnimeService')

function parseTimeInAnime(time) {
  return parseDaysToMonths(time)
}

function splitTime(time) {
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

function timeReducer(times) {
  return _.sum(times)
}

module.exports = {
  splitTime,
  parseMinsToHours,
  parseHoursToDays,
  parseDaysToMonths,
  timeReducer
}
