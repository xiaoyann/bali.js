import * as _ from '../src/bali'
import { assert } from 'chai'

describe('isArray', function() {
  it('should return true when obj is Array', function() {
    assert.strictEqual(true, _.isArray([]))
  })

  it('should return false when obj is array-like', function() {
    assert.strictEqual(false, _.isArray(arguments))
    assert.strictEqual(false, _.isArray({length: 2, 0: 1}))
  })

  it('should return false in other cases', function() {
    assert.strictEqual(false, _.isArray(123))
    assert.strictEqual(false, _.isArray(false))
    assert.strictEqual(false, _.isArray({}))
    assert.strictEqual(false, _.isArray(function() {}))
  })
})


describe('isObject', function() {
  it('should return true when obj is Object', function() {
    assert.strictEqual(true, _.isObject({}))
  })

  it('should return false when obj is Null', function() {
    assert.strictEqual(false, _.isObject(null))
  })

  it('should return false when obj is Function', function() {
    assert.strictEqual(false, _.isObject(function() {}))
  })

  it('should return false when obj is Array', function() {
    assert.strictEqual(false, _.isObject([]))
  })
})


describe('isFunction', function() {
  it('should return true', function() {
    assert.strictEqual(true, _.isFunction(Function))
    assert.strictEqual(true, _.isFunction(function() {}))
  })

  it('should return false in other cases', function() {
    assert.strictEqual(false, _.isFunction([]))
    assert.strictEqual(false, _.isFunction({}))
    assert.strictEqual(false, _.isFunction(false))
  })
})


describe('union', function() {
  it('should return an array of unique values', function() {
    let result = _.union([1, 2], [3, 1, 2])
    assert.typeOf(result, 'array')
    assert.lengthOf(result, 3)
    assert.deepEqual([1, 2, 3], result)
  })
})


describe('clone', function() {
  it('should return the passed value directly when it is not an Array or Object', function() {
    assert.strictEqual(1, _.clone(1))
    assert.strictEqual(null, _.clone(null))
    assert.strictEqual(false, _.clone(false))
    let func = function() {}
    assert.strictEqual(func, _.clone(func))
  })

  it('should return a duplicate of the passed value', function() {
    let arr = [1, 2]
    assert.notStrictEqual(arr, _.clone(arr))
    let obj = {a: 1}
    assert.notStrictEqual(false, _.clone(obj))
  })
})


// describe('Learn Chai', function() {
//   it('just test', function() {
//     assert.typeOf([], 'array')
//   })
// })
















































