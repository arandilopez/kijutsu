'use strict'
var Kitsu = require('../api')

Kitsu.define('libraryEntry', {
  status: '',
  progress: '',
  recosuming: '',
  recosumeCount: '',
  // notes: '',
  // private: '',
  ratting: '',
  // animeId: '',
  anime: {
    jsonApi: 'hasOne',
    type: 'anime'
  }
}, {
  collectionPath: 'library-entries'
})
