'use strict'

const chai = require('chai');
const TimeService = require('../lib/services/TimeService');
chai.should()

describe('TimeService', () => {
  describe('#parseMinsToHours', () => {
    it('should parse 60 mins to 1 hour and 0 mins', () => {
      let res = TimeService.parseMinsToHours(60) // mins
      res.hours.should.equal(1)
      res.mins.should.equal(0)
    })

    it('should parse 80 mins to 1 hour and 20 mins', () => {
      let res = TimeService.parseMinsToHours(80) //mins
      res.hours.should.equal(1)
      res.mins.should.equal(20)
    })
  })

  describe('#parseHoursToDays', () => {
    it('should parse 80 mins to 0 days 1 hours and 20 mins', () => {
      let res = TimeService.parseHoursToDays(80) //mins
      res.days.should.equal(0)
      res.hours.should.equal(1)
      res.mins.should.equal(20)
    })

    it('should parse 1_440mins to 1days, 0hours and 0mins', () => {
      let res = TimeService.parseHoursToDays(1440) // mins
      res.days.should.equal(1)
      res.hours.should.equal(0)
      res.mins.should.equal(0)
    })

    it('should parse 3_620min to 2days 12hours and 20mins', () => {
      let res = TimeService.parseHoursToDays(3620) // mins
      res.days.should.equal(2)
      res.hours.should.equal(12)
      res.mins.should.equal(20)
    })

  })

  describe('parseDaysToMonths', () => {
    it('should parse 3_620min to 0months 2days 12hours and 20mins', () => {
      let res = TimeService.parseDaysToMonths(3620) // mins
      res.months.should.equal(0)
      res.days.should.equal(2)
      res.hours.should.equal(12)
      res.mins.should.equal(20)
    })

    it('should parse 49_930min to 1months 4days 16hours and 10mins', () => {
      let res = TimeService.parseDaysToMonths(49930) // mins
      res.months.should.equal(1)
      res.days.should.equal(4)
      res.hours.should.equal(16)
      res.mins.should.equal(10)
    })
  })

  describe('splitTime', () => {
    it('should parse 49_930min to 1months 4days 16hours and 10mins', () => {
      let res = TimeService.splitTime(49930) // mins
      res.months.should.equal(1)
      res.days.should.equal(4)
      res.hours.should.equal(16)
      res.mins.should.equal(10)
    })
  })

  describe('timeReducer', () => {
    it('should reduce a coleccion of anime to a sum of their times', () => {
      let times = [10, 20, 30, 40]

      let time = TimeService.timeReducer(times)

      time.should.equal(100)
    })
  })

})
