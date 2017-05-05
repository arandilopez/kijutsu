'use strict'

const JsonApi = require('devour-client')

const Kitsu = new JsonApi({
  apiUrl: 'https://kitsu.io/api/edge',
  logger: true,
})

module.exports = Kitsu
