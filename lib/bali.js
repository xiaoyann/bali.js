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
exports.cloneWithPath = cloneWithPath;
exports.numScale = numScale;
exports.accAdd = accAdd;
exports.accSub = accSub;

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

/**
 * [cloneWithPath description]
 * @param  {[type]} obj   [description]
 * @param  {[type]} path  [description]
 * @param  {[type]} _path [description]
 * @return {[type]}       [description]
 */
function cloneWithPath(obj, path, _path) {
  var result = void 0;

  if (isArray(obj)) {
    result = [];
  } else if (isObject(obj)) {
    result = {};
  } else {
    return obj;
  }

  for (var k in obj) {
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

/**
 * 获取小数位数
 */
function getExponent(num) {
  return Math.floor(num) === num ? 0 : num.toString().split('.')[1].length;
}

/**
 * 通过字符串操作将一个数放大或缩小指定倍数
 * @num 被转换的数
 * @m   放大或缩小的倍数，为正表示小数点向右移动，表示放大；为负反之
 */
function numScale(num, m) {
  // 拆分整数、小数部分
  var parts = num.toString().split('.');
  // 原始值的整数位数
  var integerLen = parts[0].length;
  // 原始值的小数位数
  var decimalLen = parts[1] ? parts[1].length : 0;

  // 放大，当放大的倍数比原来的小数位大时，需要在数字后面补零
  if (m > 0) {
    // 补多少个零：m - 原始值的小数位数
    var zeros = m - decimalLen;
    while (zeros > 0) {
      zeros -= 1;
      parts.push(0);
    }
    // 缩小，当缩小的倍数比原来的整数位大时，需要在数字前面补零
  } else {
    // 补多少个零：m - 原始值的整数位数
    var _zeros = Math.abs(m) - integerLen;
    while (_zeros > 0) {
      _zeros -= 1;
      parts.unshift(0);
    }
  }

  // 小数点位置，也是整数的位数: 
  //    放大：原始值的整数位数 + 放大的倍数
  //    缩小：原始值的整数位数 - 缩小的倍数
  var index = integerLen + m;
  // 将每一位都拆到数组里，方便插入小数点
  parts = parts.join('').split('');
  // 当为缩小时，因为可能会补零，所以使用原始值的整数位数
  // 计算出的小数点位置可能为负，这个负数应该正好是补零的
  // 个数，所以小数点位置应该为 0
  parts.splice(index > 0 ? index : 0, 0, '.');

  return parseFloat(parts.join(''));
}

/**
 * 两数相加
 */
function accAdd(num1, num2) {
  var multiple = Math.max(getExponent(num1), getExponent(num2));
  return numScale(numScale(num1, multiple) + numScale(num2, multiple), multiple * -1);
}

/**
 * 两数相减
 */
function accSub(num1, num2) {
  var multiple = Math.max(getExponent(num1), getExponent(num2));
  return numScale(numScale(num1, multiple) - numScale(num2, multiple), multiple * -1);
}