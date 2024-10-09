import { expect } from 'chai'
import { setDirectory, lookupHgt, lookupAglI} from '#helpers/hgt'

/* Use fixtures from our local directory for the tests */
setDirectory(import.meta.dirname);

describe('Hgt', () => {
  describe('lookupHgt', () => {
    it('should return an elevation', () => {
      expect(lookupHgt(32.033277, 76.718591)).to.equal(1414.1324076799888);
    })
    it('should return an null when no data', () => {
      expect(lookupHgt(89.033277, 0.718591)).to.be.null
    })
  })

  describe('lookupAglI', () => {
    it('should return null if altitude is missing', () => {
      expect(lookupAglI(null, 320332770, 767185910)).to.be.null
    })
    it('should return null if location is missing', () => {
      expect(lookupAglI(2000, null, null)).to.be.null
    })
    it('should return null if no data', () => {
      expect(lookupAglI(2000, 89033277, 7185910)).to.be.null
    })
    it('should return an elevation', () => {
      expect(lookupAglI(2000, 320332770, 767185910)).to.equal(586)
    })
  })
})
