const chai = require('chai');
const AnimeService = require('../lib/services/AnimeService');
chai.should()

describe('AnimeService', function () {
  describe('#mapToTimes', function () {
    it('should map anime entries to their times', function () {
      let animes = [
        { progress: 10, anime: { episodeLength: 24 } },
        { progress: 10, anime: { episodeLength: 24 } },
        { progress: 10, anime: { episodeLength: 24 } },
        { progress: 10, anime: { episodeLength: 24 } },
        { progress: 10, anime: { episodeLength: 24 } }
      ]

      let times = AnimeService.mapToTimes(animes)

      times.forEach(function (element) {
        element.should.equal(240)
      })
    })
  })
})
