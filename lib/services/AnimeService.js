'use strict'

const Kitsu = require('../api')
const _ = require('lodash')

async function getEntriesFor(userId, options) {
  let response = await Kitsu.findAll('libraryEntry', {
    filter: _.merge({ user_id: userId }, options),
    // FIXME: Need to find how to disable pagination
    page: { limit: 100 },
    include: 'anime'
  })
  if (response.meta.count === 0) {
    throw new Error("No library entries for user")
  }
  // Next resquest for pages...
  if (_.has(response, 'links.next')) {
    let total = response.meta.count
    for (var i = 1; (i * 100) <= total; i++) {
      let res = await Kitsu.findAll('libraryEntry', {
        filter: _.merge({ user_id: userId }, options),
        page: { offset: (i * 100), limit: 100 },
        include: 'anime'
      })
      response = response.concat( res )
    }
  }

  return response
}

function mapToTimes(entries) {
  return entries.map(function (entry) {
    return _.get(entry, 'progress', 0) * _.get(entry, ['anime','episodeLength'], 0)
  });
}

module.exports = {
  getEntriesFor,
  mapToTimes
}
