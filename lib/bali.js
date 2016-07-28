'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArray = isArray;
exports.isObject = isObject;
exports.isFunction = isFunction;
exports.union = union;
exports.assign = assign;
exports.clone = clone;
exports.cloneDeep = cloneDeep;
exports.cloneWithout = cloneWithout;
exports.cloneDeepWithout = cloneDeepWithout;

var objectToString = Object.prototype.toString;

/**
 * determines whether the passed value is an Array
 * @param  {any}  obj
 * @return {Boolean}
 */
function isArray(obj) {
  return Array.isArray(obj);
}

/**
 * determines whether the passed value is an Object
 * @param  {any}  obj
 * @return {Boolean}
 */
function isObject(obj) {
  return objectToString.call(obj) === '[object Object]';
}

/**
 * determines whether the passed value is a Function
 * @param  {any}
 * @return {Boolean}
 */
function isFunction(obj) {
  return objectToString.call(obj) === '[object Function]';
}

/**
 * creates a new array of unique values in the order of the
 * original provided arrays
 * @return {Array}
 */
function union() {
  var items = [].concat.apply([], arguments);
  return items.filter(function (item, i) {
    return items.indexOf(item) === i;
  });
}

function assign(target) {}

/**
 * creates a new object from the passed value by shallow clone
 * @param  {any} obj
 * @return {any}
 */
function clone(obj) {
  if (isArray(obj)) {
    return obj.slice();
  } else if (isObject(obj)) {
    var res = {};
    for (var k in obj) {
      res[k] = obj[k];
    }
    return res;
  } else {
    return obj;
  }
}

function cloneDeep() {}

function cloneWithout() {}

function cloneDeepWithout() {}