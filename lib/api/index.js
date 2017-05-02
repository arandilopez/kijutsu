'use strict'

var JsonApi = require('devour-client')

var Kitsu = new JsonApi({
  apiUrl: 'https://kitsu.io/api/edge',
  logger: true,
})

module.exports = Kitsu
