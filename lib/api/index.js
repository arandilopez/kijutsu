'use strict'

var JsonApi = require('devour-client')

var Kitsu = new JsonApi({
  apiUrl: 'https://kitsu.io/api/edge',
  logger: true,
  // pluralize: false
})

// Kitsu.headers['X-Requested-With'] = 'Hibari (wopian)'
// Kitsu.headers['X-Forwarded-Host'] = 'hb.wopian.me'

module.exports = Kitsu
