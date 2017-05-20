'use strict'

const Kitsu = require('../api')
const _ = require('lodash')

async function getEntriesFor(userId, options) {
  const opts = _.merge({ user_id: userId }, options)
  try {
    let response = await Kitsu.findAll('libraryEntry', {
      filter: opts,
      // FIXME: Need to find how to disable pagination
      page: { limit: 100 },
      include: 'anime'
    })
    if (response.meta.count === 0) {
      throw new Error("")
    }
    // Next request for pages...
    if (_.has(response, 'links.next')) {
      let total = response.meta.count
      for (var i = 1; (i * 100) <= total; i++) {
        let res = await Kitsu.findAll('libraryEntry', {
          filter: opts,
          page: { offset: (i * 100), limit: 100 },
          include: 'anime'
        })
        response = response.concat( res )
      }
    }

    return response
  } catch (e) {
    throw new Error(`No library entries for user in ${options.status}`)
  }
}

function mapToTimes(entries) {
  return entries.map(function (entry) {
    let discriminant = 0
    if (_.get(entry, 'status', null) == 'completed') {
      discriminant = _.get(entry, ['anime','episodeCount'], 0)
    } else {
      discriminant = _.get(entry, 'progress', 0)
    }
    return discriminant * _.get(entry, ['anime','episodeLength'], 0)
  });
}

module.exports = {
  getEntriesFor,
  mapToTimes
}
