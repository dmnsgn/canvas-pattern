import { w as wellKnownSymbol, E as global_1, R as uid, x as objectSetPrototypeOf, h as classof, j as isCallable, C as descriptors, p as hasOwnProperty_1, Q as isObject, y as createNonEnumerableProperty, r as objectDefineProperty, A as internalState, o as objectIsPrototypeOf, t as tryToString, q as defineBuiltIn, i as fails, I as toIntegerOrInfinity, S as toLength, n as toObject, l as lengthOfArrayLike, P as toAbsoluteIndex, c as functionUncurryThis, T as objectGetOwnPropertyNames, z as functionName, f as functionCall, U as classofRaw, K as indexedObject, g as getBuiltIn, V as createCommonjsModule, _ as _export, u as objectCreate, W as inheritIfRequired, O as toPropertyKey, X as isSymbol, v as createPropertyDescriptor, Y as objectGetOwnPropertyDescriptor, Z as toPrimitive, $ as engineUserAgent, b as aCallable, a0 as engineV8Version, a1 as commonjsGlobal } from './common/es.error.cause-66f45a79.js';
import { p as objectGetPrototypeOf, o as anInstance, m as defineBuiltIns, n as setToStringTag, q as aConstructor, e as getIteratorMethod, h as isArrayIteratorMethod, j as getIterator, f as functionBindContext, c as isConstructor, s as speciesConstructor, a as asyncIteratorIteration, g as getIteratorDirect, i as iterate } from './common/async-iterator-iteration-73496d2b.js';
import { a as arraySliceSimple, b as arraySort } from './common/web.url.constructor-44c9f7fc.js';
import './common/es.string.replace-49253654.js';

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es-x/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

// eslint-disable-next-line es-x/no-typed-arrays -- safe
var arrayBufferNative = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';

var defineProperty = objectDefineProperty.f;







var enforceInternalState = internalState.enforce;
var getInternalState = internalState.get;
var Int8Array$1 = global_1.Int8Array;
var Int8ArrayPrototype = Int8Array$1 && Int8Array$1.prototype;
var Uint8ClampedArray$1 = global_1.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray$1 && Uint8ClampedArray$1.prototype;
var TypedArray = Int8Array$1 && objectGetPrototypeOf(Int8Array$1);
var TypedArrayPrototype = Int8ArrayPrototype && objectGetPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var TypeError$1 = global_1.TypeError;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
var TYPED_ARRAY_CONSTRUCTOR = 'TypedArrayConstructor';
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS = arrayBufferNative && !!objectSetPrototypeOf && classof(global_1.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQUIRED = false;
var NAME, Constructor, Prototype;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var BigIntArrayConstructorsList = {
  BigInt64Array: 8,
  BigUint64Array: 8
};

var isView = function isView(it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return klass === 'DataView'
    || hasOwnProperty_1(TypedArrayConstructorsList, klass)
    || hasOwnProperty_1(BigIntArrayConstructorsList, klass);
};

var getTypedArrayConstructor = function (it) {
  var proto = objectGetPrototypeOf(it);
  if (!isObject(proto)) return;
  var state = getInternalState(proto);
  return (state && hasOwnProperty_1(state, TYPED_ARRAY_CONSTRUCTOR)) ? state[TYPED_ARRAY_CONSTRUCTOR] : getTypedArrayConstructor(proto);
};

var isTypedArray = function (it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return hasOwnProperty_1(TypedArrayConstructorsList, klass)
    || hasOwnProperty_1(BigIntArrayConstructorsList, klass);
};

var aTypedArray = function (it) {
  if (isTypedArray(it)) return it;
  throw TypeError$1('Target is not a typed array');
};

var aTypedArrayConstructor = function (C) {
  if (isCallable(C) && (!objectSetPrototypeOf || objectIsPrototypeOf(TypedArray, C))) return C;
  throw TypeError$1(tryToString(C) + ' is not a typed array constructor');
};

var exportTypedArrayMethod = function (KEY, property, forced, options) {
  if (!descriptors) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global_1[ARRAY];
    if (TypedArrayConstructor && hasOwnProperty_1(TypedArrayConstructor.prototype, KEY)) try {
      delete TypedArrayConstructor.prototype[KEY];
    } catch (error) {
      // old WebKit bug - some methods are non-configurable
      try {
        TypedArrayConstructor.prototype[KEY] = property;
      } catch (error2) { /* empty */ }
    }
  }
  if (!TypedArrayPrototype[KEY] || forced) {
    defineBuiltIn(TypedArrayPrototype, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property, options);
  }
};

var exportTypedArrayStaticMethod = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!descriptors) return;
  if (objectSetPrototypeOf) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global_1[ARRAY];
      if (TypedArrayConstructor && hasOwnProperty_1(TypedArrayConstructor, KEY)) try {
        delete TypedArrayConstructor[KEY];
      } catch (error) { /* empty */ }
    }
    if (!TypedArray[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return defineBuiltIn(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && TypedArray[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global_1[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      defineBuiltIn(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  Constructor = global_1[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
  else NATIVE_ARRAY_BUFFER_VIEWS = false;
}

for (NAME in BigIntArrayConstructorsList) {
  Constructor = global_1[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS || !isCallable(TypedArray) || TypedArray === Function.prototype) {
  // eslint-disable-next-line no-shadow -- safe
  TypedArray = function TypedArray() {
    throw TypeError$1('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global_1[NAME]) objectSetPrototypeOf(global_1[NAME], TypedArray);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
  TypedArrayPrototype = TypedArray.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global_1[NAME]) objectSetPrototypeOf(global_1[NAME].prototype, TypedArrayPrototype);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS && objectGetPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  objectSetPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (descriptors && !hasOwnProperty_1(TypedArrayPrototype, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQUIRED = true;
  defineProperty(TypedArrayPrototype, TO_STRING_TAG, { get: function () {
    return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
  } });
  for (NAME in TypedArrayConstructorsList) if (global_1[NAME]) {
    createNonEnumerableProperty(global_1[NAME], TYPED_ARRAY_TAG, NAME);
  }
}

var arrayBufferViewCore = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG,
  aTypedArray: aTypedArray,
  aTypedArrayConstructor: aTypedArrayConstructor,
  exportTypedArrayMethod: exportTypedArrayMethod,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
  getTypedArrayConstructor: getTypedArrayConstructor,
  isView: isView,
  isTypedArray: isTypedArray,
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype
};

/* eslint-disable no-new -- required for testing */



var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

var ArrayBuffer$1 = global_1.ArrayBuffer;
var Int8Array$2 = global_1.Int8Array;

var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$1 || !fails(function () {
  Int8Array$2(1);
}) || !fails(function () {
  new Int8Array$2(-1);
}) || !checkCorrectnessOfIteration(function (iterable) {
  new Int8Array$2();
  new Int8Array$2(null);
  new Int8Array$2(1.5);
  new Int8Array$2(iterable);
}, true) || fails(function () {
  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
  return new Int8Array$2(new ArrayBuffer$1(2), 1, undefined).length !== 1;
});

var $RangeError = RangeError;

// `ToIndex` abstract operation
// https://tc39.es/ecma262/#sec-toindex
var toIndex = function (it) {
  if (it === undefined) return 0;
  var number = toIntegerOrInfinity(it);
  var length = toLength(number);
  if (number !== length) throw $RangeError('Wrong length or index');
  return length;
};

// IEEE754 conversions based on https://github.com/feross/ieee754
var $Array = Array;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;

var pack = function (number, mantissaLength, bytes) {
  var buffer = $Array(bytes);
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
  var index = 0;
  var exponent, mantissa, c;
  number = abs(number);
  // eslint-disable-next-line no-self-compare -- NaN check
  if (number != number || number === Infinity) {
    // eslint-disable-next-line no-self-compare -- NaN check
    mantissa = number != number ? 1 : 0;
    exponent = eMax;
  } else {
    exponent = floor(log(number) / LN2);
    c = pow(2, -exponent);
    if (number * c < 1) {
      exponent--;
      c *= 2;
    }
    if (exponent + eBias >= 1) {
      number += rt / c;
    } else {
      number += rt * pow(2, 1 - eBias);
    }
    if (number * c >= 2) {
      exponent++;
      c /= 2;
    }
    if (exponent + eBias >= eMax) {
      mantissa = 0;
      exponent = eMax;
    } else if (exponent + eBias >= 1) {
      mantissa = (number * c - 1) * pow(2, mantissaLength);
      exponent = exponent + eBias;
    } else {
      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
      exponent = 0;
    }
  }
  while (mantissaLength >= 8) {
    buffer[index++] = mantissa & 255;
    mantissa /= 256;
    mantissaLength -= 8;
  }
  exponent = exponent << mantissaLength | mantissa;
  exponentLength += mantissaLength;
  while (exponentLength > 0) {
    buffer[index++] = exponent & 255;
    exponent /= 256;
    exponentLength -= 8;
  }
  buffer[--index] |= sign * 128;
  return buffer;
};

var unpack = function (buffer, mantissaLength) {
  var bytes = buffer.length;
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var nBits = exponentLength - 7;
  var index = bytes - 1;
  var sign = buffer[index--];
  var exponent = sign & 127;
  var mantissa;
  sign >>= 7;
  while (nBits > 0) {
    exponent = exponent * 256 + buffer[index--];
    nBits -= 8;
  }
  mantissa = exponent & (1 << -nBits) - 1;
  exponent >>= -nBits;
  nBits += mantissaLength;
  while (nBits > 0) {
    mantissa = mantissa * 256 + buffer[index--];
    nBits -= 8;
  }
  if (exponent === 0) {
    exponent = 1 - eBias;
  } else if (exponent === eMax) {
    return mantissa ? NaN : sign ? -Infinity : Infinity;
  } else {
    mantissa = mantissa + pow(2, mantissaLength);
    exponent = exponent - eBias;
  } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
};

var ieee754 = {
  pack: pack,
  unpack: unpack
};

// `Array.prototype.fill` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.fill
var arrayFill = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = lengthOfArrayLike(O);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

var getOwnPropertyNames = objectGetOwnPropertyNames.f;
var defineProperty$1 = objectDefineProperty.f;





var PROPER_FUNCTION_NAME = functionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
var getInternalState$1 = internalState.get;
var setInternalState = internalState.set;
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length';
var WRONG_INDEX = 'Wrong index';
var NativeArrayBuffer = global_1[ARRAY_BUFFER];
var $ArrayBuffer = NativeArrayBuffer;
var ArrayBufferPrototype = $ArrayBuffer && $ArrayBuffer[PROTOTYPE];
var $DataView = global_1[DATA_VIEW];
var DataViewPrototype = $DataView && $DataView[PROTOTYPE];
var ObjectPrototype$1 = Object.prototype;
var Array$1 = global_1.Array;
var RangeError$1 = global_1.RangeError;
var fill = functionUncurryThis(arrayFill);
var reverse = functionUncurryThis([].reverse);

var packIEEE754 = ieee754.pack;
var unpackIEEE754 = ieee754.unpack;

var packInt8 = function (number) {
  return [number & 0xFF];
};

var packInt16 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF];
};

var packInt32 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
};

var unpackInt32 = function (buffer) {
  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
};

var packFloat32 = function (number) {
  return packIEEE754(number, 23, 4);
};

var packFloat64 = function (number) {
  return packIEEE754(number, 52, 8);
};

var addGetter = function (Constructor, key) {
  defineProperty$1(Constructor[PROTOTYPE], key, { get: function () { return getInternalState$1(this)[key]; } });
};

var get = function (view, count, index, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState$1(view);
  if (intIndex + count > store.byteLength) throw RangeError$1(WRONG_INDEX);
  var bytes = getInternalState$1(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = arraySliceSimple(bytes, start, start + count);
  return isLittleEndian ? pack : reverse(pack);
};

var set = function (view, count, index, conversion, value, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState$1(view);
  if (intIndex + count > store.byteLength) throw RangeError$1(WRONG_INDEX);
  var bytes = getInternalState$1(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = conversion(+value);
  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
};

if (!arrayBufferNative) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, ArrayBufferPrototype);
    var byteLength = toIndex(length);
    setInternalState(this, {
      bytes: fill(Array$1(byteLength), 0),
      byteLength: byteLength
    });
    if (!descriptors) this.byteLength = byteLength;
  };

  ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE];

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, DataViewPrototype);
    anInstance(buffer, ArrayBufferPrototype);
    var bufferLength = getInternalState$1(buffer).byteLength;
    var offset = toIntegerOrInfinity(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError$1('Wrong offset');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError$1(WRONG_LENGTH);
    setInternalState(this, {
      buffer: buffer,
      byteLength: byteLength,
      byteOffset: offset
    });
    if (!descriptors) {
      this.buffer = buffer;
      this.byteLength = byteLength;
      this.byteOffset = offset;
    }
  };

  DataViewPrototype = $DataView[PROTOTYPE];

  if (descriptors) {
    addGetter($ArrayBuffer, 'byteLength');
    addGetter($DataView, 'buffer');
    addGetter($DataView, 'byteLength');
    addGetter($DataView, 'byteOffset');
  }

  defineBuiltIns(DataViewPrototype, {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
    }
  });
} else {
  var INCORRECT_ARRAY_BUFFER_NAME = PROPER_FUNCTION_NAME && NativeArrayBuffer.name !== ARRAY_BUFFER;
  /* eslint-disable no-new -- required for testing */
  if (!fails(function () {
    NativeArrayBuffer(1);
  }) || !fails(function () {
    new NativeArrayBuffer(-1);
  }) || fails(function () {
    new NativeArrayBuffer();
    new NativeArrayBuffer(1.5);
    new NativeArrayBuffer(NaN);
    return INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME;
  })) {
  /* eslint-enable no-new -- required for testing */
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, ArrayBufferPrototype);
      return new NativeArrayBuffer(toIndex(length));
    };

    $ArrayBuffer[PROTOTYPE] = ArrayBufferPrototype;

    for (var keys = getOwnPropertyNames(NativeArrayBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) {
        createNonEnumerableProperty($ArrayBuffer, key, NativeArrayBuffer[key]);
      }
    }

    ArrayBufferPrototype.constructor = $ArrayBuffer;
  } else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME) {
    createNonEnumerableProperty(NativeArrayBuffer, 'name', ARRAY_BUFFER);
  }

  // WebKit bug - the same parent prototype for typed arrays and data view
  if (objectSetPrototypeOf && objectGetPrototypeOf(DataViewPrototype) !== ObjectPrototype$1) {
    objectSetPrototypeOf(DataViewPrototype, ObjectPrototype$1);
  }

  // iOS Safari 7.x bug
  var testView = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = functionUncurryThis(DataViewPrototype.setInt8);
  testView.setInt8(0, 2147483648);
  testView.setInt8(1, 2147483649);
  if (testView.getInt8(0) || !testView.getInt8(1)) defineBuiltIns(DataViewPrototype, {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8(this, byteOffset, value << 24 >> 24);
    }
  }, { unsafe: true });
}

setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);

var arrayBuffer = {
  ArrayBuffer: $ArrayBuffer,
  DataView: $DataView
};

var floor$1 = Math.floor;

// `IsIntegralNumber` abstract operation
// https://tc39.es/ecma262/#sec-isintegralnumber
// eslint-disable-next-line es-x/no-number-isinteger -- safe
var isIntegralNumber = Number.isInteger || function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor$1(it) === it;
};

var $RangeError$1 = RangeError;

var toPositiveInteger = function (it) {
  var result = toIntegerOrInfinity(it);
  if (result < 0) throw $RangeError$1("The argument can't be less than 0");
  return result;
};

var $RangeError$2 = RangeError;

var toOffset = function (it, BYTES) {
  var offset = toPositiveInteger(it);
  if (offset % BYTES) throw $RangeError$2('Wrong offset');
  return offset;
};

var aTypedArrayConstructor$1 = arrayBufferViewCore.aTypedArrayConstructor;

var typedArrayFrom = function from(source /* , mapfn, thisArg */) {
  var C = aConstructor(this);
  var O = toObject(source);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var i, length, result, step, iterator, next;
  if (iteratorMethod && !isArrayIteratorMethod(iteratorMethod)) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    O = [];
    while (!(step = functionCall(next, iterator)).done) {
      O.push(step.value);
    }
  }
  if (mapping && argumentsLength > 2) {
    mapfn = functionBindContext(mapfn, arguments[2]);
  }
  length = lengthOfArrayLike(O);
  result = new (aTypedArrayConstructor$1(C))(length);
  for (i = 0; length > i; i++) {
    result[i] = mapping ? mapfn(O[i], i) : O[i];
  }
  return result;
};

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es-x/no-array-isarray -- safe
var isArray = Array.isArray || function isArray(argument) {
  return classofRaw(argument) == 'Array';
};

var SPECIES = wellKnownSymbol('species');
var $Array$1 = Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesConstructor = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === $Array$1 || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? $Array$1 : C;
};

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

var push = functionUncurryThis([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = indexedObject(O);
    var boundFunction = functionBindContext(callbackfn, that);
    var length = lengthOfArrayLike(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};

var SPECIES$1 = wellKnownSymbol('species');

var setSpecies = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = objectDefineProperty.f;

  if (descriptors && Constructor && !Constructor[SPECIES$1]) {
    defineProperty(Constructor, SPECIES$1, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

var typedArrayConstructor = createCommonjsModule(function (module) {






















var getOwnPropertyNames = objectGetOwnPropertyNames.f;

var forEach = arrayIteration.forEach;






var getInternalState = internalState.get;
var setInternalState = internalState.set;
var enforceInternalState = internalState.enforce;
var nativeDefineProperty = objectDefineProperty.f;
var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var round = Math.round;
var RangeError = global_1.RangeError;
var ArrayBuffer = arrayBuffer.ArrayBuffer;
var ArrayBufferPrototype = ArrayBuffer.prototype;
var DataView = arrayBuffer.DataView;
var NATIVE_ARRAY_BUFFER_VIEWS = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
var TYPED_ARRAY_TAG = arrayBufferViewCore.TYPED_ARRAY_TAG;
var TypedArray = arrayBufferViewCore.TypedArray;
var TypedArrayPrototype = arrayBufferViewCore.TypedArrayPrototype;
var aTypedArrayConstructor = arrayBufferViewCore.aTypedArrayConstructor;
var isTypedArray = arrayBufferViewCore.isTypedArray;
var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
var WRONG_LENGTH = 'Wrong length';

var fromList = function (C, list) {
  aTypedArrayConstructor(C);
  var index = 0;
  var length = list.length;
  var result = new C(length);
  while (length > index) result[index] = list[index++];
  return result;
};

var addGetter = function (it, key) {
  nativeDefineProperty(it, key, { get: function () {
    return getInternalState(this)[key];
  } });
};

var isArrayBuffer = function (it) {
  var klass;
  return objectIsPrototypeOf(ArrayBufferPrototype, it) || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
};

var isTypedArrayIndex = function (target, key) {
  return isTypedArray(target)
    && !isSymbol(key)
    && key in target
    && isIntegralNumber(+key)
    && key >= 0;
};

var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
  key = toPropertyKey(key);
  return isTypedArrayIndex(target, key)
    ? createPropertyDescriptor(2, target[key])
    : nativeGetOwnPropertyDescriptor(target, key);
};

var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
  key = toPropertyKey(key);
  if (isTypedArrayIndex(target, key)
    && isObject(descriptor)
    && hasOwnProperty_1(descriptor, 'value')
    && !hasOwnProperty_1(descriptor, 'get')
    && !hasOwnProperty_1(descriptor, 'set')
    // TODO: add validation descriptor w/o calling accessors
    && !descriptor.configurable
    && (!hasOwnProperty_1(descriptor, 'writable') || descriptor.writable)
    && (!hasOwnProperty_1(descriptor, 'enumerable') || descriptor.enumerable)
  ) {
    target[key] = descriptor.value;
    return target;
  } return nativeDefineProperty(target, key, descriptor);
};

if (descriptors) {
  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
    objectGetOwnPropertyDescriptor.f = wrappedGetOwnPropertyDescriptor;
    objectDefineProperty.f = wrappedDefineProperty;
    addGetter(TypedArrayPrototype, 'buffer');
    addGetter(TypedArrayPrototype, 'byteOffset');
    addGetter(TypedArrayPrototype, 'byteLength');
    addGetter(TypedArrayPrototype, 'length');
  }

  _export({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
    defineProperty: wrappedDefineProperty
  });

  module.exports = function (TYPE, wrapper, CLAMPED) {
    var BYTES = TYPE.match(/\d+$/)[0] / 8;
    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + TYPE;
    var SETTER = 'set' + TYPE;
    var NativeTypedArrayConstructor = global_1[CONSTRUCTOR_NAME];
    var TypedArrayConstructor = NativeTypedArrayConstructor;
    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
    var exported = {};

    var getter = function (that, index) {
      var data = getInternalState(that);
      return data.view[GETTER](index * BYTES + data.byteOffset, true);
    };

    var setter = function (that, index, value) {
      var data = getInternalState(that);
      if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
      data.view[SETTER](index * BYTES + data.byteOffset, value, true);
    };

    var addElement = function (that, index) {
      nativeDefineProperty(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };

    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
        anInstance(that, TypedArrayConstructorPrototype);
        var index = 0;
        var byteOffset = 0;
        var buffer, byteLength, length;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new ArrayBuffer(byteLength);
        } else if (isArrayBuffer(data)) {
          buffer = data;
          byteOffset = toOffset(offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - byteOffset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + byteOffset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (isTypedArray(data)) {
          return fromList(TypedArrayConstructor, data);
        } else {
          return functionCall(typedArrayFrom, TypedArrayConstructor, data);
        }
        setInternalState(that, {
          buffer: buffer,
          byteOffset: byteOffset,
          byteLength: byteLength,
          length: length,
          view: new DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });

      if (objectSetPrototypeOf) objectSetPrototypeOf(TypedArrayConstructor, TypedArray);
      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = objectCreate(TypedArrayPrototype);
    } else if (typedArrayConstructorsRequireWrappers) {
      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
        anInstance(dummy, TypedArrayConstructorPrototype);
        return inheritIfRequired(function () {
          if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
          if (isArrayBuffer(data)) return $length !== undefined
            ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length)
            : typedArrayOffset !== undefined
              ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES))
              : new NativeTypedArrayConstructor(data);
          if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
          return functionCall(typedArrayFrom, TypedArrayConstructor, data);
        }(), dummy, TypedArrayConstructor);
      });

      if (objectSetPrototypeOf) objectSetPrototypeOf(TypedArrayConstructor, TypedArray);
      forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
        if (!(key in TypedArrayConstructor)) {
          createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
        }
      });
      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
    }

    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
    }

    enforceInternalState(TypedArrayConstructorPrototype).TypedArrayConstructor = TypedArrayConstructor;

    if (TYPED_ARRAY_TAG) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
    }

    var FORCED = TypedArrayConstructor != NativeTypedArrayConstructor;

    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

    _export({ global: true, constructor: true, forced: FORCED, sham: !NATIVE_ARRAY_BUFFER_VIEWS }, exported);

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
      createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
    }

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
    }

    setSpecies(CONSTRUCTOR_NAME);
  };
} else module.exports = function () { /* empty */ };
});

// `Uint8Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
typedArrayConstructor('Uint8', function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var aTypedArray$1 = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$1 = arrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.at` method
// https://github.com/tc39/proposal-relative-indexing-method
exportTypedArrayMethod$1('at', function at(index) {
  var O = aTypedArray$1(this);
  var len = lengthOfArrayLike(O);
  var relativeIndex = toIntegerOrInfinity(index);
  var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
  return (k < 0 || k >= len) ? undefined : O[k];
});

var $TypeError = TypeError;

// `ToBigInt` abstract operation
// https://tc39.es/ecma262/#sec-tobigint
var toBigInt = function (argument) {
  var prim = toPrimitive(argument, 'number');
  if (typeof prim == 'number') throw $TypeError("Can't convert number to bigint");
  // eslint-disable-next-line es-x/no-bigint -- safe
  return BigInt(prim);
};

var aTypedArray$2 = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$2 = arrayBufferViewCore.exportTypedArrayMethod;
var slice = functionUncurryThis(''.slice);

// V8 ~ Chrome < 59, Safari < 14.1, FF < 55, Edge <=18
var CONVERSION_BUG = fails(function () {
  var count = 0;
  // eslint-disable-next-line es-x/no-typed-arrays -- safe
  new Int8Array(2).fill({ valueOf: function () { return count++; } });
  return count !== 1;
});

// `%TypedArray%.prototype.fill` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.fill
exportTypedArrayMethod$2('fill', function fill(value /* , start, end */) {
  var length = arguments.length;
  aTypedArray$2(this);
  var actualValue = slice(classof(this), 0, 3) === 'Big' ? toBigInt(value) : +value;
  return functionCall(arrayFill, this, actualValue, length > 1 ? arguments[1] : undefined, length > 2 ? arguments[2] : undefined);
}, CONVERSION_BUG);

var RangeError$2 = global_1.RangeError;
var Int8Array$3 = global_1.Int8Array;
var Int8ArrayPrototype$1 = Int8Array$3 && Int8Array$3.prototype;
var $set = Int8ArrayPrototype$1 && Int8ArrayPrototype$1.set;
var aTypedArray$3 = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$3 = arrayBufferViewCore.exportTypedArrayMethod;

var WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS = !fails(function () {
  // eslint-disable-next-line es-x/no-typed-arrays -- required for testing
  var array = new Uint8ClampedArray(2);
  functionCall($set, array, { length: 1, 0: 3 }, 1);
  return array[1] !== 3;
});

// https://bugs.chromium.org/p/v8/issues/detail?id=11294 and other
var TO_OBJECT_BUG = WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS && arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS && fails(function () {
  var array = new Int8Array$3(2);
  array.set(1);
  array.set('2', 1);
  return array[0] !== 0 || array[1] !== 2;
});

// `%TypedArray%.prototype.set` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.set
exportTypedArrayMethod$3('set', function set(arrayLike /* , offset */) {
  aTypedArray$3(this);
  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
  var src = toObject(arrayLike);
  if (WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS) return functionCall($set, this, src, offset);
  var length = this.length;
  var len = lengthOfArrayLike(src);
  var index = 0;
  if (len + offset > length) throw RangeError$2('Wrong length');
  while (index < len) this[offset + index] = src[index++];
}, !WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS || TO_OBJECT_BUG);

var firefox = engineUserAgent.match(/firefox\/(\d+)/i);

var engineFfVersion = !!firefox && +firefox[1];

var engineIsIeOrEdge = /MSIE|Trident/.test(engineUserAgent);

var webkit = engineUserAgent.match(/AppleWebKit\/(\d+)\./);

var engineWebkitVersion = !!webkit && +webkit[1];

var aTypedArray$4 = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$4 = arrayBufferViewCore.exportTypedArrayMethod;
var Uint16Array$1 = global_1.Uint16Array;
var un$Sort = Uint16Array$1 && functionUncurryThis(Uint16Array$1.prototype.sort);

// WebKit
var ACCEPT_INCORRECT_ARGUMENTS = !!un$Sort && !(fails(function () {
  un$Sort(new Uint16Array$1(2), null);
}) && fails(function () {
  un$Sort(new Uint16Array$1(2), {});
}));

var STABLE_SORT = !!un$Sort && !fails(function () {
  // feature detection can be too slow, so check engines versions
  if (engineV8Version) return engineV8Version < 74;
  if (engineFfVersion) return engineFfVersion < 67;
  if (engineIsIeOrEdge) return true;
  if (engineWebkitVersion) return engineWebkitVersion < 602;

  var array = new Uint16Array$1(516);
  var expected = Array(516);
  var index, mod;

  for (index = 0; index < 516; index++) {
    mod = index % 4;
    array[index] = 515 - index;
    expected[index] = index - 2 * mod + 3;
  }

  un$Sort(array, function (a, b) {
    return (a / 4 | 0) - (b / 4 | 0);
  });

  for (index = 0; index < 516; index++) {
    if (array[index] !== expected[index]) return true;
  }
});

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    // eslint-disable-next-line no-self-compare -- NaN check
    if (y !== y) return -1;
    // eslint-disable-next-line no-self-compare -- NaN check
    if (x !== x) return 1;
    if (x === 0 && y === 0) return 1 / x > 0 && 1 / y < 0 ? 1 : -1;
    return x > y;
  };
};

// `%TypedArray%.prototype.sort` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.sort
exportTypedArrayMethod$4('sort', function sort(comparefn) {
  if (comparefn !== undefined) aCallable(comparefn);
  if (STABLE_SORT) return un$Sort(this, comparefn);

  return arraySort(aTypedArray$4(this), getSortCompare(comparefn));
}, !STABLE_SORT || ACCEPT_INCORRECT_ARGUMENTS);

var arrayFromConstructorAndList = function (Constructor, list) {
  var index = 0;
  var length = lengthOfArrayLike(list);
  var result = new Constructor(length);
  while (length > index) result[index] = list[index++];
  return result;
};

var aTypedArrayConstructor$2 = arrayBufferViewCore.aTypedArrayConstructor;
var getTypedArrayConstructor$1 = arrayBufferViewCore.getTypedArrayConstructor;

// a part of `TypedArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#typedarray-species-create
var typedArraySpeciesConstructor = function (originalArray) {
  return aTypedArrayConstructor$2(speciesConstructor(originalArray, getTypedArrayConstructor$1(originalArray)));
};

var typedArrayFromSpeciesAndList = function (instance, list) {
  return arrayFromConstructorAndList(typedArraySpeciesConstructor(instance), list);
};

var $filterReject = arrayIteration.filterReject;


var aTypedArray$5 = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$5 = arrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.filterReject` method
// https://github.com/tc39/proposal-array-filtering
exportTypedArrayMethod$5('filterReject', function filterReject(callbackfn /* , thisArg */) {
  var list = $filterReject(aTypedArray$5(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  return typedArrayFromSpeciesAndList(this, list);
}, true);

// `Array.prototype.{ findLast, findLastIndex }` methods implementation
var createMethod$1 = function (TYPE) {
  var IS_FIND_LAST_INDEX = TYPE == 1;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = indexedObject(O);
    var boundFunction = functionBindContext(callbackfn, that);
    var index = lengthOfArrayLike(self);
    var value, result;
    while (index-- > 0) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (result) switch (TYPE) {
        case 0: return value; // findLast
        case 1: return index; // findLastIndex
      }
    }
    return IS_FIND_LAST_INDEX ? -1 : undefined;
  };
};

var arrayIterationFromLast = {
  // `Array.prototype.findLast` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLast: createMethod$1(0),
  // `Array.prototype.findLastIndex` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLastIndex: createMethod$1(1)
};

var $findLast = arrayIterationFromLast.findLast;

var aTypedArray$6 = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$6 = arrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.findLast` method
// https://github.com/tc39/proposal-array-find-from-last
exportTypedArrayMethod$6('findLast', function findLast(predicate /* , thisArg */) {
  return $findLast(aTypedArray$6(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});

var $findLastIndex = arrayIterationFromLast.findLastIndex;

var aTypedArray$7 = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$7 = arrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.findLastIndex` method
// https://github.com/tc39/proposal-array-find-from-last
exportTypedArrayMethod$7('findLastIndex', function findLastIndex(predicate /* , thisArg */) {
  return $findLastIndex(aTypedArray$7(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});

var $Array$2 = Array;
var push$1 = functionUncurryThis([].push);

var arrayGroup = function ($this, callbackfn, that, specificConstructor) {
  var O = toObject($this);
  var self = indexedObject(O);
  var boundFunction = functionBindContext(callbackfn, that);
  var target = objectCreate(null);
  var length = lengthOfArrayLike(self);
  var index = 0;
  var Constructor, key, value;
  for (;length > index; index++) {
    value = self[index];
    key = toPropertyKey(boundFunction(value, index, O));
    // in some IE10 builds, `hasOwnProperty` returns incorrect result on integer keys
    // but since it's a `null` prototype object, we can safely use `in`
    if (key in target) push$1(target[key], value);
    else target[key] = [value];
  }
  // TODO: Remove this block from `core-js@4`
  if (specificConstructor) {
    Constructor = specificConstructor(O);
    if (Constructor !== $Array$2) {
      for (key in target) target[key] = arrayFromConstructorAndList(Constructor, target[key]);
    }
  } return target;
};

// TODO: Remove from `core-js@4`




var aTypedArray$8 = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$8 = arrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.groupBy` method
// https://github.com/tc39/proposal-array-grouping
exportTypedArrayMethod$8('groupBy', function groupBy(callbackfn /* , thisArg */) {
  var thisArg = arguments.length > 1 ? arguments[1] : undefined;
  return arrayGroup(aTypedArray$8(this), callbackfn, thisArg, typedArraySpeciesConstructor);
}, true);

// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.toReversed
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toReversed
var arrayToReversed = function (O, C) {
  var len = lengthOfArrayLike(O);
  var A = new C(len);
  var k = 0;
  for (; k < len; k++) A[k] = O[len - k - 1];
  return A;
};

var aTypedArray$9 = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$9 = arrayBufferViewCore.exportTypedArrayMethod;
var getTypedArrayConstructor$2 = arrayBufferViewCore.getTypedArrayConstructor;

// `%TypedArray%.prototype.toReversed` method
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toReversed
exportTypedArrayMethod$9('toReversed', function toReversed() {
  return arrayToReversed(aTypedArray$9(this), getTypedArrayConstructor$2(this));
});

var aTypedArray$a = arrayBufferViewCore.aTypedArray;
var getTypedArrayConstructor$3 = arrayBufferViewCore.getTypedArrayConstructor;
var exportTypedArrayMethod$a = arrayBufferViewCore.exportTypedArrayMethod;
var sort = functionUncurryThis(arrayBufferViewCore.TypedArrayPrototype.sort);

// `%TypedArray%.prototype.toSorted` method
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toSorted
exportTypedArrayMethod$a('toSorted', function toSorted(compareFn) {
  if (compareFn !== undefined) aCallable(compareFn);
  var O = aTypedArray$a(this);
  var A = arrayFromConstructorAndList(getTypedArrayConstructor$3(O), O);
  return sort(A, compareFn);
});

// TODO: Remove from `core-js@4`






var aTypedArray$b = arrayBufferViewCore.aTypedArray;
var getTypedArrayConstructor$4 = arrayBufferViewCore.getTypedArrayConstructor;
var exportTypedArrayMethod$b = arrayBufferViewCore.exportTypedArrayMethod;
var max = Math.max;
var min = Math.min;

// some early implementations, like WebKit, does not follow the final semantic
var PROPER_ORDER = !fails(function () {
  // eslint-disable-next-line es-x/no-typed-arrays -- required for testing
  var array = new Int8Array([1]);

  var spliced = array.toSpliced(1, 0, {
    valueOf: function () {
      array[0] = 2;
      return 3;
    }
  });

  return spliced[0] !== 2 || spliced[1] !== 3;
});

// `%TypedArray%.prototype.toSpliced` method
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toSpliced
exportTypedArrayMethod$b('toSpliced', function toSpliced(start, deleteCount /* , ...items */) {
  var O = aTypedArray$b(this);
  var C = getTypedArrayConstructor$4(O);
  var len = lengthOfArrayLike(O);
  var actualStart = toAbsoluteIndex(start, len);
  var argumentsLength = arguments.length;
  var k = 0;
  var insertCount, actualDeleteCount, convertedItems, newLen, A;
  if (argumentsLength === 0) {
    insertCount = actualDeleteCount = 0;
  } else if (argumentsLength === 1) {
    insertCount = 0;
    actualDeleteCount = len - actualStart;
  } else {
    actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
    insertCount = argumentsLength - 2;
    if (insertCount) {
      convertedItems = new C(insertCount);
      for (var i = 2; i < argumentsLength; i++) {
        convertedItems[i - 2] = arguments[i];
      }
    }
  }
  newLen = len + insertCount - actualDeleteCount;
  A = new C(newLen);

  for (; k < actualStart; k++) A[k] = O[k];
  for (; k < actualStart + insertCount; k++) A[k] = convertedItems[k - actualStart];
  for (; k < newLen; k++) A[k] = O[k + actualDeleteCount - insertCount];

  return A;
}, !PROPER_ORDER);

var Map = getBuiltIn('Map');
var MapPrototype = Map.prototype;
var mapForEach = functionUncurryThis(MapPrototype.forEach);
var mapHas = functionUncurryThis(MapPrototype.has);
var mapSet = functionUncurryThis(MapPrototype.set);
var push$2 = functionUncurryThis([].push);

// `Array.prototype.uniqueBy` method
// https://github.com/tc39/proposal-array-unique
var arrayUniqueBy = function uniqueBy(resolver) {
  var that = toObject(this);
  var length = lengthOfArrayLike(that);
  var result = arraySpeciesCreate(that, 0);
  var map = new Map();
  var resolverFunction = resolver != null ? aCallable(resolver) : function (value) {
    return value;
  };
  var index, item, key;
  for (index = 0; index < length; index++) {
    item = that[index];
    key = resolverFunction(item);
    if (!mapHas(map, key)) mapSet(map, key, item);
  }
  mapForEach(map, function (value) {
    push$2(result, value);
  });
  return result;
};

var aTypedArray$c = arrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod$c = arrayBufferViewCore.exportTypedArrayMethod;
var arrayUniqueBy$1 = functionUncurryThis(arrayUniqueBy);

// `%TypedArray%.prototype.uniqueBy` method
// https://github.com/tc39/proposal-array-unique
exportTypedArrayMethod$c('uniqueBy', function uniqueBy(resolver) {
  return typedArrayFromSpeciesAndList(this, arrayUniqueBy$1(aTypedArray$c(this), resolver));
}, true);

var $RangeError$3 = RangeError;

// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.with
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.with
var arrayWith = function (O, C, index, value) {
  var len = lengthOfArrayLike(O);
  var relativeIndex = toIntegerOrInfinity(index);
  var actualIndex = relativeIndex < 0 ? len + relativeIndex : relativeIndex;
  if (actualIndex >= len || actualIndex < 0) throw $RangeError$3('Incorrect index');
  var A = new C(len);
  var k = 0;
  for (; k < len; k++) A[k] = k === actualIndex ? value : O[k];
  return A;
};

var slice$1 = functionUncurryThis(''.slice);

var isBigIntArray = function (it) {
  return slice$1(classof(it), 0, 3) === 'Big';
};

var aTypedArray$d = arrayBufferViewCore.aTypedArray;
var getTypedArrayConstructor$5 = arrayBufferViewCore.getTypedArrayConstructor;
var exportTypedArrayMethod$d = arrayBufferViewCore.exportTypedArrayMethod;

var PROPER_ORDER$1 = !!function () {
  try {
    // eslint-disable-next-line no-throw-literal, es-x/no-typed-arrays -- required for testing
    new Int8Array(1)['with'](2, { valueOf: function () { throw 8; } });
  } catch (error) {
    // some early implementations, like WebKit, does not follow the final semantic
    // https://github.com/tc39/proposal-change-array-by-copy/pull/86
    return error === 8;
  }
}();

// `%TypedArray%.prototype.with` method
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.with
exportTypedArrayMethod$d('with', { 'with': function (index, value) {
  var O = aTypedArray$d(this);
  var relativeIndex = toIntegerOrInfinity(index);
  var actualValue = isBigIntArray(O) ? toBigInt(value) : +value;
  return arrayWith(O, getTypedArrayConstructor$5(O), relativeIndex, actualValue);
} }['with'], !PROPER_ORDER$1);

// `Uint16Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
typedArrayConstructor('Uint16', function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

// https://github.com/tc39/proposal-iterator-helpers

var $some = asyncIteratorIteration.some;

_export({ target: 'AsyncIterator', proto: true, real: true, forced: true }, {
  some: function some(fn) {
    return $some(this, fn);
  }
});

// https://github.com/tc39/proposal-iterator-helpers





_export({ target: 'Iterator', proto: true, real: true, forced: true }, {
  some: function some(fn) {
    var record = getIteratorDirect(this);
    aCallable(fn);
    return iterate(record, function (value, stop) {
      if (fn(value)) return stop();
    }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
  }
});

/* ES Module Shims 1.5.16 */

(function () {
  const hasWindow = typeof window !== 'undefined';
  const hasDocument = typeof document !== 'undefined';

  const noop = () => {};

  const optionsScript = hasDocument ? document.querySelector('script[type=esms-options]') : undefined;
  const esmsInitOptions = optionsScript ? JSON.parse(optionsScript.innerHTML) : {};
  Object.assign(esmsInitOptions, self.esmsInitOptions || {});
  let shimMode = hasDocument ? !!esmsInitOptions.shimMode : true;
  const importHook = globalHook(shimMode && esmsInitOptions.onimport);
  const resolveHook = globalHook(shimMode && esmsInitOptions.resolve);
  let fetchHook = esmsInitOptions.fetch ? globalHook(esmsInitOptions.fetch) : fetch;
  const metaHook = esmsInitOptions.meta ? globalHook(shimMode && esmsInitOptions.meta) : noop;
  const skip = esmsInitOptions.skip ? new RegExp(esmsInitOptions.skip) : null;
  const mapOverrides = esmsInitOptions.mapOverrides;
  let nonce = esmsInitOptions.nonce;

  if (!nonce && hasDocument) {
    const nonceElement = document.querySelector('script[nonce]');
    if (nonceElement) nonce = nonceElement.nonce || nonceElement.getAttribute('nonce');
  }

  const onerror = globalHook(esmsInitOptions.onerror || noop);
  const onpolyfill = esmsInitOptions.onpolyfill ? globalHook(esmsInitOptions.onpolyfill) : () => {
    console.log('%c^^ Module TypeError above is polyfilled and can be ignored ^^', 'font-weight:900;color:#391');
  };
  const {
    revokeBlobURLs,
    noLoadEventRetriggers,
    enforceIntegrity
  } = esmsInitOptions;

  function globalHook(name) {
    return typeof name === 'string' ? self[name] : name;
  }

  const enable = Array.isArray(esmsInitOptions.polyfillEnable) ? esmsInitOptions.polyfillEnable : [];
  const cssModulesEnabled = enable.includes('css-modules');
  const jsonModulesEnabled = enable.includes('json-modules');
  const edge = !navigator.userAgentData && !!navigator.userAgent.match(/Edge\/\d+\.\d+/);
  const baseUrl = hasDocument ? document.baseURI : `${location.protocol}//${location.host}${location.pathname.includes('/') ? location.pathname.slice(0, location.pathname.lastIndexOf('/') + 1) : location.pathname}`;

  const createBlob = (source, type = 'text/javascript') => URL.createObjectURL(new Blob([source], {
    type
  }));

  const eoop = err => setTimeout(() => {
    throw err;
  });

  const throwError = err => {
    (self.reportError || hasWindow && window.safari && console.error || eoop)(err), void onerror(err);
  };

  function fromParent(parent) {
    return parent ? ` imported from ${parent}` : '';
  }

  let importMapSrcOrLazy = false;

  function setImportMapSrcOrLazy() {
    importMapSrcOrLazy = true;
  } // shim mode is determined on initialization, no late shim mode


  if (!shimMode) {
    if (document.querySelectorAll('script[type=module-shim],script[type=importmap-shim],link[rel=modulepreload-shim]').length) {
      shimMode = true;
    } else {
      let seenScript = false;

      for (const script of document.querySelectorAll('script[type=module],script[type=importmap]')) {
        if (!seenScript) {
          if (script.type === 'module' && !script.ep) seenScript = true;
        } else if (script.type === 'importmap' && seenScript) {
          importMapSrcOrLazy = true;
          break;
        }
      }
    }
  }

  const backslashRegEx = /\\/g;

  function isURL(url) {
    if (url.indexOf(':') === -1) return false;

    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }
  /*
   * Import maps implementation
   *
   * To make lookups fast we pre-resolve the entire import map
   * and then match based on backtracked hash lookups
   *
   */


  function resolveUrl(relUrl, parentUrl) {
    return resolveIfNotPlainOrUrl(relUrl, parentUrl) || (isURL(relUrl) ? relUrl : resolveIfNotPlainOrUrl('./' + relUrl, parentUrl));
  }

  function resolveIfNotPlainOrUrl(relUrl, parentUrl) {
    // strip off any trailing query params or hashes
    const queryHashIndex = parentUrl.indexOf('?', parentUrl.indexOf('#') === -1 ? parentUrl.indexOf('#') : parentUrl.length);
    if (queryHashIndex !== -1) parentUrl = parentUrl.slice(0, queryHashIndex);
    if (relUrl.indexOf('\\') !== -1) relUrl = relUrl.replace(backslashRegEx, '/'); // protocol-relative

    if (relUrl[0] === '/' && relUrl[1] === '/') {
      return parentUrl.slice(0, parentUrl.indexOf(':') + 1) + relUrl;
    } // relative-url
    else if (relUrl[0] === '.' && (relUrl[1] === '/' || relUrl[1] === '.' && (relUrl[2] === '/' || relUrl.length === 2 && (relUrl += '/')) || relUrl.length === 1 && (relUrl += '/')) || relUrl[0] === '/') {
      const parentProtocol = parentUrl.slice(0, parentUrl.indexOf(':') + 1); // Disabled, but these cases will give inconsistent results for deep backtracking
      //if (parentUrl[parentProtocol.length] !== '/')
      //  throw new Error('Cannot resolve');
      // read pathname from parent URL
      // pathname taken to be part after leading "/"

      let pathname;

      if (parentUrl[parentProtocol.length + 1] === '/') {
        // resolving to a :// so we need to read out the auth and host
        if (parentProtocol !== 'file:') {
          pathname = parentUrl.slice(parentProtocol.length + 2);
          pathname = pathname.slice(pathname.indexOf('/') + 1);
        } else {
          pathname = parentUrl.slice(8);
        }
      } else {
        // resolving to :/ so pathname is the /... part
        pathname = parentUrl.slice(parentProtocol.length + (parentUrl[parentProtocol.length] === '/'));
      }

      if (relUrl[0] === '/') return parentUrl.slice(0, parentUrl.length - pathname.length - 1) + relUrl; // join together and split for removal of .. and . segments
      // looping the string instead of anything fancy for perf reasons
      // '../../../../../z' resolved to 'x/y' is just 'z'

      const segmented = pathname.slice(0, pathname.lastIndexOf('/') + 1) + relUrl;
      const output = [];
      let segmentIndex = -1;

      for (let i = 0; i < segmented.length; i++) {
        // busy reading a segment - only terminate on '/'
        if (segmentIndex !== -1) {
          if (segmented[i] === '/') {
            output.push(segmented.slice(segmentIndex, i + 1));
            segmentIndex = -1;
          }

          continue;
        } // new segment - check if it is relative
        else if (segmented[i] === '.') {
          // ../ segment
          if (segmented[i + 1] === '.' && (segmented[i + 2] === '/' || i + 2 === segmented.length)) {
            output.pop();
            i += 2;
            continue;
          } // ./ segment
          else if (segmented[i + 1] === '/' || i + 1 === segmented.length) {
            i += 1;
            continue;
          }
        } // it is the start of a new segment


        while (segmented[i] === '/') i++;

        segmentIndex = i;
      } // finish reading out the last segment


      if (segmentIndex !== -1) output.push(segmented.slice(segmentIndex));
      return parentUrl.slice(0, parentUrl.length - pathname.length) + output.join('');
    }
  }

  function resolveAndComposeImportMap(json, baseUrl, parentMap) {
    const outMap = {
      imports: Object.assign({}, parentMap.imports),
      scopes: Object.assign({}, parentMap.scopes)
    };
    if (json.imports) resolveAndComposePackages(json.imports, outMap.imports, baseUrl, parentMap);
    if (json.scopes) for (let s in json.scopes) {
      const resolvedScope = resolveUrl(s, baseUrl);
      resolveAndComposePackages(json.scopes[s], outMap.scopes[resolvedScope] || (outMap.scopes[resolvedScope] = {}), baseUrl, parentMap);
    }
    return outMap;
  }

  function getMatch(path, matchObj) {
    if (matchObj[path]) return path;
    let sepIndex = path.length;

    do {
      const segment = path.slice(0, sepIndex + 1);
      if (segment in matchObj) return segment;
    } while ((sepIndex = path.lastIndexOf('/', sepIndex - 1)) !== -1);
  }

  function applyPackages(id, packages) {
    const pkgName = getMatch(id, packages);

    if (pkgName) {
      const pkg = packages[pkgName];
      if (pkg === null) return;
      return pkg + id.slice(pkgName.length);
    }
  }

  function resolveImportMap(importMap, resolvedOrPlain, parentUrl) {
    let scopeUrl = parentUrl && getMatch(parentUrl, importMap.scopes);

    while (scopeUrl) {
      const packageResolution = applyPackages(resolvedOrPlain, importMap.scopes[scopeUrl]);
      if (packageResolution) return packageResolution;
      scopeUrl = getMatch(scopeUrl.slice(0, scopeUrl.lastIndexOf('/')), importMap.scopes);
    }

    return applyPackages(resolvedOrPlain, importMap.imports) || resolvedOrPlain.indexOf(':') !== -1 && resolvedOrPlain;
  }

  function resolveAndComposePackages(packages, outPackages, baseUrl, parentMap) {
    for (let p in packages) {
      const resolvedLhs = resolveIfNotPlainOrUrl(p, baseUrl) || p;

      if ((!shimMode || !mapOverrides) && outPackages[resolvedLhs] && outPackages[resolvedLhs] !== packages[resolvedLhs]) {
        throw Error(`Rejected map override "${resolvedLhs}" from ${outPackages[resolvedLhs]} to ${packages[resolvedLhs]}.`);
      }

      let target = packages[p];
      if (typeof target !== 'string') continue;
      const mapped = resolveImportMap(parentMap, resolveIfNotPlainOrUrl(target, baseUrl) || target, baseUrl);

      if (mapped) {
        outPackages[resolvedLhs] = mapped;
        continue;
      }

      console.warn(`Mapping "${p}" -> "${packages[p]}" does not resolve`);
    }
  }

  let dynamicImport = !hasDocument && (0, eval)('u=>import(u)');
  let supportsDynamicImport;
  const dynamicImportCheck = hasDocument && new Promise(resolve => {
    const s = Object.assign(document.createElement('script'), {
      src: createBlob('self._d=u=>import(u)'),
      ep: true
    });
    s.setAttribute('nonce', nonce);
    s.addEventListener('load', () => {
      if (!(supportsDynamicImport = !!(dynamicImport = self._d))) {
        let err;
        window.addEventListener('error', _err => err = _err);

        dynamicImport = (url, opts) => new Promise((resolve, reject) => {
          const s = Object.assign(document.createElement('script'), {
            type: 'module',
            src: createBlob(`import*as m from'${url}';self._esmsi=m`)
          });
          err = undefined;
          s.ep = true;
          if (nonce) s.setAttribute('nonce', nonce); // Safari is unique in supporting module script error events

          s.addEventListener('error', cb);
          s.addEventListener('load', cb);

          function cb(_err) {
            document.head.removeChild(s);

            if (self._esmsi) {
              resolve(self._esmsi, baseUrl);
              self._esmsi = undefined;
            } else {
              reject(!(_err instanceof Event) && _err || err && err.error || new Error(`Error loading ${opts && opts.errUrl || url} (${s.src}).`));
              err = undefined;
            }
          }

          document.head.appendChild(s);
        });
      }

      document.head.removeChild(s);
      delete self._d;
      resolve();
    });
    document.head.appendChild(s);
  }); // support browsers without dynamic import support (eg Firefox 6x)

  let supportsJsonAssertions = false;
  let supportsCssAssertions = false;
  let supportsImportMaps = hasDocument && HTMLScriptElement.supports ? HTMLScriptElement.supports('importmap') : false;
  let supportsImportMeta = supportsImportMaps;
  const importMetaCheck = 'import.meta';
  const cssModulesCheck = `import"x"assert{type:"css"}`;
  const jsonModulesCheck = `import"x"assert{type:"json"}`;
  const featureDetectionPromise = Promise.resolve(dynamicImportCheck).then(() => {
    if (!supportsDynamicImport || supportsImportMaps && !cssModulesEnabled && !jsonModulesEnabled) return;
    if (!hasDocument) return Promise.all([supportsImportMaps || dynamicImport(createBlob(importMetaCheck)).then(() => supportsImportMeta = true, noop), cssModulesEnabled && dynamicImport(createBlob(cssModulesCheck.replace('x', createBlob('', 'text/css')))).then(() => supportsCssAssertions = true, noop), jsonModulesEnabled && dynamicImport(createBlob(jsonModulescheck.replace('x', createBlob('{}', 'text/json')))).then(() => supportsJsonAssertions = true, noop)]);
    return new Promise(resolve => {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.setAttribute('nonce', nonce);

      function cb({
        data: [a, b, c, d]
      }) {
        supportsImportMaps = a;
        supportsImportMeta = b;
        supportsCssAssertions = c;
        supportsJsonAssertions = d;
        resolve();
        document.head.removeChild(iframe);
        window.removeEventListener('message', cb, false);
      }

      window.addEventListener('message', cb, false);
      const importMapTest = `<script nonce=${nonce}>const b=(s,type='text/javascript')=>URL.createObjectURL(new Blob([s],{type}));document.head.appendChild(Object.assign(document.createElement('script'),{type:'importmap',nonce:"${nonce}",innerText:\`{"imports":{"x":"\${b('')}"}}\`}));Promise.all([${supportsImportMaps ? 'true,true' : `'x',b('${importMetaCheck}')`}, ${cssModulesEnabled ? `b('${cssModulesCheck}'.replace('x',b('','text/css')))` : 'false'}, ${jsonModulesEnabled ? `b('${jsonModulesCheck}'.replace('x',b('{}','text/json')))` : 'false'}].map(x =>typeof x==='string'?import(x).then(x =>!!x,()=>false):x)).then(a=>parent.postMessage(a,'*'))<${''}/script>`; // setting srcdoc is not supported in React native webviews on iOS
      // setting src to a blob URL results in a navigation event in webviews
      // document.write gives usability warnings

      if ('srcdoc' in iframe) iframe.srcdoc = importMapTest;else iframe.contentDocument.write(importMapTest);
      document.head.appendChild(iframe);
    });
  });
  /* es-module-lexer 1.0.3 */

  let e,
      a,
      r,
      i = 2 << 19;
  const s = 1 === new Uint8Array(new Uint16Array([1]).buffer)[0] ? function (e, a) {
    const r = e.length;
    let i = 0;

    for (; i < r;) a[i] = e.charCodeAt(i++);
  } : function (e, a) {
    const r = e.length;
    let i = 0;

    for (; i < r;) {
      const r = e.charCodeAt(i);
      a[i++] = (255 & r) << 8 | r >>> 8;
    }
  },
        t = "xportmportlassetafromssertvoyiedelecontininstantybreareturdebuggeawaithrwhileforifcatcfinallels";
  let c$1, f, n;

  function parse(l, k = "@") {
    c$1 = l, f = k;
    const u = 2 * c$1.length + (2 << 18);

    if (u > i || !e) {
      for (; u > i;) i *= 2;

      a = new ArrayBuffer(i), s(t, new Uint16Array(a, 16, 95)), e = function (e, a, r) {
        "use asm";

        var i = new e.Int8Array(r),
            s = new e.Int16Array(r),
            t = new e.Int32Array(r),
            c = new e.Uint8Array(r),
            f = new e.Uint16Array(r),
            n = 1008;

        function b(e) {
          e = e | 0;
          var a = 0,
              r = 0,
              c = 0,
              b = 0,
              o = 0,
              w = 0;
          w = n;
          n = n + 10240 | 0;
          i[775] = 1;
          s[385] = 0;
          s[386] = 0;
          t[62] = t[2];
          i[776] = 0;
          t[61] = 0;
          i[774] = 0;
          t[63] = w + 2048;
          t[64] = w;
          i[777] = 0;
          e = (t[3] | 0) + -2 | 0;
          t[65] = e;
          a = e + (t[59] << 1) | 0;
          t[66] = a;

          e: while (1) {
            r = e + 2 | 0;
            t[65] = r;

            if (e >>> 0 >= a >>> 0) {
              b = 18;
              break;
            }

            a: do {
              switch (s[r >> 1] | 0) {
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 32:
                  break;

                case 101:
                  {
                    if ((((s[386] | 0) == 0 ? F(r) | 0 : 0) ? (m(e + 4 | 0, 16, 10) | 0) == 0 : 0) ? (l(), (i[775] | 0) == 0) : 0) {
                      b = 9;
                      break e;
                    } else b = 17;

                    break;
                  }

                case 105:
                  {
                    if (F(r) | 0 ? (m(e + 4 | 0, 26, 10) | 0) == 0 : 0) {
                      k();
                      b = 17;
                    } else b = 17;

                    break;
                  }

                case 59:
                  {
                    b = 17;
                    break;
                  }

                case 47:
                  switch (s[e + 4 >> 1] | 0) {
                    case 47:
                      {
                        E();
                        break a;
                      }

                    case 42:
                      {
                        y(1);
                        break a;
                      }

                    default:
                      {
                        b = 16;
                        break e;
                      }
                  }

                default:
                  {
                    b = 16;
                    break e;
                  }
              }
            } while (0);

            if ((b | 0) == 17) {
              b = 0;
              t[62] = t[65];
            }

            e = t[65] | 0;
            a = t[66] | 0;
          }

          if ((b | 0) == 9) {
            e = t[65] | 0;
            t[62] = e;
            b = 19;
          } else if ((b | 0) == 16) {
            i[775] = 0;
            t[65] = e;
            b = 19;
          } else if ((b | 0) == 18) if (!(i[774] | 0)) {
            e = r;
            b = 19;
          } else e = 0;

          do {
            if ((b | 0) == 19) {
              e: while (1) {
                a = e + 2 | 0;
                t[65] = a;
                c = a;

                if (e >>> 0 >= (t[66] | 0) >>> 0) {
                  b = 82;
                  break;
                }

                a: do {
                  switch (s[a >> 1] | 0) {
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 32:
                      break;

                    case 101:
                      {
                        if (((s[386] | 0) == 0 ? F(a) | 0 : 0) ? (m(e + 4 | 0, 16, 10) | 0) == 0 : 0) {
                          l();
                          b = 81;
                        } else b = 81;

                        break;
                      }

                    case 105:
                      {
                        if (F(a) | 0 ? (m(e + 4 | 0, 26, 10) | 0) == 0 : 0) {
                          k();
                          b = 81;
                        } else b = 81;

                        break;
                      }

                    case 99:
                      {
                        if ((F(a) | 0 ? (m(e + 4 | 0, 36, 8) | 0) == 0 : 0) ? R(s[e + 12 >> 1] | 0) | 0 : 0) {
                          i[777] = 1;
                          b = 81;
                        } else b = 81;

                        break;
                      }

                    case 40:
                      {
                        c = t[63] | 0;
                        a = s[386] | 0;
                        b = a & 65535;
                        t[c + (b << 3) >> 2] = 1;
                        r = t[62] | 0;
                        s[386] = a + 1 << 16 >> 16;
                        t[c + (b << 3) + 4 >> 2] = r;
                        b = 81;
                        break;
                      }

                    case 41:
                      {
                        a = s[386] | 0;

                        if (!(a << 16 >> 16)) {
                          b = 36;
                          break e;
                        }

                        a = a + -1 << 16 >> 16;
                        s[386] = a;
                        r = s[385] | 0;

                        if (r << 16 >> 16 != 0 ? (o = t[(t[64] | 0) + ((r & 65535) + -1 << 2) >> 2] | 0, (t[o + 20 >> 2] | 0) == (t[(t[63] | 0) + ((a & 65535) << 3) + 4 >> 2] | 0)) : 0) {
                          a = o + 4 | 0;
                          if (!(t[a >> 2] | 0)) t[a >> 2] = c;
                          t[o + 12 >> 2] = e + 4;
                          s[385] = r + -1 << 16 >> 16;
                          b = 81;
                        } else b = 81;

                        break;
                      }

                    case 123:
                      {
                        b = t[62] | 0;
                        c = t[56] | 0;
                        e = b;

                        do {
                          if ((s[b >> 1] | 0) == 41 & (c | 0) != 0 ? (t[c + 4 >> 2] | 0) == (b | 0) : 0) {
                            a = t[57] | 0;
                            t[56] = a;

                            if (!a) {
                              t[52] = 0;
                              break;
                            } else {
                              t[a + 28 >> 2] = 0;
                              break;
                            }
                          }
                        } while (0);

                        c = t[63] | 0;
                        r = s[386] | 0;
                        b = r & 65535;
                        t[c + (b << 3) >> 2] = (i[777] | 0) == 0 ? 2 : 6;
                        s[386] = r + 1 << 16 >> 16;
                        t[c + (b << 3) + 4 >> 2] = e;
                        i[777] = 0;
                        b = 81;
                        break;
                      }

                    case 125:
                      {
                        e = s[386] | 0;

                        if (!(e << 16 >> 16)) {
                          b = 49;
                          break e;
                        }

                        c = t[63] | 0;
                        b = e + -1 << 16 >> 16;
                        s[386] = b;

                        if ((t[c + ((b & 65535) << 3) >> 2] | 0) == 4) {
                          h();
                          b = 81;
                        } else b = 81;

                        break;
                      }

                    case 39:
                      {
                        d(39);
                        b = 81;
                        break;
                      }

                    case 34:
                      {
                        d(34);
                        b = 81;
                        break;
                      }

                    case 47:
                      switch (s[e + 4 >> 1] | 0) {
                        case 47:
                          {
                            E();
                            break a;
                          }

                        case 42:
                          {
                            y(1);
                            break a;
                          }

                        default:
                          {
                            e = t[62] | 0;
                            c = s[e >> 1] | 0;

                            r: do {
                              if (!(U(c) | 0)) {
                                switch (c << 16 >> 16) {
                                  case 41:
                                    if (z(t[(t[63] | 0) + (f[386] << 3) + 4 >> 2] | 0) | 0) {
                                      b = 69;
                                      break r;
                                    } else {
                                      b = 66;
                                      break r;
                                    }

                                  case 125:
                                    break;

                                  default:
                                    {
                                      b = 66;
                                      break r;
                                    }
                                }

                                a = t[63] | 0;
                                r = f[386] | 0;
                                if (!(p(t[a + (r << 3) + 4 >> 2] | 0) | 0) ? (t[a + (r << 3) >> 2] | 0) != 6 : 0) b = 66;else b = 69;
                              } else switch (c << 16 >> 16) {
                                case 46:
                                  if (((s[e + -2 >> 1] | 0) + -48 & 65535) < 10) {
                                    b = 66;
                                    break r;
                                  } else {
                                    b = 69;
                                    break r;
                                  }

                                case 43:
                                  if ((s[e + -2 >> 1] | 0) == 43) {
                                    b = 66;
                                    break r;
                                  } else {
                                    b = 69;
                                    break r;
                                  }

                                case 45:
                                  if ((s[e + -2 >> 1] | 0) == 45) {
                                    b = 66;
                                    break r;
                                  } else {
                                    b = 69;
                                    break r;
                                  }

                                default:
                                  {
                                    b = 69;
                                    break r;
                                  }
                              }
                            } while (0);

                            r: do {
                              if ((b | 0) == 66) {
                                b = 0;

                                if (!(u(e) | 0)) {
                                  switch (c << 16 >> 16) {
                                    case 0:
                                      {
                                        b = 69;
                                        break r;
                                      }

                                    case 47:
                                      {
                                        if (i[776] | 0) {
                                          b = 69;
                                          break r;
                                        }

                                        break;
                                      }

                                    default:
                                      {}
                                  }

                                  r = t[3] | 0;
                                  a = c;

                                  do {
                                    if (e >>> 0 <= r >>> 0) break;
                                    e = e + -2 | 0;
                                    t[62] = e;
                                    a = s[e >> 1] | 0;
                                  } while (!(B(a) | 0));

                                  if (D(a) | 0) {
                                    do {
                                      if (e >>> 0 <= r >>> 0) break;
                                      e = e + -2 | 0;
                                      t[62] = e;
                                    } while (D(s[e >> 1] | 0) | 0);

                                    if ($(e) | 0) {
                                      g();
                                      i[776] = 0;
                                      b = 81;
                                      break a;
                                    } else e = 1;
                                  } else e = 1;
                                } else b = 69;
                              }
                            } while (0);

                            if ((b | 0) == 69) {
                              g();
                              e = 0;
                            }

                            i[776] = e;
                            b = 81;
                            break a;
                          }
                      }

                    case 96:
                      {
                        c = t[63] | 0;
                        r = s[386] | 0;
                        b = r & 65535;
                        t[c + (b << 3) + 4 >> 2] = t[62];
                        s[386] = r + 1 << 16 >> 16;
                        t[c + (b << 3) >> 2] = 3;
                        h();
                        b = 81;
                        break;
                      }

                    default:
                      b = 81;
                  }
                } while (0);

                if ((b | 0) == 81) {
                  b = 0;
                  t[62] = t[65];
                }

                e = t[65] | 0;
              }

              if ((b | 0) == 36) {
                Q();
                e = 0;
                break;
              } else if ((b | 0) == 49) {
                Q();
                e = 0;
                break;
              } else if ((b | 0) == 82) {
                e = (i[774] | 0) == 0 ? (s[385] | s[386]) << 16 >> 16 == 0 : 0;
                break;
              }
            }
          } while (0);

          n = w;
          return e | 0;
        }

        function l() {
          var e = 0,
              a = 0,
              r = 0,
              c = 0,
              f = 0,
              n = 0,
              b = 0;
          f = t[65] | 0;
          n = t[58] | 0;
          b = f + 12 | 0;
          t[65] = b;
          r = w(1) | 0;
          e = t[65] | 0;
          if (!((e | 0) == (b | 0) ? !(I(r) | 0) : 0)) c = 3;

          e: do {
            if ((c | 0) == 3) {
              a: do {
                switch (r << 16 >> 16) {
                  case 123:
                    {
                      t[65] = e + 2;
                      e = w(1) | 0;
                      r = t[65] | 0;

                      while (1) {
                        if (T(e) | 0) {
                          d(e);
                          e = (t[65] | 0) + 2 | 0;
                          t[65] = e;
                        } else {
                          P(e) | 0;
                          e = t[65] | 0;
                        }

                        w(1) | 0;
                        e = v(r, e) | 0;

                        if (e << 16 >> 16 == 44) {
                          t[65] = (t[65] | 0) + 2;
                          e = w(1) | 0;
                        }

                        a = r;
                        r = t[65] | 0;

                        if (e << 16 >> 16 == 125) {
                          c = 15;
                          break;
                        }

                        if ((r | 0) == (a | 0)) {
                          c = 12;
                          break;
                        }

                        if (r >>> 0 > (t[66] | 0) >>> 0) {
                          c = 14;
                          break;
                        }
                      }

                      if ((c | 0) == 12) {
                        Q();
                        break e;
                      } else if ((c | 0) == 14) {
                        Q();
                        break e;
                      } else if ((c | 0) == 15) {
                        t[65] = r + 2;
                        break a;
                      }

                      break;
                    }

                  case 42:
                    {
                      t[65] = e + 2;
                      w(1) | 0;
                      b = t[65] | 0;
                      v(b, b) | 0;
                      break;
                    }

                  default:
                    {
                      i[775] = 0;

                      switch (r << 16 >> 16) {
                        case 100:
                          {
                            O(e, e + 14 | 0, 0, 0);
                            break e;
                          }

                        case 97:
                          {
                            t[65] = e + 10;
                            w(1) | 0;
                            e = t[65] | 0;
                            c = 20;
                            break;
                          }

                        case 102:
                          {
                            c = 20;
                            break;
                          }

                        case 99:
                          {
                            if ((m(e + 2 | 0, 36, 8) | 0) == 0 ? (a = e + 10 | 0, B(s[a >> 1] | 0) | 0) : 0) {
                              t[65] = a;
                              b = w(1) | 0;
                              n = t[65] | 0;
                              P(b) | 0;
                              b = t[65] | 0;
                              O(n, b, n, b);
                              t[65] = (t[65] | 0) + -2;
                              break e;
                            }

                            e = e + 4 | 0;
                            t[65] = e;
                            break;
                          }

                        case 108:
                        case 118:
                          break;

                        default:
                          break e;
                      }

                      if ((c | 0) == 20) {
                        t[65] = e + 16;
                        e = w(1) | 0;

                        if (e << 16 >> 16 == 42) {
                          t[65] = (t[65] | 0) + 2;
                          e = w(1) | 0;
                        }

                        n = t[65] | 0;
                        P(e) | 0;
                        b = t[65] | 0;
                        O(n, b, n, b);
                        t[65] = (t[65] | 0) + -2;
                        break e;
                      }

                      e = e + 4 | 0;
                      t[65] = e;
                      i[775] = 0;

                      r: while (1) {
                        t[65] = e + 2;
                        b = w(1) | 0;
                        e = t[65] | 0;

                        switch ((P(b) | 0) << 16 >> 16) {
                          case 91:
                          case 123:
                            break r;

                          default:
                            {}
                        }

                        a = t[65] | 0;
                        if ((a | 0) == (e | 0)) break e;
                        O(e, a, e, a);
                        if ((w(1) | 0) << 16 >> 16 != 44) break;
                        e = t[65] | 0;
                      }

                      t[65] = (t[65] | 0) + -2;
                      break e;
                    }
                }
              } while (0);

              b = (w(1) | 0) << 16 >> 16 == 102;
              e = t[65] | 0;

              if (b ? (m(e + 2 | 0, 52, 6) | 0) == 0 : 0) {
                t[65] = e + 8;
                o(f, w(1) | 0);
                e = (n | 0) == 0 ? 212 : n + 16 | 0;

                while (1) {
                  e = t[e >> 2] | 0;
                  if (!e) break e;
                  t[e + 12 >> 2] = 0;
                  t[e + 8 >> 2] = 0;
                  e = e + 16 | 0;
                }
              }

              t[65] = e + -2;
            }
          } while (0);

          return;
        }

        function k() {
          var e = 0,
              a = 0,
              r = 0,
              c = 0,
              f = 0,
              n = 0;
          f = t[65] | 0;
          a = f + 12 | 0;
          t[65] = a;

          e: do {
            switch ((w(1) | 0) << 16 >> 16) {
              case 40:
                {
                  a = t[63] | 0;
                  n = s[386] | 0;
                  r = n & 65535;
                  t[a + (r << 3) >> 2] = 5;
                  e = t[65] | 0;
                  s[386] = n + 1 << 16 >> 16;
                  t[a + (r << 3) + 4 >> 2] = e;

                  if ((s[t[62] >> 1] | 0) != 46) {
                    t[65] = e + 2;
                    n = w(1) | 0;
                    A(f, t[65] | 0, 0, e);
                    a = t[56] | 0;
                    r = t[64] | 0;
                    f = s[385] | 0;
                    s[385] = f + 1 << 16 >> 16;
                    t[r + ((f & 65535) << 2) >> 2] = a;

                    switch (n << 16 >> 16) {
                      case 39:
                        {
                          d(39);
                          break;
                        }

                      case 34:
                        {
                          d(34);
                          break;
                        }

                      default:
                        {
                          t[65] = (t[65] | 0) + -2;
                          break e;
                        }
                    }

                    e = (t[65] | 0) + 2 | 0;
                    t[65] = e;

                    switch ((w(1) | 0) << 16 >> 16) {
                      case 44:
                        {
                          t[65] = (t[65] | 0) + 2;
                          w(1) | 0;
                          f = t[56] | 0;
                          t[f + 4 >> 2] = e;
                          n = t[65] | 0;
                          t[f + 16 >> 2] = n;
                          i[f + 24 >> 0] = 1;
                          t[65] = n + -2;
                          break e;
                        }

                      case 41:
                        {
                          s[386] = (s[386] | 0) + -1 << 16 >> 16;
                          n = t[56] | 0;
                          t[n + 4 >> 2] = e;
                          t[n + 12 >> 2] = (t[65] | 0) + 2;
                          i[n + 24 >> 0] = 1;
                          s[385] = (s[385] | 0) + -1 << 16 >> 16;
                          break e;
                        }

                      default:
                        {
                          t[65] = (t[65] | 0) + -2;
                          break e;
                        }
                    }
                  }

                  break;
                }

              case 46:
                {
                  t[65] = (t[65] | 0) + 2;
                  if (((w(1) | 0) << 16 >> 16 == 109 ? (e = t[65] | 0, (m(e + 2 | 0, 44, 6) | 0) == 0) : 0) ? (s[t[62] >> 1] | 0) != 46 : 0) A(f, f, e + 8 | 0, 2);
                  break;
                }

              case 42:
              case 39:
              case 34:
                {
                  c = 17;
                  break;
                }

              case 123:
                {
                  e = t[65] | 0;

                  if (s[386] | 0) {
                    t[65] = e + -2;
                    break e;
                  }

                  while (1) {
                    if (e >>> 0 >= (t[66] | 0) >>> 0) break;
                    e = w(1) | 0;

                    if (!(T(e) | 0)) {
                      if (e << 16 >> 16 == 125) {
                        c = 32;
                        break;
                      }
                    } else d(e);

                    e = (t[65] | 0) + 2 | 0;
                    t[65] = e;
                  }

                  if ((c | 0) == 32) t[65] = (t[65] | 0) + 2;
                  w(1) | 0;
                  e = t[65] | 0;

                  if (m(e, 50, 8) | 0) {
                    Q();
                    break e;
                  }

                  t[65] = e + 8;
                  e = w(1) | 0;

                  if (T(e) | 0) {
                    o(f, e);
                    break e;
                  } else {
                    Q();
                    break e;
                  }
                }

              default:
                if ((t[65] | 0) == (a | 0)) t[65] = f + 10;else c = 17;
            }
          } while (0);

          do {
            if ((c | 0) == 17) {
              if (s[386] | 0) {
                t[65] = (t[65] | 0) + -2;
                break;
              }

              e = t[66] | 0;
              a = t[65] | 0;

              while (1) {
                if (a >>> 0 >= e >>> 0) {
                  c = 24;
                  break;
                }

                r = s[a >> 1] | 0;

                if (T(r) | 0) {
                  c = 22;
                  break;
                }

                n = a + 2 | 0;
                t[65] = n;
                a = n;
              }

              if ((c | 0) == 22) {
                o(f, r);
                break;
              } else if ((c | 0) == 24) {
                Q();
                break;
              }
            }
          } while (0);

          return;
        }

        function u(e) {
          e = e | 0;

          e: do {
            switch (s[e >> 1] | 0) {
              case 100:
                switch (s[e + -2 >> 1] | 0) {
                  case 105:
                    {
                      e = S(e + -4 | 0, 68, 2) | 0;
                      break e;
                    }

                  case 108:
                    {
                      e = S(e + -4 | 0, 72, 3) | 0;
                      break e;
                    }

                  default:
                    {
                      e = 0;
                      break e;
                    }
                }

              case 101:
                switch (s[e + -2 >> 1] | 0) {
                  case 115:
                    switch (s[e + -4 >> 1] | 0) {
                      case 108:
                        {
                          e = j(e + -6 | 0, 101) | 0;
                          break e;
                        }

                      case 97:
                        {
                          e = j(e + -6 | 0, 99) | 0;
                          break e;
                        }

                      default:
                        {
                          e = 0;
                          break e;
                        }
                    }

                  case 116:
                    {
                      e = S(e + -4 | 0, 78, 4) | 0;
                      break e;
                    }

                  case 117:
                    {
                      e = S(e + -4 | 0, 86, 6) | 0;
                      break e;
                    }

                  default:
                    {
                      e = 0;
                      break e;
                    }
                }

              case 102:
                {
                  if ((s[e + -2 >> 1] | 0) == 111 ? (s[e + -4 >> 1] | 0) == 101 : 0) switch (s[e + -6 >> 1] | 0) {
                    case 99:
                      {
                        e = S(e + -8 | 0, 98, 6) | 0;
                        break e;
                      }

                    case 112:
                      {
                        e = S(e + -8 | 0, 110, 2) | 0;
                        break e;
                      }

                    default:
                      {
                        e = 0;
                        break e;
                      }
                  } else e = 0;
                  break;
                }

              case 107:
                {
                  e = S(e + -2 | 0, 114, 4) | 0;
                  break;
                }

              case 110:
                {
                  e = e + -2 | 0;
                  if (j(e, 105) | 0) e = 1;else e = S(e, 122, 5) | 0;
                  break;
                }

              case 111:
                {
                  e = j(e + -2 | 0, 100) | 0;
                  break;
                }

              case 114:
                {
                  e = S(e + -2 | 0, 132, 7) | 0;
                  break;
                }

              case 116:
                {
                  e = S(e + -2 | 0, 146, 4) | 0;
                  break;
                }

              case 119:
                switch (s[e + -2 >> 1] | 0) {
                  case 101:
                    {
                      e = j(e + -4 | 0, 110) | 0;
                      break e;
                    }

                  case 111:
                    {
                      e = S(e + -4 | 0, 154, 3) | 0;
                      break e;
                    }

                  default:
                    {
                      e = 0;
                      break e;
                    }
                }

              default:
                e = 0;
            }
          } while (0);

          return e | 0;
        }

        function o(e, a) {
          e = e | 0;
          a = a | 0;
          var r = 0,
              i = 0;
          r = (t[65] | 0) + 2 | 0;

          switch (a << 16 >> 16) {
            case 39:
              {
                d(39);
                i = 5;
                break;
              }

            case 34:
              {
                d(34);
                i = 5;
                break;
              }

            default:
              Q();
          }

          do {
            if ((i | 0) == 5) {
              A(e, r, t[65] | 0, 1);
              t[65] = (t[65] | 0) + 2;
              i = (w(0) | 0) << 16 >> 16 == 97;
              a = t[65] | 0;

              if (i ? (m(a + 2 | 0, 58, 10) | 0) == 0 : 0) {
                t[65] = a + 12;

                if ((w(1) | 0) << 16 >> 16 != 123) {
                  t[65] = a;
                  break;
                }

                e = t[65] | 0;
                r = e;

                e: while (1) {
                  t[65] = r + 2;
                  r = w(1) | 0;

                  switch (r << 16 >> 16) {
                    case 39:
                      {
                        d(39);
                        t[65] = (t[65] | 0) + 2;
                        r = w(1) | 0;
                        break;
                      }

                    case 34:
                      {
                        d(34);
                        t[65] = (t[65] | 0) + 2;
                        r = w(1) | 0;
                        break;
                      }

                    default:
                      r = P(r) | 0;
                  }

                  if (r << 16 >> 16 != 58) {
                    i = 16;
                    break;
                  }

                  t[65] = (t[65] | 0) + 2;

                  switch ((w(1) | 0) << 16 >> 16) {
                    case 39:
                      {
                        d(39);
                        break;
                      }

                    case 34:
                      {
                        d(34);
                        break;
                      }

                    default:
                      {
                        i = 20;
                        break e;
                      }
                  }

                  t[65] = (t[65] | 0) + 2;

                  switch ((w(1) | 0) << 16 >> 16) {
                    case 125:
                      {
                        i = 25;
                        break e;
                      }

                    case 44:
                      break;

                    default:
                      {
                        i = 24;
                        break e;
                      }
                  }

                  t[65] = (t[65] | 0) + 2;

                  if ((w(1) | 0) << 16 >> 16 == 125) {
                    i = 25;
                    break;
                  }

                  r = t[65] | 0;
                }

                if ((i | 0) == 16) {
                  t[65] = a;
                  break;
                } else if ((i | 0) == 20) {
                  t[65] = a;
                  break;
                } else if ((i | 0) == 24) {
                  t[65] = a;
                  break;
                } else if ((i | 0) == 25) {
                  i = t[56] | 0;
                  t[i + 16 >> 2] = e;
                  t[i + 12 >> 2] = (t[65] | 0) + 2;
                  break;
                }
              }

              t[65] = a + -2;
            }
          } while (0);

          return;
        }

        function h() {
          var e = 0,
              a = 0,
              r = 0,
              i = 0;
          a = t[66] | 0;
          r = t[65] | 0;

          e: while (1) {
            e = r + 2 | 0;

            if (r >>> 0 >= a >>> 0) {
              a = 10;
              break;
            }

            switch (s[e >> 1] | 0) {
              case 96:
                {
                  a = 7;
                  break e;
                }

              case 36:
                {
                  if ((s[r + 4 >> 1] | 0) == 123) {
                    a = 6;
                    break e;
                  }

                  break;
                }

              case 92:
                {
                  e = r + 4 | 0;
                  break;
                }

              default:
                {}
            }

            r = e;
          }

          if ((a | 0) == 6) {
            e = r + 4 | 0;
            t[65] = e;
            a = t[63] | 0;
            i = s[386] | 0;
            r = i & 65535;
            t[a + (r << 3) >> 2] = 4;
            s[386] = i + 1 << 16 >> 16;
            t[a + (r << 3) + 4 >> 2] = e;
          } else if ((a | 0) == 7) {
            t[65] = e;
            r = t[63] | 0;
            i = (s[386] | 0) + -1 << 16 >> 16;
            s[386] = i;
            if ((t[r + ((i & 65535) << 3) >> 2] | 0) != 3) Q();
          } else if ((a | 0) == 10) {
            t[65] = e;
            Q();
          }

          return;
        }

        function w(e) {
          e = e | 0;
          var a = 0,
              r = 0,
              i = 0;
          r = t[65] | 0;

          e: do {
            a = s[r >> 1] | 0;

            a: do {
              if (a << 16 >> 16 != 47) {
                if (e) {
                  if (R(a) | 0) break;else break e;
                } else if (D(a) | 0) break;else break e;
              } else switch (s[r + 2 >> 1] | 0) {
                case 47:
                  {
                    E();
                    break a;
                  }

                case 42:
                  {
                    y(e);
                    break a;
                  }

                default:
                  {
                    a = 47;
                    break e;
                  }
              }
            } while (0);

            i = t[65] | 0;
            r = i + 2 | 0;
            t[65] = r;
          } while (i >>> 0 < (t[66] | 0) >>> 0);

          return a | 0;
        }

        function d(e) {
          e = e | 0;
          var a = 0,
              r = 0,
              i = 0,
              c = 0;
          c = t[66] | 0;
          a = t[65] | 0;

          while (1) {
            i = a + 2 | 0;

            if (a >>> 0 >= c >>> 0) {
              a = 9;
              break;
            }

            r = s[i >> 1] | 0;

            if (r << 16 >> 16 == e << 16 >> 16) {
              a = 10;
              break;
            }

            if (r << 16 >> 16 == 92) {
              r = a + 4 | 0;

              if ((s[r >> 1] | 0) == 13) {
                a = a + 6 | 0;
                a = (s[a >> 1] | 0) == 10 ? a : r;
              } else a = r;
            } else if (X(r) | 0) {
              a = 9;
              break;
            } else a = i;
          }

          if ((a | 0) == 9) {
            t[65] = i;
            Q();
          } else if ((a | 0) == 10) t[65] = i;

          return;
        }

        function v(e, a) {
          e = e | 0;
          a = a | 0;
          var r = 0,
              i = 0,
              c = 0,
              f = 0;
          r = t[65] | 0;
          i = s[r >> 1] | 0;
          f = (e | 0) == (a | 0);
          c = f ? 0 : e;
          f = f ? 0 : a;

          if (i << 16 >> 16 == 97) {
            t[65] = r + 4;
            r = w(1) | 0;
            e = t[65] | 0;

            if (T(r) | 0) {
              d(r);
              a = (t[65] | 0) + 2 | 0;
              t[65] = a;
            } else {
              P(r) | 0;
              a = t[65] | 0;
            }

            i = w(1) | 0;
            r = t[65] | 0;
          }

          if ((r | 0) != (e | 0)) O(e, a, c, f);
          return i | 0;
        }

        function A(e, a, r, s) {
          e = e | 0;
          a = a | 0;
          r = r | 0;
          s = s | 0;
          var c = 0,
              f = 0;
          c = t[60] | 0;
          t[60] = c + 32;
          f = t[56] | 0;
          t[((f | 0) == 0 ? 208 : f + 28 | 0) >> 2] = c;
          t[57] = f;
          t[56] = c;
          t[c + 8 >> 2] = e;
          if (2 == (s | 0)) e = r;else e = 1 == (s | 0) ? r + 2 | 0 : 0;
          t[c + 12 >> 2] = e;
          t[c >> 2] = a;
          t[c + 4 >> 2] = r;
          t[c + 16 >> 2] = 0;
          t[c + 20 >> 2] = s;
          i[c + 24 >> 0] = 1 == (s | 0) & 1;
          t[c + 28 >> 2] = 0;
          return;
        }

        function C() {
          var e = 0,
              a = 0,
              r = 0;
          r = t[66] | 0;
          a = t[65] | 0;

          e: while (1) {
            e = a + 2 | 0;

            if (a >>> 0 >= r >>> 0) {
              a = 6;
              break;
            }

            switch (s[e >> 1] | 0) {
              case 13:
              case 10:
                {
                  a = 6;
                  break e;
                }

              case 93:
                {
                  a = 7;
                  break e;
                }

              case 92:
                {
                  e = a + 4 | 0;
                  break;
                }

              default:
                {}
            }

            a = e;
          }

          if ((a | 0) == 6) {
            t[65] = e;
            Q();
            e = 0;
          } else if ((a | 0) == 7) {
            t[65] = e;
            e = 93;
          }

          return e | 0;
        }

        function g() {
          var e = 0,
              a = 0,
              r = 0;

          e: while (1) {
            e = t[65] | 0;
            a = e + 2 | 0;
            t[65] = a;

            if (e >>> 0 >= (t[66] | 0) >>> 0) {
              r = 7;
              break;
            }

            switch (s[a >> 1] | 0) {
              case 13:
              case 10:
                {
                  r = 7;
                  break e;
                }

              case 47:
                break e;

              case 91:
                {
                  C() | 0;
                  break;
                }

              case 92:
                {
                  t[65] = e + 4;
                  break;
                }

              default:
                {}
            }
          }

          if ((r | 0) == 7) Q();
          return;
        }

        function p(e) {
          e = e | 0;

          switch (s[e >> 1] | 0) {
            case 62:
              {
                e = (s[e + -2 >> 1] | 0) == 61;
                break;
              }

            case 41:
            case 59:
              {
                e = 1;
                break;
              }

            case 104:
              {
                e = S(e + -2 | 0, 180, 4) | 0;
                break;
              }

            case 121:
              {
                e = S(e + -2 | 0, 188, 6) | 0;
                break;
              }

            case 101:
              {
                e = S(e + -2 | 0, 200, 3) | 0;
                break;
              }

            default:
              e = 0;
          }

          return e | 0;
        }

        function y(e) {
          e = e | 0;
          var a = 0,
              r = 0,
              i = 0,
              c = 0,
              f = 0;
          c = (t[65] | 0) + 2 | 0;
          t[65] = c;
          r = t[66] | 0;

          while (1) {
            a = c + 2 | 0;
            if (c >>> 0 >= r >>> 0) break;
            i = s[a >> 1] | 0;
            if (!e ? X(i) | 0 : 0) break;

            if (i << 16 >> 16 == 42 ? (s[c + 4 >> 1] | 0) == 47 : 0) {
              f = 8;
              break;
            }

            c = a;
          }

          if ((f | 0) == 8) {
            t[65] = a;
            a = c + 4 | 0;
          }

          t[65] = a;
          return;
        }

        function m(e, a, r) {
          e = e | 0;
          a = a | 0;
          r = r | 0;
          var s = 0,
              t = 0;

          e: do {
            if (!r) e = 0;else {
              while (1) {
                s = i[e >> 0] | 0;
                t = i[a >> 0] | 0;
                if (s << 24 >> 24 != t << 24 >> 24) break;
                r = r + -1 | 0;

                if (!r) {
                  e = 0;
                  break e;
                } else {
                  e = e + 1 | 0;
                  a = a + 1 | 0;
                }
              }

              e = (s & 255) - (t & 255) | 0;
            }
          } while (0);

          return e | 0;
        }

        function I(e) {
          e = e | 0;

          e: do {
            switch (e << 16 >> 16) {
              case 38:
              case 37:
              case 33:
                {
                  e = 1;
                  break;
                }

              default:
                if ((e & -8) << 16 >> 16 == 40 | (e + -58 & 65535) < 6) e = 1;else {
                  switch (e << 16 >> 16) {
                    case 91:
                    case 93:
                    case 94:
                      {
                        e = 1;
                        break e;
                      }

                    default:
                      {}
                  }

                  e = (e + -123 & 65535) < 4;
                }
            }
          } while (0);

          return e | 0;
        }

        function U(e) {
          e = e | 0;

          e: do {
            switch (e << 16 >> 16) {
              case 38:
              case 37:
              case 33:
                break;

              default:
                if (!((e + -58 & 65535) < 6 | (e + -40 & 65535) < 7 & e << 16 >> 16 != 41)) {
                  switch (e << 16 >> 16) {
                    case 91:
                    case 94:
                      break e;

                    default:
                      {}
                  }

                  return e << 16 >> 16 != 125 & (e + -123 & 65535) < 4 | 0;
                }

            }
          } while (0);

          return 1;
        }

        function x(e) {
          e = e | 0;
          var a = 0,
              r = 0,
              i = 0,
              c = 0;
          r = n;
          n = n + 16 | 0;
          i = r;
          t[i >> 2] = 0;
          t[59] = e;
          a = t[3] | 0;
          c = a + (e << 1) | 0;
          e = c + 2 | 0;
          s[c >> 1] = 0;
          t[i >> 2] = e;
          t[60] = e;
          t[52] = 0;
          t[56] = 0;
          t[54] = 0;
          t[53] = 0;
          t[58] = 0;
          t[55] = 0;
          n = r;
          return a | 0;
        }

        function S(e, a, r) {
          e = e | 0;
          a = a | 0;
          r = r | 0;
          var i = 0,
              c = 0;
          i = e + (0 - r << 1) | 0;
          c = i + 2 | 0;
          e = t[3] | 0;
          if (c >>> 0 >= e >>> 0 ? (m(c, a, r << 1) | 0) == 0 : 0) {
            if ((c | 0) == (e | 0)) e = 1;else e = B(s[i >> 1] | 0) | 0;
          } else e = 0;
          return e | 0;
        }

        function O(e, a, r, i) {
          e = e | 0;
          a = a | 0;
          r = r | 0;
          i = i | 0;
          var s = 0,
              c = 0;
          s = t[60] | 0;
          t[60] = s + 20;
          c = t[58] | 0;
          t[((c | 0) == 0 ? 212 : c + 16 | 0) >> 2] = s;
          t[58] = s;
          t[s >> 2] = e;
          t[s + 4 >> 2] = a;
          t[s + 8 >> 2] = r;
          t[s + 12 >> 2] = i;
          t[s + 16 >> 2] = 0;
          return;
        }

        function $(e) {
          e = e | 0;

          switch (s[e >> 1] | 0) {
            case 107:
              {
                e = S(e + -2 | 0, 114, 4) | 0;
                break;
              }

            case 101:
              {
                if ((s[e + -2 >> 1] | 0) == 117) e = S(e + -4 | 0, 86, 6) | 0;else e = 0;
                break;
              }

            default:
              e = 0;
          }

          return e | 0;
        }

        function j(e, a) {
          e = e | 0;
          a = a | 0;
          var r = 0;
          r = t[3] | 0;
          if (r >>> 0 <= e >>> 0 ? (s[e >> 1] | 0) == a << 16 >> 16 : 0) {
            if ((r | 0) == (e | 0)) r = 1;else r = B(s[e + -2 >> 1] | 0) | 0;
          } else r = 0;
          return r | 0;
        }

        function B(e) {
          e = e | 0;

          e: do {
            if ((e + -9 & 65535) < 5) e = 1;else {
              switch (e << 16 >> 16) {
                case 32:
                case 160:
                  {
                    e = 1;
                    break e;
                  }

                default:
                  {}
              }

              e = e << 16 >> 16 != 46 & (I(e) | 0);
            }
          } while (0);

          return e | 0;
        }

        function E() {
          var e = 0,
              a = 0,
              r = 0;
          e = t[66] | 0;
          r = t[65] | 0;

          e: while (1) {
            a = r + 2 | 0;
            if (r >>> 0 >= e >>> 0) break;

            switch (s[a >> 1] | 0) {
              case 13:
              case 10:
                break e;

              default:
                r = a;
            }
          }

          t[65] = a;
          return;
        }

        function P(e) {
          e = e | 0;

          while (1) {
            if (R(e) | 0) break;
            if (I(e) | 0) break;
            e = (t[65] | 0) + 2 | 0;
            t[65] = e;
            e = s[e >> 1] | 0;

            if (!(e << 16 >> 16)) {
              e = 0;
              break;
            }
          }

          return e | 0;
        }

        function q() {
          var e = 0;
          e = t[(t[54] | 0) + 20 >> 2] | 0;

          switch (e | 0) {
            case 1:
              {
                e = -1;
                break;
              }

            case 2:
              {
                e = -2;
                break;
              }

            default:
              e = e - (t[3] | 0) >> 1;
          }

          return e | 0;
        }

        function z(e) {
          e = e | 0;
          if (!(S(e, 160, 5) | 0) ? !(S(e, 170, 3) | 0) : 0) e = S(e, 176, 2) | 0;else e = 1;
          return e | 0;
        }

        function D(e) {
          e = e | 0;

          switch (e << 16 >> 16) {
            case 160:
            case 32:
            case 12:
            case 11:
            case 9:
              {
                e = 1;
                break;
              }

            default:
              e = 0;
          }

          return e | 0;
        }

        function F(e) {
          e = e | 0;
          if ((t[3] | 0) == (e | 0)) e = 1;else e = B(s[e + -2 >> 1] | 0) | 0;
          return e | 0;
        }

        function G() {
          var e = 0;
          e = t[(t[55] | 0) + 12 >> 2] | 0;
          if (!e) e = -1;else e = e - (t[3] | 0) >> 1;
          return e | 0;
        }

        function H() {
          var e = 0;
          e = t[(t[54] | 0) + 12 >> 2] | 0;
          if (!e) e = -1;else e = e - (t[3] | 0) >> 1;
          return e | 0;
        }

        function J() {
          var e = 0;
          e = t[(t[55] | 0) + 8 >> 2] | 0;
          if (!e) e = -1;else e = e - (t[3] | 0) >> 1;
          return e | 0;
        }

        function K() {
          var e = 0;
          e = t[(t[54] | 0) + 16 >> 2] | 0;
          if (!e) e = -1;else e = e - (t[3] | 0) >> 1;
          return e | 0;
        }

        function L() {
          var e = 0;
          e = t[(t[54] | 0) + 4 >> 2] | 0;
          if (!e) e = -1;else e = e - (t[3] | 0) >> 1;
          return e | 0;
        }

        function M() {
          var e = 0;
          e = t[54] | 0;
          e = t[((e | 0) == 0 ? 208 : e + 28 | 0) >> 2] | 0;
          t[54] = e;
          return (e | 0) != 0 | 0;
        }

        function N() {
          var e = 0;
          e = t[55] | 0;
          e = t[((e | 0) == 0 ? 212 : e + 16 | 0) >> 2] | 0;
          t[55] = e;
          return (e | 0) != 0 | 0;
        }

        function Q() {
          i[774] = 1;
          t[61] = (t[65] | 0) - (t[3] | 0) >> 1;
          t[65] = (t[66] | 0) + 2;
          return;
        }

        function R(e) {
          e = e | 0;
          return (e | 128) << 16 >> 16 == 160 | (e + -9 & 65535) < 5 | 0;
        }

        function T(e) {
          e = e | 0;
          return e << 16 >> 16 == 39 | e << 16 >> 16 == 34 | 0;
        }

        function V() {
          return (t[(t[54] | 0) + 8 >> 2] | 0) - (t[3] | 0) >> 1 | 0;
        }

        function W() {
          return (t[(t[55] | 0) + 4 >> 2] | 0) - (t[3] | 0) >> 1 | 0;
        }

        function X(e) {
          e = e | 0;
          return e << 16 >> 16 == 13 | e << 16 >> 16 == 10 | 0;
        }

        function Y() {
          return (t[t[54] >> 2] | 0) - (t[3] | 0) >> 1 | 0;
        }

        function Z() {
          return (t[t[55] >> 2] | 0) - (t[3] | 0) >> 1 | 0;
        }

        function _() {
          return c[(t[54] | 0) + 24 >> 0] | 0 | 0;
        }

        function ee(e) {
          e = e | 0;
          t[3] = e;
          return;
        }

        function ae() {
          return (i[775] | 0) != 0 | 0;
        }

        function re() {
          return t[61] | 0;
        }

        function ie(e) {
          e = e | 0;
          n = e + 992 + 15 & -16;
          return 992;
        }

        return {
          su: ie,
          ai: K,
          e: re,
          ee: W,
          ele: G,
          els: J,
          es: Z,
          f: ae,
          id: q,
          ie: L,
          ip: _,
          is: Y,
          p: b,
          re: N,
          ri: M,
          sa: x,
          se: H,
          ses: ee,
          ss: V
        };
      }("undefined" != typeof self ? self : commonjsGlobal, {}, a), r = e.su(i - (2 << 17));
    }

    const h = c$1.length + 1;
    e.ses(r), e.sa(h - 1), s(c$1, new Uint16Array(a, r, h)), e.p() || (n = e.e(), o());
    const w = [],
          d = [];

    for (; e.ri();) {
      const a = e.is(),
            r = e.ie(),
            i = e.ai(),
            s = e.id(),
            t = e.ss(),
            f = e.se();
      let n;
      e.ip() && (n = b(-1 === s ? a : a + 1, c$1.charCodeAt(-1 === s ? a - 1 : a))), w.push({
        n: n,
        s: a,
        e: r,
        ss: t,
        se: f,
        d: s,
        a: i
      });
    }

    for (; e.re();) {
      const a = e.es(),
            r = e.ee(),
            i = e.els(),
            s = e.ele(),
            t = c$1.charCodeAt(a),
            f = i >= 0 ? c$1.charCodeAt(i) : -1;
      d.push({
        s: a,
        e: r,
        ls: i,
        le: s,
        n: 34 === t || 39 === t ? b(a + 1, t) : c$1.slice(a, r),
        ln: i < 0 ? void 0 : 34 === f || 39 === f ? b(i + 1, f) : c$1.slice(i, s)
      });
    }

    return [w, d, !!e.f()];
  }

  function b(e, a) {
    n = e;
    let r = "",
        i = n;

    for (;;) {
      n >= c$1.length && o();
      const e = c$1.charCodeAt(n);
      if (e === a) break;
      92 === e ? (r += c$1.slice(i, n), r += l(), i = n) : (8232 === e || 8233 === e || u(e) && o(), ++n);
    }

    return r += c$1.slice(i, n++), r;
  }

  function l() {
    let e = c$1.charCodeAt(++n);

    switch (++n, e) {
      case 110:
        return "\n";

      case 114:
        return "\r";

      case 120:
        return String.fromCharCode(k(2));

      case 117:
        return function () {
          let e;
          123 === c$1.charCodeAt(n) ? (++n, e = k(c$1.indexOf("}", n) - n), ++n, e > 1114111 && o()) : e = k(4);
          return e <= 65535 ? String.fromCharCode(e) : (e -= 65536, String.fromCharCode(55296 + (e >> 10), 56320 + (1023 & e)));
        }();

      case 116:
        return "\t";

      case 98:
        return "\b";

      case 118:
        return "\v";

      case 102:
        return "\f";

      case 13:
        10 === c$1.charCodeAt(n) && ++n;

      case 10:
        return "";

      case 56:
      case 57:
        o();

      default:
        if (e >= 48 && e <= 55) {
          let a = c$1.substr(n - 1, 3).match(/^[0-7]+/)[0],
              r = parseInt(a, 8);
          return r > 255 && (a = a.slice(0, -1), r = parseInt(a, 8)), n += a.length - 1, e = c$1.charCodeAt(n), "0" === a && 56 !== e && 57 !== e || o(), String.fromCharCode(r);
        }

        return u(e) ? "" : String.fromCharCode(e);
    }
  }

  function k(e) {
    const a = n;
    let r = 0,
        i = 0;

    for (let a = 0; a < e; ++a, ++n) {
      let e,
          s = c$1.charCodeAt(n);

      if (95 !== s) {
        if (s >= 97) e = s - 97 + 10;else if (s >= 65) e = s - 65 + 10;else {
          if (!(s >= 48 && s <= 57)) break;
          e = s - 48;
        }
        if (e >= 16) break;
        i = s, r = 16 * r + e;
      } else 95 !== i && 0 !== a || o(), i = s;
    }

    return 95 !== i && n - a === e || o(), r;
  }

  function u(e) {
    return 13 === e || 10 === e;
  }

  function o() {
    throw Object.assign(Error(`Parse error ${f}:${c$1.slice(0, n).split("\n").length}:${n - c$1.lastIndexOf("\n", n - 1)}`), {
      idx: n
    });
  }

  async function _resolve(id, parentUrl) {
    const urlResolved = resolveIfNotPlainOrUrl(id, parentUrl);
    return {
      r: resolveImportMap(importMap, urlResolved || id, parentUrl) || throwUnresolved(id, parentUrl),
      // b = bare specifier
      b: !urlResolved && !isURL(id)
    };
  }

  const resolve = resolveHook ? async (id, parentUrl) => {
    let result = resolveHook(id, parentUrl, defaultResolve); // will be deprecated in next major

    if (result && result.then) result = await result;
    return result ? {
      r: result,
      b: !resolveIfNotPlainOrUrl(id, parentUrl) && !isURL(id)
    } : _resolve(id, parentUrl);
  } : _resolve; // importShim('mod');
  // importShim('mod', { opts });
  // importShim('mod', { opts }, parentUrl);
  // importShim('mod', parentUrl);

  async function importShim(id, ...args) {
    // parentUrl if present will be the last argument
    let parentUrl = args[args.length - 1];
    if (typeof parentUrl !== 'string') parentUrl = baseUrl; // needed for shim check

    await initPromise;
    if (importHook) await importHook(id, typeof args[1] !== 'string' ? args[1] : {}, parentUrl);

    if (acceptingImportMaps || shimMode || !baselinePassthrough) {
      if (hasDocument) processScriptsAndPreloads(true);
      if (!shimMode) acceptingImportMaps = false;
    }

    await importMapPromise;
    return topLevelLoad((await resolve(id, parentUrl)).r, {
      credentials: 'same-origin'
    });
  }

  self.importShim = importShim;

  function defaultResolve(id, parentUrl) {
    return resolveImportMap(importMap, resolveIfNotPlainOrUrl(id, parentUrl) || id, parentUrl) || throwUnresolved(id, parentUrl);
  }

  function throwUnresolved(id, parentUrl) {
    throw Error(`Unable to resolve specifier '${id}'${fromParent(parentUrl)}`);
  }

  const resolveSync = (id, parentUrl = baseUrl) => {
    parentUrl = `${parentUrl}`;
    const result = resolveHook && resolveHook(id, parentUrl, defaultResolve);
    return result && !result.then ? result : defaultResolve(id, parentUrl);
  };

  function metaResolve(id, parentUrl = this.url) {
    return resolveSync(id, parentUrl);
  }

  importShim.resolve = resolveSync;

  importShim.getImportMap = () => JSON.parse(JSON.stringify(importMap));

  importShim.addImportMap = importMapIn => {
    if (!shimMode) throw new Error('Unsupported in polyfill mode.');
    importMap = resolveAndComposeImportMap(importMapIn, baseUrl, importMap);
  };

  const registry = importShim._r = {};

  async function loadAll(load, seen) {
    if (load.b || seen[load.u]) return;
    seen[load.u] = 1;
    await load.L;
    await Promise.all(load.d.map(dep => loadAll(dep, seen)));
    if (!load.n) load.n = load.d.some(dep => dep.n);
  }

  let importMap = {
    imports: {},
    scopes: {}
  };
  let baselinePassthrough;
  const initPromise = featureDetectionPromise.then(() => {
    baselinePassthrough = esmsInitOptions.polyfillEnable !== true && supportsDynamicImport && supportsImportMeta && supportsImportMaps && (!jsonModulesEnabled || supportsJsonAssertions) && (!cssModulesEnabled || supportsCssAssertions) && !importMapSrcOrLazy && !false;

    if (hasDocument) {
      if (!supportsImportMaps) {
        const supports = HTMLScriptElement.supports || (type => type === 'classic' || type === 'module');

        HTMLScriptElement.supports = type => type === 'importmap' || supports(type);
      }

      if (shimMode || !baselinePassthrough) {
        new MutationObserver(mutations => {
          for (const mutation of mutations) {
            if (mutation.type !== 'childList') continue;

            for (const node of mutation.addedNodes) {
              if (node.tagName === 'SCRIPT') {
                if (node.type === (shimMode ? 'module-shim' : 'module')) processScript(node, true);
                if (node.type === (shimMode ? 'importmap-shim' : 'importmap')) processImportMap(node, true);
              } else if (node.tagName === 'LINK' && node.rel === (shimMode ? 'modulepreload-shim' : 'modulepreload')) {
                processPreload(node);
              }
            }
          }
        }).observe(document, {
          childList: true,
          subtree: true
        });
        processScriptsAndPreloads();

        if (document.readyState === 'complete') {
          readyStateCompleteCheck();
        } else {
          async function readyListener() {
            await initPromise;
            processScriptsAndPreloads();

            if (document.readyState === 'complete') {
              readyStateCompleteCheck();
              document.removeEventListener('readystatechange', readyListener);
            }
          }

          document.addEventListener('readystatechange', readyListener);
        }
      }
    }

    return undefined;
  });
  let importMapPromise = initPromise;
  let firstPolyfillLoad = true;
  let acceptingImportMaps = true;

  async function topLevelLoad(url, fetchOpts, source, nativelyLoaded, lastStaticLoadPromise) {
    if (!shimMode) acceptingImportMaps = false;
    await initPromise;
    await importMapPromise;
    if (importHook) await importHook(url, typeof fetchOpts !== 'string' ? fetchOpts : {}, ''); // early analysis opt-out - no need to even fetch if we have feature support

    if (!shimMode && baselinePassthrough) {
      // for polyfill case, only dynamic import needs a return value here, and dynamic import will never pass nativelyLoaded
      if (nativelyLoaded) return null;
      await lastStaticLoadPromise;
      return dynamicImport(source ? createBlob(source) : url, {
        errUrl: url || source
      });
    }

    const load = getOrCreateLoad(url, fetchOpts, null, source);
    const seen = {};
    await loadAll(load, seen);
    lastLoad = undefined;
    resolveDeps(load, seen);
    await lastStaticLoadPromise;

    if (source && !shimMode && !load.n && !false) {
      const module = await dynamicImport(createBlob(source), {
        errUrl: source
      });
      if (revokeBlobURLs) revokeObjectURLs(Object.keys(seen));
      return module;
    }

    if (firstPolyfillLoad && !shimMode && load.n && nativelyLoaded) {
      onpolyfill();
      firstPolyfillLoad = false;
    }

    const module = await dynamicImport(!shimMode && !load.n && nativelyLoaded ? load.u : load.b, {
      errUrl: load.u
    }); // if the top-level load is a shell, run its update function

    if (load.s) (await dynamicImport(load.s)).u$_(module);
    if (revokeBlobURLs) revokeObjectURLs(Object.keys(seen)); // when tla is supported, this should return the tla promise as an actual handle
    // so readystate can still correspond to the sync subgraph exec completions

    return module;
  }

  function revokeObjectURLs(registryKeys) {
    let batch = 0;
    const keysLength = registryKeys.length;
    const schedule = self.requestIdleCallback ? self.requestIdleCallback : self.requestAnimationFrame;
    schedule(cleanup);

    function cleanup() {
      const batchStartIndex = batch * 100;
      if (batchStartIndex > keysLength) return;

      for (const key of registryKeys.slice(batchStartIndex, batchStartIndex + 100)) {
        const load = registry[key];
        if (load) URL.revokeObjectURL(load.b);
      }

      batch++;
      schedule(cleanup);
    }
  }

  function urlJsString(url) {
    return `'${url.replace(/'/g, "\\'")}'`;
  }

  let lastLoad;

  function resolveDeps(load, seen) {
    if (load.b || !seen[load.u]) return;
    seen[load.u] = 0;

    for (const dep of load.d) resolveDeps(dep, seen);

    const [imports, exports] = load.a; // "execution"

    const source = load.S; // edge doesnt execute sibling in order, so we fix this up by ensuring all previous executions are explicit dependencies

    let resolvedSource = edge && lastLoad ? `import '${lastLoad}';` : '';

    if (!imports.length) {
      resolvedSource += source;
    } else {
      // once all deps have loaded we can inline the dependency resolution blobs
      // and define this blob
      let lastIndex = 0,
          depIndex = 0,
          dynamicImportEndStack = [];

      function pushStringTo(originalIndex) {
        while (dynamicImportEndStack[dynamicImportEndStack.length - 1] < originalIndex) {
          const dynamicImportEnd = dynamicImportEndStack.pop();
          resolvedSource += `${source.slice(lastIndex, dynamicImportEnd)}, ${urlJsString(load.r)}`;
          lastIndex = dynamicImportEnd;
        }

        resolvedSource += source.slice(lastIndex, originalIndex);
        lastIndex = originalIndex;
      }

      for (const {
        s: start,
        ss: statementStart,
        se: statementEnd,
        d: dynamicImportIndex
      } of imports) {
        // dependency source replacements
        if (dynamicImportIndex === -1) {
          let depLoad = load.d[depIndex++],
              blobUrl = depLoad.b,
              cycleShell = !blobUrl;

          if (cycleShell) {
            // circular shell creation
            if (!(blobUrl = depLoad.s)) {
              blobUrl = depLoad.s = createBlob(`export function u$_(m){${depLoad.a[1].map(({
                s,
                e
              }, i) => {
                const q = depLoad.S[s] === '"' || depLoad.S[s] === "'";
                return `e$_${i}=m${q ? `[` : '.'}${depLoad.S.slice(s, e)}${q ? `]` : ''}`;
              }).join(',')}}${depLoad.a[1].length ? `let ${depLoad.a[1].map((_, i) => `e$_${i}`).join(',')};` : ''}export {${depLoad.a[1].map(({
                s,
                e
              }, i) => `e$_${i} as ${depLoad.S.slice(s, e)}`).join(',')}}\n//# sourceURL=${depLoad.r}?cycle`);
            }
          }

          pushStringTo(start - 1);
          resolvedSource += `/*${source.slice(start - 1, statementEnd)}*/${urlJsString(blobUrl)}`; // circular shell execution

          if (!cycleShell && depLoad.s) {
            resolvedSource += `;import*as m$_${depIndex} from'${depLoad.b}';import{u$_ as u$_${depIndex}}from'${depLoad.s}';u$_${depIndex}(m$_${depIndex})`;
            depLoad.s = undefined;
          }

          lastIndex = statementEnd;
        } // import.meta
        else if (dynamicImportIndex === -2) {
          load.m = {
            url: load.r,
            resolve: metaResolve
          };
          metaHook(load.m, load.u);
          pushStringTo(start);
          resolvedSource += `importShim._r[${urlJsString(load.u)}].m`;
          lastIndex = statementEnd;
        } // dynamic import
        else {
          pushStringTo(statementStart + 6);
          resolvedSource += `Shim(`;
          dynamicImportEndStack.push(statementEnd - 1);
          lastIndex = start;
        }
      } // support progressive cycle binding updates


      if (load.s) resolvedSource += `\n;import{u$_}from'${load.s}';u$_({ ${exports.filter(e => e.ln).map(({
        s,
        e,
        ln
      }) => `${source.slice(s, e)}: ${ln}`).join(',')} });\n`;
      pushStringTo(source.length);
    }

    let hasSourceURL = false;
    resolvedSource = resolvedSource.replace(sourceMapURLRegEx, (match, isMapping, url) => (hasSourceURL = !isMapping, match.replace(url, () => new URL(url, load.r))));
    if (!hasSourceURL) resolvedSource += '\n//# sourceURL=' + load.r;
    load.b = lastLoad = createBlob(resolvedSource);
    load.S = undefined;
  } // ; and // trailer support added for Ruby on Rails 7 source maps compatibility
  // https://github.com/guybedford/es-module-shims/issues/228


  const sourceMapURLRegEx = /\n\/\/# source(Mapping)?URL=([^\n]+)\s*((;|\/\/[^#][^\n]*)\s*)*$/;
  const jsContentType = /^(text|application)\/(x-)?javascript(;|$)/;
  const jsonContentType = /^(text|application)\/json(;|$)/;
  const cssContentType = /^(text|application)\/css(;|$)/;
  const cssUrlRegEx = /url\(\s*(?:(["'])((?:\\.|[^\n\\"'])+)\1|((?:\\.|[^\s,"'()\\])+))\s*\)/g; // restrict in-flight fetches to a pool of 100

  let p = [];
  let c = 0;

  function pushFetchPool() {
    if (++c > 100) return new Promise(r => p.push(r));
  }

  function popFetchPool() {
    c--;
    if (p.length) p.shift()();
  }

  async function doFetch(url, fetchOpts, parent) {
    if (enforceIntegrity && !fetchOpts.integrity) throw Error(`No integrity for ${url}${fromParent(parent)}.`);
    const poolQueue = pushFetchPool();
    if (poolQueue) await poolQueue;

    try {
      var res = await fetchHook(url, fetchOpts);
    } catch (e) {
      e.message = `Unable to fetch ${url}${fromParent(parent)} - see network log for details.\n` + e.message;
      throw e;
    } finally {
      popFetchPool();
    }

    if (!res.ok) throw Error(`${res.status} ${res.statusText} ${res.url}${fromParent(parent)}`);
    return res;
  }

  async function fetchModule(url, fetchOpts, parent) {
    const res = await doFetch(url, fetchOpts, parent);
    const contentType = res.headers.get('content-type');
    if (jsContentType.test(contentType)) return {
      r: res.url,
      s: await res.text(),
      t: 'js'
    };else if (jsonContentType.test(contentType)) return {
      r: res.url,
      s: `export default ${await res.text()}`,
      t: 'json'
    };else if (cssContentType.test(contentType)) {
      return {
        r: res.url,
        s: `var s=new CSSStyleSheet();s.replaceSync(${JSON.stringify((await res.text()).replace(cssUrlRegEx, (_match, quotes = '', relUrl1, relUrl2) => `url(${quotes}${resolveUrl(relUrl1 || relUrl2, url)}${quotes})`))});export default s;`,
        t: 'css'
      };
    } else throw Error(`Unsupported Content-Type "${contentType}" loading ${url}${fromParent(parent)}. Modules must be served with a valid MIME type like application/javascript.`);
  }

  function getOrCreateLoad(url, fetchOpts, parent, source) {
    let load = registry[url];
    if (load && !source) return load;
    load = {
      // url
      u: url,
      // response url
      r: source ? url : undefined,
      // fetchPromise
      f: undefined,
      // source
      S: undefined,
      // linkPromise
      L: undefined,
      // analysis
      a: undefined,
      // deps
      d: undefined,
      // blobUrl
      b: undefined,
      // shellUrl
      s: undefined,
      // needsShim
      n: false,
      // type
      t: null,
      // meta
      m: null
    };

    if (registry[url]) {
      let i = 0;

      while (registry[load.u + ++i]);

      load.u += i;
    }

    registry[load.u] = load;

    load.f = (async () => {
      if (!source) {
        // preload fetch options override fetch options (race)
        let t;
        ({
          r: load.r,
          s: source,
          t
        } = await (fetchCache[url] || fetchModule(url, fetchOpts, parent)));

        if (t && !shimMode) {
          if (t === 'css' && !cssModulesEnabled || t === 'json' && !jsonModulesEnabled) throw Error(`${t}-modules require <script type="esms-options">{ "polyfillEnable": ["${t}-modules"] }<${''}/script>`);
          if (t === 'css' && !supportsCssAssertions || t === 'json' && !supportsJsonAssertions) load.n = true;
        }
      }

      try {
        load.a = parse(source, load.u);
      } catch (e) {
        throwError(e);
        load.a = [[], [], false];
      }

      load.S = source;
      return load;
    })();

    load.L = load.f.then(async () => {
      let childFetchOpts = fetchOpts;
      load.d = (await Promise.all(load.a[0].map(async ({
        n,
        d
      }) => {
        if (d >= 0 && !supportsDynamicImport || d === -2 && !supportsImportMeta) load.n = true;
        if (d !== -1 || !n) return;
        const {
          r,
          b
        } = await resolve(n, load.r || load.u);
        if (b && (!supportsImportMaps || importMapSrcOrLazy)) load.n = true;
        if (skip && skip.test(r)) return {
          b: r
        };
        if (childFetchOpts.integrity) childFetchOpts = Object.assign({}, childFetchOpts, {
          integrity: undefined
        });
        return getOrCreateLoad(r, childFetchOpts, load.r).f;
      }))).filter(l => l);
    });
    return load;
  }

  function processScriptsAndPreloads(mapsOnly = false) {
    if (!mapsOnly) for (const link of document.querySelectorAll(shimMode ? 'link[rel=modulepreload-shim]' : 'link[rel=modulepreload]')) processPreload(link);

    for (const script of document.querySelectorAll(shimMode ? 'script[type=importmap-shim]' : 'script[type=importmap]')) processImportMap(script);

    if (!mapsOnly) for (const script of document.querySelectorAll(shimMode ? 'script[type=module-shim]' : 'script[type=module]')) processScript(script);
  }

  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity) fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy) fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === 'use-credentials') fetchOpts.credentials = 'include';else if (script.crossorigin === 'anonymous') fetchOpts.credentials = 'omit';else fetchOpts.credentials = 'same-origin';
    return fetchOpts;
  }

  let lastStaticLoadPromise = Promise.resolve();
  let domContentLoadedCnt = 1;

  function domContentLoadedCheck() {
    if (--domContentLoadedCnt === 0 && !noLoadEventRetriggers) document.dispatchEvent(new Event('DOMContentLoaded'));
  } // this should always trigger because we assume es-module-shims is itself a domcontentloaded requirement


  if (hasDocument) {
    document.addEventListener('DOMContentLoaded', async () => {
      await initPromise;
      if (shimMode || !baselinePassthrough) domContentLoadedCheck();
    });
  }

  let readyStateCompleteCnt = 1;

  function readyStateCompleteCheck() {
    if (--readyStateCompleteCnt === 0 && !noLoadEventRetriggers) document.dispatchEvent(new Event('readystatechange'));
  }

  const hasNext = script => script.nextSibling || script.parentNode && hasNext(script.parentNode);

  const epCheck = (script, ready) => script.ep || !ready && (!script.src && !script.innerHTML || !hasNext(script)) || script.getAttribute('noshim') !== null || !(script.ep = true);

  function processImportMap(script, ready = readyStateCompleteCnt > 0) {
    if (epCheck(script, ready)) return; // we dont currently support multiple, external or dynamic imports maps in polyfill mode to match native

    if (script.src) {
      if (!shimMode) return;
      setImportMapSrcOrLazy();
    }

    if (acceptingImportMaps) {
      importMapPromise = importMapPromise.then(async () => {
        importMap = resolveAndComposeImportMap(script.src ? await (await doFetch(script.src, getFetchOpts(script))).json() : JSON.parse(script.innerHTML), script.src || baseUrl, importMap);
      }).catch(e => {
        console.log(e);
        if (e instanceof SyntaxError) e = new Error(`Unable to parse import map ${e.message} in: ${script.src || script.innerHTML}`);
        throwError(e);
      });
      if (!shimMode) acceptingImportMaps = false;
    }
  }

  function processScript(script, ready = readyStateCompleteCnt > 0) {
    if (epCheck(script, ready)) return; // does this load block readystate complete

    const isBlockingReadyScript = script.getAttribute('async') === null && readyStateCompleteCnt > 0; // does this load block DOMContentLoaded

    const isDomContentLoadedScript = domContentLoadedCnt > 0;
    if (isBlockingReadyScript) readyStateCompleteCnt++;
    if (isDomContentLoadedScript) domContentLoadedCnt++;
    const loadPromise = topLevelLoad(script.src || baseUrl, getFetchOpts(script), !script.src && script.innerHTML, !shimMode, isBlockingReadyScript && lastStaticLoadPromise).catch(throwError);
    if (isBlockingReadyScript) lastStaticLoadPromise = loadPromise.then(readyStateCompleteCheck);
    if (isDomContentLoadedScript) loadPromise.then(domContentLoadedCheck);
  }

  const fetchCache = {};

  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    if (fetchCache[link.href]) return;
    fetchCache[link.href] = fetchModule(link.href, getFetchOpts(link));
  }
})();

var esModuleShims = {};

export default esModuleShims;
