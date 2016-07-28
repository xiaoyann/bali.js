
let objectToString = Object.prototype.toString;

/**
 * determines whether the passed value is an Array
 * @param  {any}  obj
 * @return {Boolean}
 */
export function isArray(obj) {
  return Array.isArray(obj);
}

/**
 * determines whether the passed value is an Object
 * @param  {any}  obj
 * @return {Boolean}
 */
export function isObject(obj) {
  return objectToString.call(obj) === '[object Object]';
}

/**
 * determines whether the passed value is a Function
 * @param  {any}
 * @return {Boolean}
 */
export function isFunction(obj) {
  return objectToString.call(obj) === '[object Function]';
}

/**
 * creates a new array of unique values in the order of the
 * original provided arrays
 * @return {Array}
 */
export function union() {
  let items = [].concat.apply([], arguments);
  return items.filter((item, i) => items.indexOf(item) === i);
}


// export function assign(target) {
  
// }

/**
 * creates a new object from the passed value by shallow clone
 * @param  {any} obj
 * @return {any}
 */
export function clone(obj) {
  if (isArray(obj)) {
    return obj.slice();  
  } else if (isObject(obj)) {
    let res = {};
    for (let k in obj) {
      res[k] = obj[k];
    }
    return res;
  } else {
    return obj;
  }
}

// export function cloneDeep() {

// }

// export function cloneWithout() {

// }

// export function cloneDeepWithout() {

// }






