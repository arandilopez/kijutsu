'use strict'

const Kitsu = require('../api')

async function getUserByUsername(username) {
  let response = await Kitsu.findAll('user', {
    filter: { name: username }
  })
  if (response.meta.count === 0) {
    throw new Error("No user exists")
  }
  let user = response[0]

  return user
}

module.exports = {
  getUserByUsername
}
