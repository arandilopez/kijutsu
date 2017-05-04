'use strict'
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

module.exports = {
  textParser
}
