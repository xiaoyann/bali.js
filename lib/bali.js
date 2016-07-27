'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArray = isArray;
exports.isObject = isObject;
exports.isFunction = isFunction;
exports.getClass = getClass;
exports.clone = clone;
exports.cloneDeep = cloneDeep;
exports.cloneWithout = cloneWithout;
exports.cloneDeepWithout = cloneDeepWithout;
var objectToString = Object.prototype.toString;

/**
 * Is this an array ?
 * @param  {any}  obj
 * @return {Boolean}
 */
function isArray(obj) {
  return Array.isArray(obj);
}

/**
 * Is this an object ?
 * @param  {any}  obj
 * @return {Boolean}
 */
function isObject(obj) {
  return objectToString.call(obj) === '[object Object]';
}

/**
 * Is this a function ?
 * @param  {any}
 * @return {Boolean}
 */
function isFunction(obj) {
  return objectToString.call(obj) === '[object Function]';
}

function getClass() {}

function clone(obj) {}

function cloneDeep() {}

function cloneWithout() {}

function cloneDeepWithout() {}