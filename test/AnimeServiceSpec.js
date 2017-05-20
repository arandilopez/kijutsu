const chai = require('chai');
const AnimeService = require('../lib/services/AnimeService');
chai.should()

describe('AnimeService', () => {
  describe('#mapToTimes', () => {
    it('should map anime entries to their times', () => {
      let animes = [
        { progress: 10, anime: { episodeLength: 24 } },
        { progress: 10, anime: { episodeLength: 24 } },
        { progress: 10, anime: { episodeLength: 24 } },
        { progress: 10, anime: { episodeLength: 24 } },
        { progress: 10, anime: { episodeLength: 24 } }
      ]

      let times = AnimeService.mapToTimes(animes)
      times.length.should.equal(5)
      times.forEach(function (element) {
        element.should.equal(240)
      })
    })
  })
})
