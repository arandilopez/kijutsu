'use strict'

const Kitsu = require('../api')
const _ = require('lodash')

async function getCurrentLibraryEntries(userId) {
  let response = await Kitsu.findAll('libraryEntry', {
    filter: { user_id: userId, status: 'current' },
    // FIXME: Need to find how to disable pagination
    page: { limit: 500 },
    include: 'anime'
  })

  if (response.meta.count === 0) {
    throw new Error("No library entries for user")
  }

  return response;
}

async function getCompletedLibraryEntries(userId) {
  let response = await Kitsu.findAll('libraryEntry', {
    filter: { user_id: userId, status: 'completed' },
    // FIXME: Need to find how to disable pagination
    page: { limit: 500 },
    include: 'anime'
  })

  if (response.meta.count === 0) {
    throw new Error("No library entries for user")
  }
  // Recursive resquest for pages...
  if (_.has(response, 'links.next')) {
    return response.concat( await Kitsu.request(response.links.next, 'GET') )
  } else {
    return response
  }

}

async function getOnHoldLibraryEntries(userId) {
  let response = await Kitsu.findAll('libraryEntry', {
    filter: { user_id: userId, status: 'on_hold' },
    // FIXME: Need to find how to disable pagination
    page: { limit: 500 },
    include: 'anime'
  })

  if (response.meta.count === 0) {
    throw new Error("No library entries for user")
  }
  // Recursive resquest for pages...
  if (_.has(response, 'links.next')) {
    return response.concat( await Kitsu.request(response.links.next, 'GET') )
  } else {
    return response
  }
}

async function getDroppedLibraryEntries(userId) {
  let response = await Kitsu.findAll('libraryEntry', {
    filter: { user_id: userId, status: 'dropped' },
    // FIXME: Need to find how to disable pagination
    page: { limit: 500 },
    include: 'anime'
  })

  if (response.meta.count === 0) {
    throw new Error("No library entries for user")
  }
  // Recursive resquest for pages...
  if (_.has(response, 'links.next')) {
    return response.concat( await Kitsu.request(response.links.next, 'GET') )
  } else {
    return response
  }
}

async function getAllLibraryEntries(userId) {
  let response = await Kitsu.findAll('libraryEntry', {
    filter: { user_id: userId },
    // FIXME: Need to find how to disable pagination
    page: { limit: 500 },
    include: 'anime'
  })

  if (response.meta.count === 0) {
    throw new Error("No library entries for user")
  }
  // Recursive resquest for pages...
  // FIXME: This shit needs to be fixed
  if (_.has(response, 'links.next')) {
    return response.concat( await Kitsu.request(response.links.next, 'GET') )
  } else {
    return response
  }
}

module.exports = {
  getCurrentLibraryEntries,
  getCompletedLibraryEntries,
  getOnHoldLibraryEntries,
  getDroppedLibraryEntries,
  getAllLibraryEntries
}
