
let objectToString = Object.prototype.toString;

/**
 * Is this an array ?
 * @param  {any}  obj
 * @return {Boolean}
 */
export function isArray(obj) {
  return Array.isArray(obj);
}

/**
 * Is this an object ?
 * @param  {any}  obj
 * @return {Boolean}
 */
export function isObject(obj) {
  return objectToString.call(obj) === '[object Object]';
}

/**
 * Is this a function ?
 * @param  {any}
 * @return {Boolean}
 */
export function isFunction(obj) {
  return objectToString.call(obj) === '[object Function]';
}

export function clone(obj) {
  
}

export function cloneDeep() {

}

export function cloneWithout() {

}

export function cloneDeepWithout() {

}
