'use strict'
const _ = require('lodash');

const PREFIXES = {
  current: '👁  Time in currently watching:',
  completed: '😎  Time in completed:',
  on_hold: '🤔  Time in on-hold:',
  dropped: '😕  Time in dropped:',
  all: '❤️  Time spent in anime:'
}

function textParser(times, type) {
  let prefix = PREFIXES[_.isNil(type) ? 'all' : type]
  return prefix + ` ${times.months} months, ${times.days} days, ${times.hours} hours, ${times.mins} mins`
}

module.exports = {
  textParser
}
