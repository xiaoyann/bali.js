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


describe('isFunction', function() {
  it('should return true', function() {
    assert.equal(true, _.isFunction(function() {}))
    assert.equal(true, _.isFunction(Function))
  })

  it('should return false in other cases', function() {
    assert.equal(false, _.isFunction(false))
    assert.equal(false, _.isFunction([]))
    assert.equal(false, _.isFunction({}))
  })
})


describe('union', function() {
  it('should return an array of unique values', function() {
    let result = _.union([1, 2], [3, 1, 2])
    assert.equal('1.2.3', result.join('.'))
    assert.equal(true, result instanceof Array)
  })
})


describe('clone', function() {
  it('should return the passed value directly when it is not an Array or Object', function() {
    assert.equal(1, _.clone(1))
    assert.equal(null, _.clone(null))
    assert.equal(false, _.clone(false))
    let func = function() {}
    assert.equal(func, _.clone(func))
  })

  it('should return a duplicate of the passed value', function() {
    let arr = [1, 2]
    assert.equal(false, _.clone(arr) === arr)
    let obj = {a: 1}
    assert.equal(false, _.clone(obj) === obj)
  })
})



















































