'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArray = isArray;
exports.isObject = isObject;
exports.isFunction = isFunction;
exports.union = union;
exports.assign = assign;
exports.assignDeep = assignDeep;
exports.clone = clone;
exports.cloneDeep = cloneDeep;

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
 * original provided arrays or values
 * @return {Array}
 */
function union() {
  var items = [].concat.apply([], arguments);
  return items.filter(function (item, i) {
    return items.indexOf(item) === i;
  });
}

/**
 * copy the values of all enumerable own properties 
 * from one or more source objects to a target object. 
 * @param  {any} target
 * @return {object or array}
 */
function assign(target) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  target = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    if (source != null) {
      for (var k in source) {
        target[k] = source[k];
      }
    }
  }
  return target;
}

/**
 * recursively copy the values of all enumerable own properties 
 * from one or more source objects to a target object. 
 * @param  {any} target 
 * @return {object or array}
 */
function assignDeep(target) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  target = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    if (source != null) {
      for (var k in source) {
        var value = source[k];
        var original = target[k];
        if (isArray(value)) {
          target[k] = assignDeep(isArray(original) ? original : [], value);
        } else if (isObject(value)) {
          target[k] = assignDeep(isObject(original) ? original : {}, value);
        } else {
          target[k] = value;
        }
      }
    }
  }
  return target;
}

/**
 * creates a new object from the passed value by shallow clone
 * @param  {any} obj
 * @return {any}
 */
function clone(obj) {
  if (isArray(obj)) {
    return obj.slice();
  } else if (isObject(obj)) {
    return assign({}, obj);
  } else {
    return obj;
  }
}

/**
 * * creates a new object from the passed value by deep clone
 * @param  {any} obj
 * @return {any}
 */
function cloneDeep(obj) {
  if (isArray(obj)) {
    return assignDeep([], obj);
  } else if (isObject(obj)) {
    return assignDeep({}, obj);
  } else {
    return obj;
  }
}