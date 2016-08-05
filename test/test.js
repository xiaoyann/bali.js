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
    assert.strictEqual(false, _.isArray(false))
    assert.strictEqual(false, _.isArray(null))
    assert.strictEqual(false, _.isArray(undefined))
    assert.strictEqual(false, _.isArray(123))
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

  it('should return false when obj is Array', function() {
    assert.strictEqual(false, _.isObject([]))
  })

  it('should return false in other cases', function() {
    assert.strictEqual(false, _.isFunction(123))
    assert.strictEqual(false, _.isFunction(false))
    assert.strictEqual(false, _.isFunction(undefined))
    assert.strictEqual(false, _.isObject(function() {}))
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
    assert.strictEqual(false, _.isFunction(123))
    assert.strictEqual(false, _.isFunction(null))
    assert.strictEqual(false, _.isFunction(false))
    assert.strictEqual(false, _.isFunction(undefined))
  })
})


describe('union', function() {
  it('should return an array of unique values', function() {
    let actual = _.union([1, 2], [4, 3, 1, 2])
    assert.isArray(actual)
    assert.lengthOf(actual, 4)
    assert.deepEqual([1, 2, 4, 3], actual)
  })

  it('should work well with varied values', function() {
    let expected = [1, 2, false, {a: ''}]
    let actual = _.union([1, 2], 1, false, 1, {a: ''})
    assert.deepEqual(expected, actual)
  })
})


describe('assign', function() {
  it('should throw a type error', function() {
    assert.throws(_.assign, TypeError)
  })

  it('should return a combined Object', function() {
    let actual = _.assign({a: 'a', b: 'b'}, {a: 1, c: 'c'})
    assert.deepEqual({a: 1, b: 'b', c: 'c'}, actual)
  })

  it('should return a combined Array', function() {
    assert.deepEqual([3, 4], _.assign([1, 2], [3, 4]))
  })

  it('should work well with varied values', function() {
    let actual = _.assign({}, 1, false, null, [2], {a: 'a'})
    assert.deepEqual({0: 2, a: 'a'}, actual)
  })

  it('primitives will be wrapped to objects', function() {
    let expected = new Number(1)
    expected.a = true
    assert.deepEqual(expected, _.assign(1, {a: true}))
    assert.deepEqual(new Boolean(false), _.assign(false))
    assert.deepEqual(new String('aa'), _.assign('aa'))
  })
})


describe('assignDeep', function() {
  it('should throw a type error', function() {
    assert.throws(_.assignDeep, TypeError)
  })

  it('should return a combined array', function() {
    let source = [{a: 1} , 1, {a: [1]}]
    let actual = _.assignDeep([], source, null, 1)
    assert.isArray(actual)
    assert.notStrictEqual(actual[0], source[0])
    assert.notStrictEqual(actual[2].a, source[2].a)
  })

  it('should return a combined object', function() {
    let source    = {a: [{a: 1}]}
    let expected  = {a: [{a: 1, b: 1}]}
    let actual = _.assignDeep({a: [{}]}, {a: [{a: 2, b: 1}]}, source)
    assert.isObject(actual)
    assert.deepEqual(expected, actual)
    assert.notStrictEqual(actual.a, source.a)
  })

  it('should work well with varied values', function() {
    let actual = _.assignDeep({}, 1, false, null, [2], {a: 'a'})
    assert.deepEqual({0: 2, a: 'a'}, actual)
  })

  it('primitives will be wrapped to objects', function() {
    let expected = new Number(1)
    expected.a = true
    assert.deepEqual(expected, _.assignDeep(1, {a: true}))
    assert.deepEqual(new Boolean(false), _.assignDeep(false))
    assert.deepEqual(new String('aa'), _.assignDeep('aa'))
  })
})


describe('clone', function() {
  it('Should return the passed value directly when it is neither an Object nor an Array', function() {
    assert.strictEqual(1, _.clone(1))
    assert.strictEqual(null, _.clone(null))
    assert.strictEqual(false, _.clone(false))
    let func = function() {}
    assert.strictEqual(func, _.clone(func))
  })

  it('Should work with Array as well as Object', function() {
    let original = [1, 2]
    let actual = _.clone(original)
    assert.isArray(actual)
    assert.deepEqual(original, original)
    assert.notStrictEqual(actual, original)
  })

  it('The actual should not be equal the original value', function() {
    let original = { a: [{ a: 1 }] }
    let actual = _.clone(original)
    assert.notStrictEqual(actual, original)
  })

  it('The child of actual and should be equal each other', function() {
    let original = { a: [{ a: 1 }] }
    let actual = _.clone(original)
    assert.strictEqual(actual.a, original.a)
  })

  it('The structure of actual should be same as the original value', function() {
    let original = { a: [{ a: 1 }] }
    let actual = _.clone(original)
    assert.deepEqual(actual, original)
  })
})


describe('cloneDeep', function() {
  it('Should return the passed value directly when it is neither an Object nor an Array', function() {
    assert.strictEqual(1, _.cloneDeep(1))
    assert.strictEqual(null, _.cloneDeep(null))
    assert.strictEqual(false, _.cloneDeep(false))
    let func = function() {}
    assert.strictEqual(func, _.cloneDeep(func))
  })

  it('Should work with Array as well as Object', function() {
    let original = [1, {a: 1}]
    let actual = _.cloneDeep(original)
    assert.isArray(actual)
    assert.deepEqual(original, original)
    assert.notStrictEqual(actual, original)
    assert.notStrictEqual(actual[1], original[1])
  })

  it('The actual should not be equal the original value', function() {
    let original = { a: [{ a: 1 }] }
    let actual = _.clone(original)
    assert.notStrictEqual(actual, original)
  })

  it('The child of actual and should not be equal each other', function() {
    let original = { a: [{ a: 1 }] }
    let actual = _.cloneDeep(original)
    assert.notStrictEqual(actual.a, original.a)
  })

  it('The structure of actual should be same as the original value', function() {
    let original = { a: [{ a: 1 }] }
    let actual = _.cloneDeep(original)
    assert.deepEqual(actual, original)
  })
})


describe('cloneWithPath', function() {
  let original = {
    a: {
      b: [{c: ''}]
    },
    b: {
      c: 'c'
    }
  }
  let path = 'a.b.0';
  let actual = _.cloneWithPath(original, path);

  it('The structure of actual should be same as the original value', function() {
    assert.deepEqual(actual, original)
  })

  it('The actual should not be equal the original value', function() {
    assert.notStrictEqual(actual, original)
  })

  it('clone only the value which in the path', function() {
    assert.notStrictEqual(actual.a.b[0], original.a.b[0])
    assert.strictEqual(actual.a.b[0].c, original.a.b[0].c)
    assert.strictEqual(actual.b, original.b)
  })

  it('Should return the passed value directly when it is neither an Object nor an Array', function() {
    assert.strictEqual(1, _.cloneWithPath(1))
    assert.strictEqual(null, _.cloneWithPath(null))
    assert.strictEqual(false, _.cloneWithPath(false))
    let func = function() {}
    assert.strictEqual(func, _.cloneWithPath(func))
  })
});













































