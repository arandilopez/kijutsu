'use strict'

var Kitsu = require('../api')

async function getUserByUsername(username) {
  let response = await Kitsu.findAll('user', {
    filter: { name: username }
  })
  if (response.meta.count === 0) {
    throw new Error("No user exists");
  }
  let user = response[0]

  return user
}

async function getCurrentLibraryEntries(userId) {
  let response = await Kitsu.findAll('libraryEntry', {
    filter: { user_id: userId, status: 'current' },
    page: { limit: 9999 },
    include: 'anime'
  })

  if (response.meta.count === 0) {
    throw new Error("No library entries for user");
  }

  return response;
}

async function getCompletedLibraryEntries(userId) {
  let response = await Kitsu.findAll('libraryEntry', {
    filter: { user_id: userId, status: 'completed' },
    page: { limit: 9999 },
    include: 'anime'
  })

  if (response.meta.count === 0) {
    throw new Error("No library entries for user");
  }

  return response;
}

async function getAllLibraryEntries(userId) {
  let response = await Kitsu.findAll('libraryEntry', {
    filter: { user_id: userId },
    page: { limit: 9999 },
    include: 'anime'
  })

  if (response.meta.count === 0) {
    throw new Error("No library entries for user");
  }

  return response;
}

module.exports = {
  getUserByUsername,
  getCurrentLibraryEntries,
  getCompletedLibraryEntries,
  getAllLibraryEntries
}
