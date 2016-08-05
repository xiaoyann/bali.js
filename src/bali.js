
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
 * original provided arrays or values
 * @return {Array}
 */
export function union() {
  let items = [].concat.apply([], arguments);
  return items.filter((item, i) => items.indexOf(item) === i);
}

/**
 * copy the values of all enumerable own properties 
 * from one or more source objects to a target object. 
 * @param  {any} target
 * @return {object or array}
 */
export function assign(target) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  target = Object(target);
  for (let i = 1; i < arguments.length; i++) {
    let source = arguments[i];
    if (source != null) {
      for (let k in source) {
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
export function assignDeep(target) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  target = Object(target);
  for (let i = 1; i < arguments.length; i++) {
    let source = arguments[i];
    if (source != null) {
      for (let k in source) {
        let value = source[k];
        let original = target[k];
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
export function clone(obj) {
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
export function cloneDeep(obj) {
  if (isArray(obj)) {
    return assignDeep([], obj);
  } else if (isObject(obj)) {
    return assignDeep({}, obj);
  } else {
    return obj;
  }
}

/**
 * [cloneWithPath description]
 * @param  {[type]} obj   [description]
 * @param  {[type]} path  [description]
 * @param  {[type]} _path [description]
 * @return {[type]}       [description]
 */
export function cloneWithPath(obj, path, _path) {
  let result;
  
  if (isArray(obj)) {
    result = [];
  } else if (isObject(obj)) {
    result = {};
  } else {
    return obj;
  }

  for (let k in obj) {
    _path = _path ? _path + '.' + k : k;
    if (path.indexOf(_path) === 0) {
      result[k] = cloneWithPath(obj[k], path, _path);
    } else {
      result[k] = obj[k];
    }
    _path = '';
  }

  return result;
}




