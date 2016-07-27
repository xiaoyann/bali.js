import * as _ from '../src/bali'
import { assert } from 'chai'

describe('isArray', function() {
  it('should return true when obj is Array', function() {
    assert.equal(true, _.isArray([]))
  })

  it('should return false when obj is array-like', function() {
    assert.equal(false, _.isArray(arguments))
    assert.equal(false, _.isArray({length: 2, 0: 1}))
  })

  it('should return false in other cases', function() {
    assert.equal(false, _.isArray(123))
    assert.equal(false, _.isArray(false))
    assert.equal(false, _.isArray({}))
    assert.equal(false, _.isArray(function() {}))
  })
})

describe('isObject', function() {
  it('should return true when obj is Object', function() {
    assert.equal(true, _.isObject({}))
  })

  it('should return false when obj is Null', function() {
    assert.equal(false, _.isObject(null))
  })

  it('should return false when obj is Function', function() {
    assert.equal(false, _.isObject(function() {}))
  })

  it('should return false when obj is Array', function() {
    assert.equal(false, _.isObject([]))
  })
})


























































