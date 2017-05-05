'use strict'
var Kitsu = require('../api')

Kitsu.define('libraryEntry', {
  status: '',
  progress: '',
  recosuming: '',
  recosumeCount: '',
  ratting: '',
  anime: {
    jsonApi: 'hasOne',
    type: 'anime'
  }
}, {
  collectionPath: 'library-entries'
})
