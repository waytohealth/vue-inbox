'use strict';function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }
        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);
          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }
          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }
      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return ContinueSentinel;
    }
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}var dayjs_min = createCommonjsModule(function (module, exports) {
!function(t,e){module.exports=e();}(commonjsGlobal,(function(){var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return +(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return {M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},v="en",D={};D[v]=M;var p=function(t){return t instanceof _},S=function t(e,n,r){var i;if(!e)return v;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else {var a=e.name;D[a]=e,i=a;}return !r&&i&&(v=i),i||!r&&v},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t);}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init();},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},m.$utils=function(){return O},m.isValid=function(){return !(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var v=this.$locale().weekStart||0,D=(y<v?y+7:y)-v;return $(r?m-D:m+(6-D),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d;}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,v=O.m(this,M);return v=(l={},l[c]=v/12,l[f]=v,l[h]=v/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?v:O.a(v)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),T=_.prototype;return w.prototype=T,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){T[t[1]]=function(e){return this.$g(e,t[0],t[1])};})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=D[v],w.Ls=D,w.p={},w}));
});

var dayjs = dayjs_min;var utc = createCommonjsModule(function (module, exports) {
!function(t,i){module.exports=i();}(commonjsGlobal,(function(){var t="minute",i=/[+-]\d\d(?::?\d\d)?/g,e=/([+-]|\d\d)/g;return function(s,f,n){var u=f.prototype;n.utc=function(t){var i={date:t,utc:!0,args:arguments};return new f(i)},u.utc=function(i){var e=n(this.toDate(),{locale:this.$L,utc:!0});return i?e.add(this.utcOffset(),t):e},u.local=function(){return n(this.toDate(),{locale:this.$L,utc:!1})};var o=u.parse;u.parse=function(t){t.utc&&(this.$u=!0),this.$utils().u(t.$offset)||(this.$offset=t.$offset),o.call(this,t);};var r=u.init;u.init=function(){if(this.$u){var t=this.$d;this.$y=t.getUTCFullYear(),this.$M=t.getUTCMonth(),this.$D=t.getUTCDate(),this.$W=t.getUTCDay(),this.$H=t.getUTCHours(),this.$m=t.getUTCMinutes(),this.$s=t.getUTCSeconds(),this.$ms=t.getUTCMilliseconds();}else r.call(this);};var a=u.utcOffset;u.utcOffset=function(s,f){var n=this.$utils().u;if(n(s))return this.$u?0:n(this.$offset)?a.call(this):this.$offset;if("string"==typeof s&&(s=function(t){void 0===t&&(t="");var s=t.match(i);if(!s)return null;var f=(""+s[0]).match(e)||["-",0,0],n=f[0],u=60*+f[1]+ +f[2];return 0===u?0:"+"===n?u:-u}(s),null===s))return this;var u=Math.abs(s)<=16?60*s:s,o=this;if(f)return o.$offset=u,o.$u=0===s,o;if(0!==s){var r=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(o=this.local().add(u+r,t)).$offset=u,o.$x.$localOffset=r;}else o=this.utc();return o};var h=u.format;u.format=function(t){var i=t||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return h.call(this,i)},u.valueOf=function(){var t=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*t},u.isUTC=function(){return !!this.$u},u.toISOString=function(){return this.toDate().toISOString()},u.toString=function(){return this.toDate().toUTCString()};var l=u.toDate;u.toDate=function(t){return "s"===t&&this.$offset?n(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():l.call(this)};var c=u.diff;u.diff=function(t,i,e){if(t&&this.$u===t.$u)return c.call(this,t,i,e);var s=this.local(),f=n(t).local();return c.call(s,f,i,e)};}}));
});var timezone = createCommonjsModule(function (module, exports) {
!function(t,e){module.exports=e();}(commonjsGlobal,(function(){var t={year:0,month:1,day:2,hour:3,minute:4,second:5},e={};return function(n,i,o){var r,a=function(t,n,i){void 0===i&&(i={});var o=new Date(t),r=function(t,n){void 0===n&&(n={});var i=n.timeZoneName||"short",o=t+"|"+i,r=e[o];return r||(r=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:i}),e[o]=r),r}(n,i);return r.formatToParts(o)},u=function(e,n){for(var i=a(e,n),r=[],u=0;u<i.length;u+=1){var f=i[u],s=f.type,m=f.value,c=t[s];c>=0&&(r[c]=parseInt(m,10));}var d=r[3],l=24===d?0:d,v=r[0]+"-"+r[1]+"-"+r[2]+" "+l+":"+r[4]+":"+r[5]+":000",h=+e;return (o.utc(v).valueOf()-(h-=h%1e3))/6e4},f=i.prototype;f.tz=function(t,e){void 0===t&&(t=r);var n=this.utcOffset(),i=this.toDate(),a=i.toLocaleString("en-US",{timeZone:t}),u=Math.round((i-new Date(a))/1e3/60),f=o(a).$set("millisecond",this.$ms).utcOffset(15*-Math.round(i.getTimezoneOffset()/15)-u,!0);if(e){var s=f.utcOffset();f=f.add(n-s,"minute");}return f.$x.$timezone=t,f},f.offsetName=function(t){var e=this.$x.$timezone||o.tz.guess(),n=a(this.valueOf(),e,{timeZoneName:t}).find((function(t){return "timezonename"===t.type.toLowerCase()}));return n&&n.value};var s=f.startOf;f.startOf=function(t,e){if(!this.$x||!this.$x.$timezone)return s.call(this,t,e);var n=o(this.format("YYYY-MM-DD HH:mm:ss:SSS"));return s.call(n,t,e).tz(this.$x.$timezone,!0)},o.tz=function(t,e,n){var i=n&&e,a=n||e||r,f=u(+o(),a);if("string"!=typeof t)return o(t).tz(a);var s=function(t,e,n){var i=t-60*e*1e3,o=u(i,n);if(e===o)return [i,e];var r=u(i-=60*(o-e)*1e3,n);return o===r?[i,o]:[t-60*Math.min(o,r)*1e3,Math.max(o,r)]}(o.utc(t,i).valueOf(),f,a),m=s[0],c=s[1],d=o(m).utcOffset(c);return d.$x.$timezone=a,d},o.tz.guess=function(){return Intl.DateTimeFormat().resolvedOptions().timeZone},o.tz.setDefault=function(t){r=t;};}}));
});var advancedFormat = createCommonjsModule(function (module, exports) {
!function(e,t){module.exports=t();}(commonjsGlobal,(function(){return function(e,t,r){var n=t.prototype,s=n.format;r.en.ordinal=function(e){var t=["th","st","nd","rd"],r=e%100;return "["+e+(t[(r-20)%10]||t[r]||t[0])+"]"},n.format=function(e){var t=this,r=this.$locale();if(!this.isValid())return s.bind(this)(e);var n=this.$utils(),a=(e||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,(function(e){switch(e){case"Q":return Math.ceil((t.$M+1)/3);case"Do":return r.ordinal(t.$D);case"gggg":return t.weekYear();case"GGGG":return t.isoWeekYear();case"wo":return r.ordinal(t.week(),"W");case"w":case"ww":return n.s(t.week(),"w"===e?1:2,"0");case"W":case"WW":return n.s(t.isoWeek(),"W"===e?1:2,"0");case"k":case"kk":return n.s(String(0===t.$H?24:t.$H),"k"===e?1:2,"0");case"X":return Math.floor(t.$d.getTime()/1e3);case"x":return t.$d.getTime();case"z":return "["+t.offsetName()+"]";case"zzz":return "["+t.offsetName("long")+"]";default:return e}}));return s.bind(this)(a)};}}));
});dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
var helper = {
  tz: "America/New_York",
  setTimezone: function setTimezone(tz) {
    this.tz = tz;
  },
  getFriendlyTimezoneName: function getFriendlyTimezoneName() {
    return dayjs().tz(this.tz).format("zzz");
  },
  statusType: function statusType(msg) {
    switch (msg.status) {
      case 'delivered':
      case 'completed':
      case 'received':
        return 'success';
      case 'sent':
        return 'sent';
      case 'failed':
      case 'undelivered':
        return 'failure';
      case 'queued':
      case 'pending':
      case 'unknown':
      case 'accepted':
      case 'in-progress':
      default:
        return 'unknown';
    }
  },
  messageTime: function messageTime(msg) {
    var datetime = msg.sent_at || msg.created_at;
    return dayjs(datetime).tz(this.tz).format('h:mm A');
  },
  messageDate: function messageDate(msg) {
    var datetime = msg.sent_at || msg.created_at;
    return dayjs(datetime).tz(this.tz).format('M/D/YY');
  },
  tooltipTime: function tooltipTime(msg) {
    var datetime = msg.sent_at || msg.created_at;
    return dayjs(datetime).tz(this.tz).format('h:mm:ss A z');
  },
  messageDetailTime: function messageDetailTime(msg) {
    var datetime = msg.sent_at || msg.created_at;
    return dayjs(datetime).tz(this.tz).format('M/D/YY h:mm:ss A z');
  },
  imageDetailTime: function imageDetailTime(msg) {
    var datetime = msg.sent_at || msg.created_at;
    return dayjs(datetime).tz(this.tz).format('dddd, D MMMM YYYY – h:mm:ss A');
  },
  formatDate: function formatDate(date) {
    var applyTz = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (applyTz) {
      return dayjs(date).tz(this.tz).format('~ dddd, D MMMM YYYY ~');
    }
    return dayjs(date).format('~ dddd, D MMMM YYYY ~');
  },
  formatNumber: function formatNumber(number) {
    // +12345678901 -> 234-567-8901
    var cleaned = ('' + number).replace(/\D/g, '');
    var match = cleaned.match(/^\d{1}(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return match[1] + '-' + match[2] + '-' + match[3];
    } else {
      return number;
    }
  },
  messageClasses: function messageClasses(msg, aiSuggestionsEnabled) {
    var classes = [];
    classes.push(msg.direction === 'inbound' ? 'inbound' : 'outbound');
    classes.push(msg.sender ? 'manual' : 'automated');
    if (aiSuggestionsEnabled) {
      classes.push('ai-suggestion-selectable');
    }
    return classes;
  },
  messageStatus: function messageStatus(msg) {
    switch (msg.status) {
      case 'queued':
      case 'accepted':
        return 'Text message queued for delivery';
      case 'delivered':
        return 'Text message delivered to carrier';
      case 'sent':
        return 'Text message sent to carrier';
      case 'failed':
      case 'undelivered':
        return "Text message was not delivered. Error " + msg.error_code + ": " + msg.error_message;
      default:
        return msg.status;
    }
  },
  messageMetadata: function messageMetadata(msg) {
    return msg.metadata.map(function (m) {
      return m.message;
    }).join('; ');
  },
  sortMessages: function sortMessages(messages) {
    return messages.sort(function (a, b) {
      if ((a.sent_at || a.created_at) > (b.sent_at || b.created_at)) {
        return 1;
      } else if ((a.sent_at || a.created_at) < (b.sent_at || b.created_at)) {
        return -1;
      }
      return a.id > b.id ? 1 : -1;
    });
  },
  getIconForStatus: function getIconForStatus(status) {
    switch (status) {
      case "success":
        return {
          icon: 'check-lg',
          variant: 'success',
          scale: "1"
        };
      case "sent":
        return {
          icon: 'arrow-bar-right',
          variant: 'success',
          scale: "1.3"
        };
      case "failure":
        return {
          icon: 'exclamation-triangle-fill',
          variant: 'danger',
          scale: "1"
        };
      case "unknown":
        return {
          icon: 'info-circle-fill',
          variant: 'info',
          scale: "1"
        };
    }
  }
};
var inboxHelper = helper;var relativeTime = createCommonjsModule(function (module, exports) {
!function(r,e){module.exports=e();}(commonjsGlobal,(function(){return function(r,e,t){r=r||{};var n=e.prototype,o={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function i(r,e,t,o){return n.fromToBase(r,e,t,o)}t.en.relativeTime=o,n.fromToBase=function(e,n,i,d,u){for(var f,a,s,l=i.$locale().relativeTime||o,h=r.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],m=h.length,c=0;c<m;c+=1){var y=h[c];y.d&&(f=d?t(e).diff(i,y.d,!0):i.diff(e,y.d,!0));var p=(r.rounding||Math.round)(Math.abs(f));if(s=f>0,p<=y.r||!y.r){p<=1&&c>0&&(y=h[c-1]);var v=l[y.l];u&&(p=u(""+p)),a="string"==typeof v?v.replace("%d",p):v(p,n,y.l,s);break}}if(n)return a;var M=s?l.future:l.past;return "function"==typeof M?M(a):M.replace("%s",a)},n.to=function(r,e){return i(r,e,this,!0)},n.from=function(r,e){return i(r,e,this)};var d=function(r){return r.$u?t.utc():t()};n.toNow=function(r){return this.to(d(this),r)},n.fromNow=function(r){return this.from(d(this),r)};}}));
});dayjs.extend(relativeTime);
var manualModeHelper = {
  session: null,
  conversation: null,
  setCurrentSession: function setCurrentSession(messaging_mode_session) {
    this.session = messaging_mode_session;
  },
  setCurrentConversation: function setCurrentConversation(conversation) {
    this.conversation = conversation;
  },
  get isManualModeActive() {
    var _this$session;
    return ((_this$session = this.session) === null || _this$session === void 0 ? void 0 : _this$session.mode) === 'Manual';
  },
  get isAutomatedModeActive() {
    var _this$session2;
    return ((_this$session2 = this.session) === null || _this$session2 === void 0 ? void 0 : _this$session2.mode) === 'Automated';
  },
  get manualModeExpiration() {
    var _this$session3;
    if (((_this$session3 = this.session) === null || _this$session3 === void 0 ? void 0 : _this$session3.mode) === 'Manual') {
      var datetime = this.session.expires_at;
      return dayjs(datetime).format('M/D/YYYY h:mm:ss A z');
    }
  },
  get sessionTimeRemaining() {
    var _this$session4;
    if ((_this$session4 = this.session) !== null && _this$session4 !== void 0 && _this$session4.expires_at) {
      var datetime = this.session.expires_at;
      return dayjs(datetime).fromNow(true);
    }
  },
  get isConversationActive() {
    var _this$conversation;
    return !!((_this$conversation = this.conversation) !== null && _this$conversation !== void 0 && _this$conversation.id);
  },
  get conversationExpiration() {
    if (this.conversation) {
      var datetime = this.conversation.expires_at;
      return dayjs(datetime).format('M/D/YYYY h:mm:ss A z');
    }
  },
  get conversationName() {
    if (this.conversation) {
      return this.conversation.source_name;
    }
  }
};var InboxStore = /*#__PURE__*/function () {
  function InboxStore(apiBaseUrl, participantId, resource, studyId, auth) {
    _classCallCheck(this, InboxStore);
    this.apiBaseUrl = apiBaseUrl;
    this.participantId = participantId;
    this.resource = resource;
    this.studyId = studyId;
    this.auth = auth;
    this.messagesObj = {};
    this.selectedMessage = null;
    this.aiGeneratedResponse = null;
    this.meta = {
      lastUpdated: null,
      oldest: null,
      pageSize: 50
    };
    this.loading = {
      older: false,
      initial: false,
      polling: false,
      send: false,
      suggestResponse: false,
      refreshResponse: false
    };
    this.imageCache = {};
  }
  _createClass(InboxStore, [{
    key: "authCredentials",
    value: function authCredentials() {
      if (this.auth.method === 'session') {
        return {
          credentials: "include"
        };
      } else if (this.auth.apiKey.length > 0) {
        return {
          headers: new Headers({
            'Authorization': 'Bearer ' + this.auth.apiKey
          })
        };
      }
    }
  }, {
    key: "fetchImage",
    value: function () {
      var _fetchImage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url) {
        var auth, requestParams, res, blob;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.imageCache[url]) {
                  _context.next = 2;
                  break;
                }
                return _context.abrupt("return", this.imageCache[url]);
              case 2:
                auth = this.authCredentials();
                requestParams = Object.assign(auth, {
                  method: "GET"
                });
                _context.next = 6;
                return fetch(url, requestParams);
              case 6:
                res = _context.sent;
                _context.next = 9;
                return res.blob();
              case 9:
                blob = _context.sent;
                this.imageCache[url] = URL.createObjectURL(blob);
                return _context.abrupt("return", this.imageCache[url]);
              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function fetchImage(_x) {
        return _fetchImage.apply(this, arguments);
      }
      return fetchImage;
    }()
  }, {
    key: "getImageUrl",
    value: function getImageUrl(msgId, imageIndex) {
      return "".concat(this.apiBaseUrl, "/api/v2/text_messages/").concat(msgId, "/image/").concat(imageIndex);
    }
  }, {
    key: "enableManualMode",
    value: function () {
      var _enableManualMode = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var requestParams;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                requestParams = Object.assign(this.authCredentials(), {
                  method: "POST",
                  body: JSON.stringify({
                    mode: "Manual",
                    duration_mins: 15
                  })
                });
                _context2.next = 3;
                return fetch("".concat(this.apiBaseUrl, "/api/v2/participants/").concat(this.participantId, "/messaging_mode_session"), requestParams);
              case 3:
                return _context2.abrupt("return", this.loadMessages());
              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function enableManualMode() {
        return _enableManualMode.apply(this, arguments);
      }
      return enableManualMode;
    }()
  }, {
    key: "disableManualMode",
    value: function () {
      var _disableManualMode = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var requestParams;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                requestParams = Object.assign(this.authCredentials(), {
                  method: "PATCH",
                  body: JSON.stringify([{
                    op: "end"
                  }])
                });
                _context3.next = 3;
                return fetch("".concat(this.apiBaseUrl, "/api/v2/participants/").concat(this.participantId, "/messaging_mode_session"), requestParams);
              case 3:
                return _context3.abrupt("return", this.loadMessages());
              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function disableManualMode() {
        return _disableManualMode.apply(this, arguments);
      }
      return disableManualMode;
    }()
  }, {
    key: "fetchMessages",
    value: function () {
      var _fetchMessages = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(params) {
        var update,
          auth,
          requestParams,
          search,
          res,
          messages,
          _args4 = arguments;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                update = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : true;
                auth = this.authCredentials();
                requestParams = Object.assign(auth, {
                  method: "GET"
                });
                search = new URLSearchParams(Object.assign({
                  study_id: this.studyId,
                  participant_id: this.participantId,
                  order_by: 'desc(id)',
                  per_page: this.meta.pageSize
                }, params));
                _context4.next = 6;
                return fetch("".concat(this.apiBaseUrl, "/api/v2/text_messages?") + search, requestParams);
              case 6:
                res = _context4.sent;
                if (res.ok) {
                  _context4.next = 9;
                  break;
                }
                throw new Error("womp");
              case 9:
                _context4.next = 11;
                return res.json();
              case 11:
                messages = _context4.sent.data;
                return _context4.abrupt("return", this.pullMessagesFromData(messages, update));
              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function fetchMessages(_x2) {
        return _fetchMessages.apply(this, arguments);
      }
      return fetchMessages;
    }()
  }, {
    key: "pullMessagesFromData",
    value: function pullMessagesFromData(messages) {
      var _this = this;
      var update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (update) {
        // Our API call finds items updated after the lastUpdated, so if the lastUpdated matched the updated_at
        // of a text we wouldn't get it. Move the search back by a second to account for that
        this.meta.lastUpdated = dayjs().subtract(1, 'second').format('YYYY-MM-DD HH:mm:ss');
      }
      if (messages.length) {
        var newMessages = messages.reduce(function (accumulator, text) {
          if (!_this.meta.oldest || text.created_at < _this.meta.oldest) {
            _this.meta.oldest = text.created_at;
          }
          return _objectSpread2(_objectSpread2({}, accumulator), {}, _defineProperty({}, text.id, text));
        }, {});
        this.messagesObj = Object.assign({}, this.messagesObj, newMessages);
      }
    }
  }, {
    key: "loadMessages",
    value: function () {
      var _loadMessages = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this.loading.initial) {
                  _context5.next = 2;
                  break;
                }
                return _context5.abrupt("return", false);
              case 2:
                this.loading.initial = true;
                _context5.next = 5;
                return this.loadMessagesViaParticipantApi("limit(".concat(this.meta.pageSize, ")"));
              case 5:
                this.loading.initial = false;
              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function loadMessages() {
        return _loadMessages.apply(this, arguments);
      }
      return loadMessages;
    }()
  }, {
    key: "poll",
    value: function () {
      var _poll = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this.loading.polling) {
                  _context6.next = 2;
                  break;
                }
                return _context6.abrupt("return", false);
              case 2:
                this.loading.polling = true;
                _context6.next = 5;
                return this.loadMessagesViaParticipantApi("updatedAfter(".concat(this.meta.lastUpdated, ")"));
              case 5:
                this.loading.polling = false;
              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function poll() {
        return _poll.apply(this, arguments);
      }
      return poll;
    }()
  }, {
    key: "loadMessagesViaParticipantApi",
    value: function () {
      var _loadMessagesViaParticipantApi = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(textMessageCriteria) {
        var _ppt$time_zone_name;
        var auth, requestParams, includes, url, res, ppt;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                // use the participants/support_partners endpoint for the initial load and when polling, so we get info on timezone, conversations,
                // and messaging mode
                auth = this.authCredentials();
                requestParams = Object.assign(auth, {
                  method: "GET"
                });
                includes = ["text_messages:".concat(textMessageCriteria), 'messaging_mode_session', 'current_conversation'];
                url = "".concat(this.apiBaseUrl, "/api/v2/").concat(this.resource, "/").concat(this.participantId, "?include=").concat(includes.join(','));
                _context7.next = 6;
                return fetch(url, requestParams);
              case 6:
                res = _context7.sent;
                if (res.ok) {
                  _context7.next = 9;
                  break;
                }
                throw new Error("womp");
              case 9:
                _context7.next = 11;
                return res.json();
              case 11:
                ppt = _context7.sent.data;
                inboxHelper.setTimezone((_ppt$time_zone_name = ppt === null || ppt === void 0 ? void 0 : ppt.time_zone_name) !== null && _ppt$time_zone_name !== void 0 ? _ppt$time_zone_name : "America/New_York");
                manualModeHelper.setCurrentSession(ppt === null || ppt === void 0 ? void 0 : ppt.messaging_mode_session);
                manualModeHelper.setCurrentConversation(ppt === null || ppt === void 0 ? void 0 : ppt.current_conversation);
                this.pullMessagesFromData(ppt.text_messages, true);
              case 16:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function loadMessagesViaParticipantApi(_x3) {
        return _loadMessagesViaParticipantApi.apply(this, arguments);
      }
      return loadMessagesViaParticipantApi;
    }()
  }, {
    key: "loadOlder",
    value: function () {
      var _loadOlder = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var params;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!this.loading.older) {
                  _context8.next = 2;
                  break;
                }
                return _context8.abrupt("return", false);
              case 2:
                params = {
                  created_at: 'beforeOrEqual(' + this.meta.oldest + ')'
                };
                this.loading.older = true;
                _context8.next = 6;
                return this.fetchMessages(params, false);
              case 6:
                this.loading.older = false;
              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function loadOlder() {
        return _loadOlder.apply(this, arguments);
      }
      return loadOlder;
    }()
  }, {
    key: "sendMessage",
    value: function () {
      var _sendMessage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(message, imageUrl) {
        var body, auth, requestParams, res, text, obj;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!this.loading.send) {
                  _context9.next = 2;
                  break;
                }
                return _context9.abrupt("return", false);
              case 2:
                body = {
                  message_text: message,
                  media_url: imageUrl,
                  force: true
                };
                auth = this.authCredentials();
                requestParams = Object.assign(auth, {
                  method: "POST",
                  body: JSON.stringify(body)
                });
                this.loading.send = true;
                _context9.next = 8;
                return fetch("".concat(this.apiBaseUrl, "/api/v2/").concat(this.resource, "/").concat(this.participantId, "/text_messages"), requestParams);
              case 8:
                res = _context9.sent;
                if (res.ok) {
                  _context9.next = 12;
                  break;
                }
                this.loading.older = false;
                throw new Error("womp");
              case 12:
                _context9.next = 14;
                return res.json();
              case 14:
                text = _context9.sent.data;
                obj = {};
                obj[text.id] = text;
                this.selectedMessage = null;
                this.messagesObj = Object.assign({}, this.messagesObj, obj);
                this.loading.send = false;
              case 20:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));
      function sendMessage(_x4, _x5) {
        return _sendMessage.apply(this, arguments);
      }
      return sendMessage;
    }()
  }, {
    key: "sendSuggestedMessage",
    value: function () {
      var _sendSuggestedMessage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(message, imageUrl) {
        var body, auth, requestParams, res;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (this.aiGeneratedResponse) {
                  _context10.next = 2;
                  break;
                }
                return _context10.abrupt("return", false);
              case 2:
                body = [{
                  op: 'replace',
                  path: '/final',
                  value: message
                }];
                auth = this.authCredentials();
                requestParams = Object.assign(auth, {
                  method: "PATCH",
                  body: JSON.stringify(body)
                });
                _context10.next = 7;
                return fetch("".concat(this.apiBaseUrl, "/api/v2/ai_response_requests/").concat(this.aiGeneratedResponse.id), requestParams);
              case 7:
                res = _context10.sent;
                if (res.ok) {
                  _context10.next = 11;
                  break;
                }
                this.loading.older = false;
                throw new Error("womp");
              case 11:
                _context10.next = 13;
                return this.sendMessage(message, imageUrl);
              case 13:
                this.aiGeneratedResponse = null;
                this.selectedMessage = null;
              case 15:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));
      function sendSuggestedMessage(_x6, _x7) {
        return _sendSuggestedMessage.apply(this, arguments);
      }
      return sendSuggestedMessage;
    }()
  }, {
    key: "rejectSuggestedMessage",
    value: function () {
      var _rejectSuggestedMessage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(rejectComment) {
        var body, auth, requestParams, res;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (this.aiGeneratedResponse) {
                  _context11.next = 2;
                  break;
                }
                return _context11.abrupt("return", false);
              case 2:
                body = [{
                  op: 'replace',
                  path: '/review',
                  value: 'Rejected'
                }, {
                  op: 'replace',
                  path: '/comment',
                  value: rejectComment
                }];
                auth = this.authCredentials();
                requestParams = Object.assign(auth, {
                  method: "PATCH",
                  body: JSON.stringify(body)
                });
                _context11.next = 7;
                return fetch("".concat(this.apiBaseUrl, "/api/v2/ai_response_requests/").concat(this.aiGeneratedResponse.id), requestParams);
              case 7:
                res = _context11.sent;
                if (res.ok) {
                  _context11.next = 11;
                  break;
                }
                this.loading.older = false;
                throw new Error("womp");
              case 11:
                this.aiGeneratedResponse = null;
                this.selectedMessage = null;
              case 13:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));
      function rejectSuggestedMessage(_x8) {
        return _rejectSuggestedMessage.apply(this, arguments);
      }
      return rejectSuggestedMessage;
    }()
  }, {
    key: "refreshSuggestedMessage",
    value: function () {
      var _refreshSuggestedMessage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
        var body, auth, requestParams, res;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (!this.loading.refreshResponse) {
                  _context12.next = 2;
                  break;
                }
                return _context12.abrupt("return", false);
              case 2:
                if (this.aiGeneratedResponse) {
                  _context12.next = 4;
                  break;
                }
                return _context12.abrupt("return", false);
              case 4:
                this.loading.refreshResponse = true;
                body = [{
                  op: 'replace',
                  path: '/review',
                  value: 'Refreshed'
                }];
                auth = this.authCredentials();
                requestParams = Object.assign(auth, {
                  method: "PATCH",
                  body: JSON.stringify(body)
                });
                _context12.next = 10;
                return fetch("".concat(this.apiBaseUrl, "/api/v2/ai_response_requests/").concat(this.aiGeneratedResponse.id), requestParams);
              case 10:
                res = _context12.sent;
                if (res.ok) {
                  _context12.next = 14;
                  break;
                }
                this.loading.older = false;
                throw new Error("womp");
              case 14:
                _context12.next = 16;
                return this.suggestResponse();
              case 16:
                this.loading.refreshResponse = false;
              case 17:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));
      function refreshSuggestedMessage() {
        return _refreshSuggestedMessage.apply(this, arguments);
      }
      return refreshSuggestedMessage;
    }()
  }, {
    key: "suggestResponse",
    value: function () {
      var _suggestResponse = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
        var body, auth, requestParams, res;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                if (!this.loading.suggestResponse) {
                  _context13.next = 2;
                  break;
                }
                return _context13.abrupt("return", false);
              case 2:
                if (this.selectedMessage) {
                  _context13.next = 4;
                  break;
                }
                return _context13.abrupt("return", false);
              case 4:
                body = {
                  input: this.selectedMessage.message_text,
                  participant_id: this.participantId
                };
                auth = this.authCredentials();
                requestParams = Object.assign(auth, {
                  method: "POST",
                  body: JSON.stringify(body)
                });
                this.loading.suggestResponse = true;
                _context13.next = 10;
                return fetch("".concat(this.apiBaseUrl, "/api/v2/ai_response_requests"), requestParams);
              case 10:
                res = _context13.sent;
                if (res.ok) {
                  _context13.next = 14;
                  break;
                }
                this.loading.suggestResponse = false;
                throw new Error("womp");
              case 14:
                _context13.next = 16;
                return res.json();
              case 16:
                this.aiGeneratedResponse = _context13.sent.data;
                this.loading.suggestResponse = false;
              case 18:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));
      function suggestResponse() {
        return _suggestResponse.apply(this, arguments);
      }
      return suggestResponse;
    }()
  }]);
  return InboxStore;
}();
var InboxStore$1 = InboxStore;var styles = {
  inboxSubmit: "btn px-4 btn-primary mt-1",
  inboxSuggestResponse: "btn px-4 btn-secondary mt-1"
};
var styles$1 = styles;//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$8 = {
  name: "LazyImage",
  props: {
    context: {
      type: String,
      validator: function validator(value) {
        // context must be either gallery, modal, or inbox
        return ['gallery', 'modal', 'inbox'].includes(value);
      },
      required: true
    },
    store: {
      type: Object,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      src: null
    };
  },
  computed: {
    loading: function loading() {
      return this.src === null;
    },
    imageClass: function imageClass() {
      return "".concat(this.context, "-img");
    },
    style: function style() {
      return {
        'background-image': "url(".concat(this.src, ")")
      };
    }
  },
  mounted: function mounted() {
    this.fetch();
  },
  methods: {
    fetch: function fetch() {
      var _this = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.store.fetchImage(_this.url);
              case 2:
                _this.src = _context.sent;
              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group = css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__$8 = script$8;

/* template */
var __vue_render__$8 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.loading ? _c('div', {
    class: _vm.imageClass
  }, [_c('b-spinner', {
    attrs: {
      "variant": "primary",
      "label": "Spinning"
    }
  })], 1) : _c('div', [_vm._ssrNode(_vm.context === 'inbox' ? "<div class=\"inbox-img\"" + _vm._ssrStyle(null, {
    'background-image': "url(" + _vm.src + ")"
  }, null) + " data-v-cdc77716></div>" : "<img" + _vm._ssrAttr("src", _vm.src) + " alt=\"Image sent/received by text message\"" + _vm._ssrClass(null, _vm.imageClass) + " data-v-cdc77716>")]);
};
var __vue_staticRenderFns__$8 = [];

/* style */
var __vue_inject_styles__$8 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-cdc77716_0", {
    source: ".inbox-img[data-v-cdc77716]{width:200px;height:200px;margin:20px 0;text-align:center;background-repeat:no-repeat;background-position:50% 50%;-webkit-background-size:cover;background-size:cover}.modal-img[data-v-cdc77716]{text-align:center;max-width:100%;max-height:80vh}.gallery-img[data-v-cdc77716]{max-width:100%;margin:10px 0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
var __vue_scope_id__$8 = "data-v-cdc77716";
/* module identifier */
var __vue_module_identifier__$8 = "data-v-cdc77716";
/* functional template */
var __vue_is_functional_template__$8 = false;
/* style inject shadow dom */

var __vue_component__$8 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, createInjectorSSR, undefined);
var LazyImage = __vue_component__$8;//
var script$7 = {
  name: "ImageLightbox",
  components: {
    LazyImage: LazyImage
  },
  props: {
    store: {
      type: Object,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    }
  },
  data: function data() {
    return {
      msgId: null,
      imageIndex: null,
      reverseDirection: false
    };
  },
  computed: {
    images: function images() {
      var output = [];
      Object.values(this.store.messagesObj).forEach(function (msg) {
        msg.media.forEach(function (media, imageIndex) {
          output.push({
            msgId: msg.id,
            imageIndex: imageIndex
          });
        });
      });
      return this.reverseDirection ? output.reverse() : output;
    },
    sentTime: function sentTime() {
      var msg = this.store.messagesObj[this.msgId];
      if (msg) {
        return inboxHelper.imageDetailTime(msg);
      } else {
        return '';
      }
    },
    firstImage: function firstImage() {
      return this.images[0];
    },
    lastImage: function lastImage() {
      return this.images[this.images.length - 1];
    },
    showPreviousImageButton: function showPreviousImageButton() {
      if (!this.firstImage) {
        return false;
      }
      return this.msgId !== this.firstImage.msgId || this.imageIndex !== this.firstImage.imageIndex;
    },
    showNextImageButton: function showNextImageButton() {
      if (!this.lastImage) {
        return false;
      }
      return this.msgId !== this.lastImage.msgId || this.imageIndex !== this.lastImage.imageIndex;
    }
  },
  methods: {
    open: function open(msgId, imageIndex, reverseDirection) {
      // Called from parent component
      this.msgId = msgId;
      this.imageIndex = imageIndex;
      this.reverseDirection = reverseDirection;
    },
    previousImage: function previousImage() {
      var _this = this;
      var x = this.images.findIndex(function (item) {
        return item.msgId === _this.msgId && item.imageIndex === _this.imageIndex;
      });
      if (x <= 0) {
        return;
      }
      this.msgId = this.images[x - 1].msgId;
      this.imageIndex = this.images[x - 1].imageIndex;
    },
    nextImage: function nextImage() {
      var _this2 = this;
      var x = this.images.findIndex(function (item) {
        return item.msgId === _this2.msgId && item.imageIndex === _this2.imageIndex;
      });
      if (x >= this.images.length - 1) {
        return;
      }
      this.msgId = this.images[x + 1].msgId;
      this.imageIndex = this.images[x + 1].imageIndex;
    }
  }
};/* script */
var __vue_script__$7 = script$7;

/* template */
var __vue_render__$7 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('b-modal', {
    attrs: {
      "id": "image-lightbox",
      "visible": _vm.value,
      "centered": "",
      "hide-footer": "",
      "size": "lg",
      "lazy": "",
      "body-class": "d-flex justify-content-center",
      "title": _vm.sentTime,
      "title-class": 'text-center w-100'
    },
    on: {
      "change": function change($event) {
        return _vm.$emit('input', $event);
      }
    }
  }, [_vm.value ? _c('LazyImage', {
    key: _vm.msgId + "_" + _vm.imageIndex,
    attrs: {
      "store": _vm.store,
      "context": "modal",
      "url": _vm.store.getImageUrl(_vm.msgId, _vm.imageIndex)
    }
  }) : _vm._e(), _vm._v(" "), _vm.showPreviousImageButton ? _c('span', {
    attrs: {
      "id": "prev-btn"
    },
    on: {
      "click": _vm.previousImage
    }
  }, [_vm._v("❮")]) : _vm._e(), _vm._v(" "), _vm.showNextImageButton ? _c('span', {
    attrs: {
      "id": "next-btn"
    },
    on: {
      "click": _vm.nextImage
    }
  }, [_vm._v("❯")]) : _vm._e()], 1);
};
var __vue_staticRenderFns__$7 = [];

/* style */
var __vue_inject_styles__$7 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-8c1ad63a_0", {
    source: "#next-btn[data-v-8c1ad63a],#prev-btn[data-v-8c1ad63a]{cursor:pointer;position:absolute;top:50%;width:auto;padding:16px;margin-top:-50px;color:#fff;font-weight:700;font-size:20px;transition:.6s ease;user-select:none;-webkit-user-select:none;opacity:.3;background-color:#000}#prev-btn[data-v-8c1ad63a]{left:0;border-radius:3px 0 0 3px}#next-btn[data-v-8c1ad63a]{right:0;border-radius:0 3px 3px 0}#next-btn[data-v-8c1ad63a]:hover,#prev-btn[data-v-8c1ad63a]:hover{opacity:.8}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
var __vue_scope_id__$7 = "data-v-8c1ad63a";
/* module identifier */
var __vue_module_identifier__$7 = "data-v-8c1ad63a";
/* functional template */
var __vue_is_functional_template__$7 = false;
/* style inject shadow dom */

var __vue_component__$7 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, undefined, createInjectorSSR, undefined);
var ImageLightbox = __vue_component__$7;var main = createCommonjsModule(function (module, exports) {
!function(e,o){module.exports=o();}(commonjsGlobal,function(){return function(e){function o(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,o),n.l=!0,n.exports}var t={};return o.m=e,o.c=t,o.i=function(e){return e},o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:a});},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},o.p="/dist-module/",o(o.s=3)}([function(e,o,t){var a=t(4)(t(1),t(5),null,null,null);e.exports=a.exports;},function(e,o,t){Object.defineProperty(o,"__esModule",{value:!0});var a=t(2),n=function(e){return e&&e.__esModule?e:{default:e}}(a),i=function(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")};o.default={props:{search:{type:String,required:!1,default:""},emojiTable:{type:Object,required:!1,default:function(){return n.default}}},data:function(){return {display:{x:0,y:0,visible:!1}}},computed:{emojis:function(){if(this.search){var e={};for(var o in this.emojiTable){e[o]={};for(var t in this.emojiTable[o])new RegExp(".*"+i(this.search)+".*").test(t)&&(e[o][t]=this.emojiTable[o][t]);0===Object.keys(e[o]).length&&delete e[o];}return e}return this.emojiTable}},methods:{insert:function(e){this.$emit("emoji",e);},toggle:function(e){this.display.visible=!this.display.visible,this.display.x=e.clientX,this.display.y=e.clientY;},hide:function(){this.display.visible=!1;},escape:function(e){!0===this.display.visible&&27===e.keyCode&&(this.display.visible=!1);}},directives:{"click-outside":{bind:function(e,o,t){if("function"==typeof o.value){var a=o.modifiers.bubble,n=function(t){(a||!e.contains(t.target)&&e!==t.target)&&o.value(t);};e.__vueClickOutside__=n,document.addEventListener("click",n);}},unbind:function(e,o){document.removeEventListener("click",e.__vueClickOutside__),e.__vueClickOutside__=null;}}},mounted:function(){document.addEventListener("keyup",this.escape);},destroyed:function(){document.removeEventListener("keyup",this.escape);}};},function(e,o,t){Object.defineProperty(o,"__esModule",{value:!0}),o.default={"Frequently used":{thumbs_up:"👍","-1":"👎",sob:"😭",confused:"😕",neutral_face:"😐",blush:"😊",heart_eyes:"😍"},People:{smile:"😄",smiley:"😃",grinning:"😀",blush:"😊",wink:"😉",heart_eyes:"😍",kissing_heart:"😘",kissing_closed_eyes:"😚",kissing:"😗",kissing_smiling_eyes:"😙",stuck_out_tongue_winking_eye:"😜",stuck_out_tongue_closed_eyes:"😝",stuck_out_tongue:"😛",flushed:"😳",grin:"😁",pensive:"😔",relieved:"😌",unamused:"😒",disappointed:"😞",persevere:"😣",cry:"😢",joy:"😂",sob:"😭",sleepy:"😪",disappointed_relieved:"😥",cold_sweat:"😰",sweat_smile:"😅",sweat:"😓",weary:"😩",tired_face:"😫",fearful:"😨",scream:"😱",angry:"😠",rage:"😡",triumph:"😤",confounded:"😖",laughing:"😆",yum:"😋",mask:"😷",sunglasses:"😎",sleeping:"😴",dizzy_face:"😵",astonished:"😲",worried:"😟",frowning:"😦",anguished:"😧",imp:"👿",open_mouth:"😮",grimacing:"😬",neutral_face:"😐",confused:"😕",hushed:"😯",smirk:"😏",expressionless:"😑",man_with_gua_pi_mao:"👲",man_with_turban:"👳",cop:"👮",construction_worker:"👷",guardsman:"💂",baby:"👶",boy:"👦",girl:"👧",man:"👨",woman:"👩",older_man:"👴",older_woman:"👵",person_with_blond_hair:"👱",angel:"👼",princess:"👸",smiley_cat:"😺",smile_cat:"😸",heart_eyes_cat:"😻",kissing_cat:"😽",smirk_cat:"😼",scream_cat:"🙀",crying_cat_face:"😿",joy_cat:"😹",pouting_cat:"😾",japanese_ogre:"👹",japanese_goblin:"👺",see_no_evil:"🙈",hear_no_evil:"🙉",speak_no_evil:"🙊",skull:"💀",alien:"👽",hankey:"💩",fire:"🔥",sparkles:"✨",star2:"🌟",dizzy:"💫",boom:"💥",anger:"💢",sweat_drops:"💦",droplet:"💧",zzz:"💤",dash:"💨",ear:"👂",eyes:"👀",nose:"👃",tongue:"👅",lips:"👄",thumbs_up:"👍","-1":"👎",ok_hand:"👌",facepunch:"👊",fist:"✊",wave:"👋",hand:"✋",open_hands:"👐",point_up_2:"👆",point_down:"👇",point_right:"👉",point_left:"👈",raised_hands:"🙌",pray:"🙏",clap:"👏",muscle:"💪",walking:"🚶",runner:"🏃",dancer:"💃",couple:"👫",family:"👪",couplekiss:"💏",couple_with_heart:"💑",dancers:"👯",ok_woman:"🙆",no_good:"🙅",information_desk_person:"💁",raising_hand:"🙋",massage:"💆",haircut:"💇",nail_care:"💅",bride_with_veil:"👰",person_with_pouting_face:"🙎",person_frowning:"🙍",bow:"🙇",tophat:"🎩",crown:"👑",womans_hat:"👒",athletic_shoe:"👟",mans_shoe:"👞",sandal:"👡",high_heel:"👠",boot:"👢",shirt:"👕",necktie:"👔",womans_clothes:"👚",dress:"👗",running_shirt_with_sash:"🎽",jeans:"👖",kimono:"👘",bikini:"👙",briefcase:"💼",handbag:"👜",pouch:"👝",purse:"👛",eyeglasses:"👓",ribbon:"🎀",closed_umbrella:"🌂",lipstick:"💄",yellow_heart:"💛",blue_heart:"💙",purple_heart:"💜",green_heart:"💚",broken_heart:"💔",heartpulse:"💗",heartbeat:"💓",two_hearts:"💕",sparkling_heart:"💖",revolving_hearts:"💞",cupid:"💘",love_letter:"💌",kiss:"💋",ring:"💍",gem:"💎",bust_in_silhouette:"👤",speech_balloon:"💬",footprints:"👣"},Nature:{dog:"🐶",wolf:"🐺",cat:"🐱",mouse:"🐭",hamster:"🐹",rabbit:"🐰",frog:"🐸",tiger:"🐯",koala:"🐨",bear:"🐻",pig:"🐷",pig_nose:"🐽",cow:"🐮",boar:"🐗",monkey_face:"🐵",monkey:"🐒",horse:"🐴",sheep:"🐑",elephant:"🐘",panda_face:"🐼",penguin:"🐧",bird:"🐦",baby_chick:"🐤",hatched_chick:"🐥",hatching_chick:"🐣",chicken:"🐔",snake:"🐍",turtle:"🐢",bug:"🐛",bee:"🐝",ant:"🐜",beetle:"🐞",snail:"🐌",octopus:"🐙",shell:"🐚",tropical_fish:"🐠",fish:"🐟",dolphin:"🐬",whale:"🐳",racehorse:"🐎",dragon_face:"🐲",blowfish:"🐡",camel:"🐫",poodle:"🐩",feet:"🐾",bouquet:"💐",cherry_blossom:"🌸",tulip:"🌷",four_leaf_clover:"🍀",rose:"🌹",sunflower:"🌻",hibiscus:"🌺",maple_leaf:"🍁",leaves:"🍃",fallen_leaf:"🍂",herb:"🌿",ear_of_rice:"🌾",mushroom:"🍄",cactus:"🌵",palm_tree:"🌴",chestnut:"🌰",seedling:"🌱",blossom:"🌼",new_moon:"🌑",first_quarter_moon:"🌓",moon:"🌔",full_moon:"🌕",first_quarter_moon_with_face:"🌛",crescent_moon:"🌙",earth_asia:"🌏",volcano:"🌋",milky_way:"🌌",stars:"🌠",partly_sunny:"⛅",snowman:"⛄",cyclone:"🌀",foggy:"🌁",rainbow:"🌈",ocean:"🌊"},Objects:{bamboo:"🎍",gift_heart:"💝",dolls:"🎎",school_satchel:"🎒",mortar_board:"🎓",flags:"🎏",fireworks:"🎆",sparkler:"🎇",wind_chime:"🎐",rice_scene:"🎑",jack_o_lantern:"🎃",ghost:"👻",santa:"🎅",christmas_tree:"🎄",gift:"🎁",tanabata_tree:"🎋",tada:"🎉",confetti_ball:"🎊",balloon:"🎈",crossed_flags:"🎌",crystal_ball:"🔮",movie_camera:"🎥",camera:"📷",video_camera:"📹",vhs:"📼",cd:"💿",dvd:"📀",minidisc:"💽",floppy_disk:"💾",computer:"💻",iphone:"📱",telephone_receiver:"📞",pager:"📟",fax:"📠",satellite:"📡",tv:"📺",radio:"📻",loud_sound:"🔊",bell:"🔔",loudspeaker:"📢",mega:"📣",hourglass_flowing_sand:"⏳",hourglass:"⌛",alarm_clock:"⏰",watch:"⌚",unlock:"🔓",lock:"🔒",lock_with_ink_pen:"🔏",closed_lock_with_key:"🔐",key:"🔑",mag_right:"🔎",bulb:"💡",flashlight:"🔦",electric_plug:"🔌",battery:"🔋",mag:"🔍",bath:"🛀",toilet:"🚽",wrench:"🔧",nut_and_bolt:"🔩",hammer:"🔨",door:"🚪",smoking:"🚬",bomb:"💣",gun:"🔫",hocho:"🔪",pill:"💊",syringe:"💉",moneybag:"💰",yen:"💴",dollar:"💵",credit_card:"💳",money_with_wings:"💸",calling:"📲","e-mail":"📧",inbox_tray:"📥",outbox_tray:"📤",envelope_with_arrow:"📩",incoming_envelope:"📨",mailbox:"📫",mailbox_closed:"📪",postbox:"📮",package:"📦",memo:"📝",page_facing_up:"📄",page_with_curl:"📃",bookmark_tabs:"📑",bar_chart:"📊",chart_with_upwards_trend:"📈",chart_with_downwards_trend:"📉",scroll:"📜",clipboard:"📋",date:"📅",calendar:"📆",card_index:"📇",file_folder:"📁",open_file_folder:"📂",pushpin:"📌",paperclip:"📎",straight_ruler:"📏",triangular_ruler:"📐",closed_book:"📕",green_book:"📗",blue_book:"📘",orange_book:"📙",notebook:"📓",notebook_with_decorative_cover:"📔",ledger:"📒",books:"📚",book:"📖",bookmark:"🔖",name_badge:"📛",newspaper:"📰",art:"🎨",clapper:"🎬",microphone:"🎤",headphones:"🎧",musical_score:"🎼",musical_note:"🎵",notes:"🎶",musical_keyboard:"🎹",violin:"🎻",trumpet:"🎺",saxophone:"🎷",guitar:"🎸",space_invader:"👾",video_game:"🎮",black_joker:"🃏",flower_playing_cards:"🎴",mahjong:"🀄",game_die:"🎲",dart:"🎯",football:"🏈",basketball:"🏀",soccer:"⚽",baseball:"⚾",tennis:"🎾","8ball":"🎱",bowling:"🎳",golf:"⛳",checkered_flag:"🏁",trophy:"🏆",ski:"🎿",snowboarder:"🏂",swimmer:"🏊",surfer:"🏄",fishing_pole_and_fish:"🎣",tea:"🍵",sake:"🍶",beer:"🍺",beers:"🍻",cocktail:"🍸",tropical_drink:"🍹",wine_glass:"🍷",fork_and_knife:"🍴",pizza:"🍕",hamburger:"🍔",fries:"🍟",poultry_leg:"🍗",meat_on_bone:"🍖",spaghetti:"🍝",curry:"🍛",fried_shrimp:"🍤",bento:"🍱",sushi:"🍣",fish_cake:"🍥",rice_ball:"🍙",rice_cracker:"🍘",rice:"🍚",ramen:"🍜",stew:"🍲",oden:"🍢",dango:"🍡",egg:"🍳",bread:"🍞",doughnut:"🍩",custard:"🍮",icecream:"🍦",ice_cream:"🍨",shaved_ice:"🍧",birthday:"🎂",cake:"🍰",cookie:"🍪",chocolate_bar:"🍫",candy:"🍬",lollipop:"🍭",honey_pot:"🍯",apple:"🍎",green_apple:"🍏",tangerine:"🍊",cherries:"🍒",grapes:"🍇",watermelon:"🍉",strawberry:"🍓",peach:"🍑",melon:"🍈",banana:"🍌",pineapple:"🍍",sweet_potato:"🍠",eggplant:"🍆",tomato:"🍅",corn:"🌽"},Places:{house:"🏠",house_with_garden:"🏡",school:"🏫",office:"🏢",post_office:"🏣",hospital:"🏥",bank:"🏦",convenience_store:"🏪",love_hotel:"🏩",hotel:"🏨",wedding:"💒",church:"⛪",department_store:"🏬",city_sunrise:"🌇",city_sunset:"🌆",japanese_castle:"🏯",european_castle:"🏰",tent:"⛺",factory:"🏭",tokyo_tower:"🗼",japan:"🗾",mount_fuji:"🗻",sunrise_over_mountains:"🌄",sunrise:"🌅",night_with_stars:"🌃",statue_of_liberty:"🗽",bridge_at_night:"🌉",carousel_horse:"🎠",ferris_wheel:"🎡",fountain:"⛲",roller_coaster:"🎢",ship:"🚢",boat:"⛵",speedboat:"🚤",rocket:"🚀",seat:"💺",station:"🚉",bullettrain_side:"🚄",bullettrain_front:"🚅",metro:"🚇",railway_car:"🚃",bus:"🚌",blue_car:"🚙",car:"🚗",taxi:"🚕",truck:"🚚",rotating_light:"🚨",police_car:"🚓",fire_engine:"🚒",ambulance:"🚑",bike:"🚲",barber:"💈",busstop:"🚏",ticket:"🎫",traffic_light:"🚥",construction:"🚧",beginner:"🔰",fuelpump:"⛽",izakaya_lantern:"🏮",slot_machine:"🎰",moyai:"🗿",circus_tent:"🎪",performing_arts:"🎭",round_pushpin:"📍",triangular_flag_on_post:"🚩"},Symbols:{keycap_ten:"🔟",1234:"🔢",symbols:"🔣",capital_abcd:"🔠",abcd:"🔡",abc:"🔤",arrow_up_small:"🔼",arrow_down_small:"🔽",rewind:"⏪",fast_forward:"⏩",arrow_double_up:"⏫",arrow_double_down:"⏬",ok:"🆗",new:"🆕",up:"🆙",cool:"🆒",free:"🆓",ng:"🆖",signal_strength:"📶",cinema:"🎦",koko:"🈁",u6307:"🈯",u7a7a:"🈳",u6e80:"🈵",u5408:"🈴",u7981:"🈲",ideograph_advantage:"🉐",u5272:"🈹",u55b6:"🈺",u6709:"🈶",u7121:"🈚",restroom:"🚻",mens:"🚹",womens:"🚺",baby_symbol:"🚼",wc:"🚾",no_smoking:"🚭",u7533:"🈸",accept:"🉑",cl:"🆑",sos:"🆘",id:"🆔",no_entry_sign:"🚫",underage:"🔞",no_entry:"⛔",negative_squared_cross_mark:"❎",white_check_mark:"✅",heart_decoration:"💟",vs:"🆚",vibration_mode:"📳",mobile_phone_off:"📴",ab:"🆎",diamond_shape_with_a_dot_inside:"💠",ophiuchus:"⛎",six_pointed_star:"🔯",atm:"🏧",chart:"💹",heavy_dollar_sign:"💲",currency_exchange:"💱",x:"❌",exclamation:"❗",question:"❓",grey_exclamation:"❕",grey_question:"❔",o:"⭕",top:"🔝",end:"🔚",back:"🔙",on:"🔛",soon:"🔜",arrows_clockwise:"🔃",clock12:"🕛",clock1:"🕐",clock2:"🕑",clock3:"🕒",clock4:"🕓",clock5:"🕔",clock6:"🕕",clock7:"🕖",clock8:"🕗",clock9:"🕘",clock10:"🕙",clock11:"🕚",heavy_plus_sign:"➕",heavy_minus_sign:"➖",heavy_division_sign:"➗",white_flower:"💮",100:"💯",radio_button:"🔘",link:"🔗",curly_loop:"➰",trident:"🔱",small_red_triangle:"🔺",black_square_button:"🔲",white_square_button:"🔳",red_circle:"🔴",large_blue_circle:"🔵",small_red_triangle_down:"🔻",white_large_square:"⬜",black_large_square:"⬛",large_orange_diamond:"🔶",large_blue_diamond:"🔷",small_orange_diamond:"🔸",small_blue_diamond:"🔹"}};},function(e,o,t){Object.defineProperty(o,"__esModule",{value:!0}),o.EmojiPickerPlugin=o.EmojiPicker=void 0;var a=t(0),n=function(e){return e&&e.__esModule?e:{default:e}}(a),i={install:function(e){e.component("emoji-picker",n.default);}};"undefined"!=typeof window&&(window.EmojiPicker=i),o.EmojiPicker=n.default,o.EmojiPickerPlugin=i,o.default=n.default;},function(e,o){e.exports=function(e,o,t,a,n){var i,r=e=e||{},s=typeof e.default;"object"!==s&&"function"!==s||(i=e,r=e.default);var l="function"==typeof r?r.options:r;o&&(l.render=o.render,l.staticRenderFns=o.staticRenderFns),a&&(l._scopeId=a);var _;if(n?(_=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),t&&t.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(n);},l._ssrRegister=_):t&&(_=t),_){var c=l.functional,u=c?l.render:l.beforeCreate;c?l.render=function(e,o){return _.call(o),u(e,o)}:l.beforeCreate=u?[].concat(u,_):[_];}return {esModule:i,exports:r,options:l}};},function(e,o){e.exports={render:function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("div",[e._t("emoji-invoker",null,{events:{click:function(o){return e.toggle(o)}}}),e._v(" "),e.display.visible?t("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.hide,expression:"hide"}]},[e._t("emoji-picker",null,{emojis:e.emojis,insert:e.insert,display:e.display})],2):e._e()],2)},staticRenderFns:[]};}])});

});var emojiRegex = () => {
	// https://mths.be/emoji
	return /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26F9(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC3\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC08\uDC26](?:\u200D\u2B1B)?|[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC2\uDECE-\uDEDB\uDEE0-\uDEE8]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
};function isJustEmoji(string) {
  // regex is: (start-of-string)(1 or more emoji, spaces, or newlines)(end-of-string)
  var justEmojiRegex = new RegExp("^((".concat(emojiRegex().source, ")|[ \n])+$"));
  return justEmojiRegex.test(string);
}//
var script$6 = {
  name: 'InputArea',
  components: {
    EmojiPicker: main.EmojiPicker
  },
  directives: {
    focus: {
      inserted: function inserted(el) {
        el.focus();
      }
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      required: true
    },
    showImageUploadInvoker: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      search: ''
    };
  },
  watch: {
    value: function value(newVal) {
      this.resizeTextarea(newVal);
    }
  },
  methods: {
    insertEmoji: function insertEmoji(emoji) {
      var textarea = this.$refs.textarea;
      var startPos = textarea.selectionStart;
      var endPos = textarea.selectionEnd;
      var newValue = this.value.substring(0, startPos) + emoji + this.value.substring(endPos, this.value.length);
      this.$emit('input', newValue);
      textarea.focus();
      this.$nextTick(function () {
        textarea.selectionStart = textarea.selectionEnd = startPos + emoji.length;
      });
    },
    resizeTextarea: function resizeTextarea(newVal) {
      var textarea = this.$refs.textarea;
      textarea.style.height = "auto"; // reset
      textarea.style.fontSize = isJustEmoji(newVal) ? '1.8rem' : null;
      textarea.style.height = "".concat(textarea.scrollHeight, "px");
    }
  }
};/* script */
var __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', {
    staticClass: "wrapper"
  }, [_vm._ssrNode("<textarea cols=\"30\"" + _vm._ssrAttr("disabled", _vm.disabled) + _vm._ssrAttr("value", _vm.value) + " class=\"form-control\" data-v-8b173f24></textarea> " + (_vm.showImageUploadInvoker ? "<button class=\"image-upload-invoker\" data-v-8b173f24><svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\" class=\"h-6 w-6 fill-current text-grey\" data-v-8b173f24><path d=\"M96 896a32 32 0 01-32-32V160a32 32 0 0132-32h832a32 32 0 0132 32v704a32 32 0 01-32 32H96zm315.52-228.48l-68.928-68.928a32 32 0 00-45.248 0L128 768.064h778.688l-242.112-290.56a32 32 0 00-49.216 0L458.752 665.408a32 32 0 01-47.232 2.112zM256 384a96 96 0 10192.064-.064A96 96 0 00256 384z\" data-v-8b173f24></path></svg></button>" : "<!---->") + " "), _c('emoji-picker', {
    attrs: {
      "search": _vm.search
    },
    on: {
      "emoji": _vm.insertEmoji
    },
    scopedSlots: _vm._u([{
      key: "emoji-invoker",
      fn: function fn(ref) {
        var clickEvent = ref.events.click;
        return [_c('button', {
          staticClass: "emoji-invoker",
          on: {
            "click": function click($event) {
              $event.stopPropagation();
              return clickEvent.apply(null, arguments);
            }
          }
        }, [_c('svg', {
          staticClass: "h-6 w-6 fill-current text-grey",
          attrs: {
            "viewBox": "0 0 24 24",
            "xmlns": "http://www.w3.org/2000/svg"
          }
        }, [_c('path', {
          attrs: {
            "d": "M0 0h24v24H0z",
            "fill": "none"
          }
        }), _vm._v(" "), _c('path', {
          attrs: {
            "d": "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
          }
        })])])];
      }
    }, {
      key: "emoji-picker",
      fn: function fn(ref) {
        var emojis = ref.emojis;
        var insert = ref.insert;
        return [_c('div', {
          staticClass: "emoji-picker"
        }, [_c('div', {
          staticClass: "emoji-picker__search"
        }, [_c('input', {
          directives: [{
            name: "model",
            rawName: "v-model",
            value: _vm.search,
            expression: "search"
          }, {
            name: "focus",
            rawName: "v-focus"
          }],
          attrs: {
            "type": "text"
          },
          domProps: {
            "value": _vm.search
          },
          on: {
            "input": function input($event) {
              if ($event.target.composing) {
                return;
              }
              _vm.search = $event.target.value;
            }
          }
        })]), _vm._v(" "), _c('div', _vm._l(emojis, function (emojiGroup, category) {
          return _c('div', {
            key: category
          }, [_c('h5', [_vm._v(_vm._s(category))]), _vm._v(" "), _c('div', {
            staticClass: "emojis"
          }, _vm._l(emojiGroup, function (emoji, emojiName) {
            return _c('span', {
              key: emojiName,
              attrs: {
                "title": emojiName
              },
              on: {
                "click": function click($event) {
                  return insert(emoji);
                }
              }
            }, [_vm._v(_vm._s(emoji))]);
          }), 0)]);
        }), 0)])];
      }
    }])
  })], 2);
};
var __vue_staticRenderFns__$6 = [];

/* style */
var __vue_inject_styles__$6 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-8b173f24_0", {
    source: "textarea[data-v-8b173f24]{resize:none}.wrapper[data-v-8b173f24]{position:relative}.emoji-invoker[data-v-8b173f24],.image-upload-invoker[data-v-8b173f24]{position:absolute;top:.5rem;width:1.5rem;height:1.5rem;border-radius:50%;cursor:pointer;transition:all .2s;padding:0;background:0 0;border:0}.emoji-invoker[data-v-8b173f24]{right:.5rem}.image-upload-invoker[data-v-8b173f24]{right:2.5rem}.emoji-invoker[data-v-8b173f24]:hover,.image-upload-invoker[data-v-8b173f24]:hover{transform:scale(1.1)}.emoji-invoker>svg[data-v-8b173f24],.image-upload-invoker>svg[data-v-8b173f24]{fill:#b1c6d0}.emoji-picker[data-v-8b173f24]{position:absolute;z-index:1;border:1px solid #ccc;width:17rem;right:0;height:20rem;overflow:scroll;padding:1rem;box-sizing:border-box;border-radius:.5rem;background:#fff;box-shadow:1px 1px 8px #c7dbe6}.emoji-picker__search[data-v-8b173f24]{display:flex}.emoji-picker__search>input[data-v-8b173f24]{flex:1;border-radius:10rem;border:1px solid #ccc;padding:.5rem 1rem;outline:0}.emoji-picker h5[data-v-8b173f24]{margin-bottom:0;color:#b1b1b1;text-transform:uppercase;font-size:.8rem;cursor:default}.emoji-picker .emojis[data-v-8b173f24]{display:flex;flex-wrap:wrap;justify-content:space-between}.emoji-picker .emojis[data-v-8b173f24]:after{content:\"\";flex:auto}.emoji-picker .emojis span[data-v-8b173f24]{padding:.2rem;cursor:pointer;border-radius:5px}.emoji-picker .emojis span[data-v-8b173f24]:hover{background:#ececec;cursor:pointer}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
var __vue_scope_id__$6 = "data-v-8b173f24";
/* module identifier */
var __vue_module_identifier__$6 = "data-v-8b173f24";
/* functional template */
var __vue_is_functional_template__$6 = false;
/* style inject shadow dom */

var __vue_component__$6 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, undefined, createInjectorSSR, undefined);
var InputArea = __vue_component__$6;//
var script$5 = {
  name: "GalleryView",
  components: {
    LazyImage: LazyImage
  },
  props: {
    messagesWithImages: {
      type: Array,
      required: true
    },
    inboxHelper: {
      type: Object,
      required: true
    },
    store: {
      type: Object,
      required: true
    },
    showLoadMore: {
      type: Boolean,
      required: false
    }
  }
};/* script */
var __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', {
    staticClass: "container gallery-view"
  }, [_vm._ssrNode("<div class=\"row row-cols-2 row-cols-md-4\" data-v-0b96e314>", "</div>", _vm._l(_vm.messagesWithImages, function (msg) {
    return _vm._ssrNode("<div class=\"col mb-2\" data-v-0b96e314>", "</div>", [_c('b-card', {
      staticClass: "h-100",
      attrs: {
        "body-class": "p-0 p-sm-1 p-md-3"
      }
    }, [_c('span', {
      directives: [{
        name: "b-tooltip",
        rawName: "v-b-tooltip.hover",
        modifiers: {
          "hover": true
        }
      }],
      staticClass: "time",
      attrs: {
        "title": _vm.inboxHelper.messageDetailTime(msg)
      }
    }, [_vm._v(_vm._s(_vm.inboxHelper.messageDate(msg)))]), _vm._v(" "), _c('span', {
      staticClass: "status-icon"
    }, [_c('b-icon', {
      attrs: {
        "id": "icon-" + msg.id,
        "icon": _vm.inboxHelper.getIconForStatus(_vm.inboxHelper.statusType(msg)).icon,
        "variant": _vm.inboxHelper.getIconForStatus(_vm.inboxHelper.statusType(msg)).variant
      }
    })], 1), _vm._v(" "), _c('b-popover', {
      attrs: {
        "target": "icon-" + msg.id,
        "title": "Text Message Details",
        "triggers": "click blur",
        "placement": "down"
      },
      scopedSlots: _vm._u([{
        key: "title",
        fn: function fn() {
          return [_vm._v("\n            Text Message Details\n          ")];
        },
        proxy: true
      }], null, true)
    }, [_vm._v(" "), _c('strong', [_vm._v("From:")]), _vm._v(" " + _vm._s(_vm.inboxHelper.formatNumber(msg.from_number))), _c('br'), _vm._v(" "), _c('strong', [_vm._v("To:")]), _vm._v(" " + _vm._s(_vm.inboxHelper.formatNumber(msg.to_number))), _c('br'), _vm._v(" "), _c('strong', [_vm._v("Status:")]), _vm._v(" " + _vm._s(_vm.inboxHelper.messageStatus(msg))), _c('br'), _vm._v(" "), _c('strong', [_vm._v("Sent:")]), _vm._v(" " + _vm._s(_vm.inboxHelper.messageDetailTime(msg)) + "\n          "), msg.metadata ? _c('span', [_c('br'), _c('strong', [_vm._v("Metadata:")]), _vm._v(" " + _vm._s(_vm.inboxHelper.messageMetadata(msg)) + "\n          ")]) : _vm._e()]), _vm._v(" "), _c('ul', {
      staticClass: "list-inline"
    }, _vm._l(msg.media, function (media, idx) {
      return _c('li', {
        key: media.sid,
        staticClass: "cursor-pointer"
      }, [_c('LazyImage', {
        attrs: {
          "store": _vm.store,
          "url": _vm.store.getImageUrl(msg.id, idx),
          "context": "gallery"
        },
        nativeOn: {
          "click": function click($event) {
            return _vm.$emit('openImageLightbox', msg.id, idx);
          }
        }
      })], 1);
    }), 0)], 1)], 1);
  }), 0), _vm._ssrNode(" "), _vm._ssrNode("<div" + _vm._ssrClass("text-center", {
    'invisible': !_vm.showLoadMore
  }) + " data-v-0b96e314>", "</div>", [_c('b-spinner', {
    attrs: {
      "variant": "primary",
      "label": "Spinning"
    }
  })], 1)], 2);
};
var __vue_staticRenderFns__$5 = [];

/* style */
var __vue_inject_styles__$5 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-0b96e314_0", {
    source: ".gallery-view .col[data-v-0b96e314]{padding:0 5px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
var __vue_scope_id__$5 = "data-v-0b96e314";
/* module identifier */
var __vue_module_identifier__$5 = "data-v-0b96e314";
/* functional template */
var __vue_is_functional_template__$5 = false;
/* style inject shadow dom */

var __vue_component__$5 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, createInjectorSSR, undefined);
var GalleryView = __vue_component__$5;//
var script$4 = {
  name: "MessageView",
  components: {
    LazyImage: LazyImage
  },
  props: {
    messagesByDate: {
      type: [Object, Array],
      required: true
    },
    inboxHelper: {
      type: Object,
      required: true
    },
    store: {
      type: Object,
      required: true
    },
    showLoadMore: {
      type: Boolean,
      required: false
    },
    showAiIcon: {
      type: Boolean,
      required: false
    }
  },
  data: function data() {
    return {
      isJustEmoji: isJustEmoji
    };
  },
  methods: {
    selectMessage: function selectMessage(event, msg) {
      if (this.showAiIcon && msg.direction === 'inbound') {
        var _this$$el;
        var previouslySelectedMessage = (_this$$el = this.$el) === null || _this$$el === void 0 ? void 0 : _this$$el.querySelector('.message-container.selected');
        if (previouslySelectedMessage) {
          previouslySelectedMessage.classList.remove('selected');
          this.store.selectedMessage = null;
        }
        if (previouslySelectedMessage !== event.currentTarget) {
          event.currentTarget.classList.add('selected');
          this.store.selectedMessage = msg;
        }
      }
    }
  }
};/* script */
var __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', [_vm.showLoadMore ? _vm._ssrNode("<div class=\"text-center\" data-v-56bf67bc>", "</div>", [_c('b-spinner', {
    attrs: {
      "variant": "primary",
      "label": "Spinning"
    }
  })], 1) : _vm._e(), _vm._ssrNode(" "), _vm._l(_vm.messagesByDate, function (msgs, date) {
    return _vm._ssrNode("<div data-v-56bf67bc>", "</div>", [_vm._ssrNode("<div class=\"date\" data-v-56bf67bc>" + _vm._ssrEscape("\n      " + _vm._s(_vm.inboxHelper.formatDate(date, false)) + "\n    ") + "</div> "), _vm._l(msgs, function (msg) {
      return _vm._ssrNode("<div data-v-56bf67bc>", "</div>", [_vm._ssrNode((msg.sender ? "<div class=\"sender\" data-v-56bf67bc>" + _vm._ssrEscape("\n        " + _vm._s(msg.sender) + "\n      ") + "</div>" : "<!---->") + " "), _vm._ssrNode("<div class=\"message-container\" data-v-56bf67bc>", "</div>", [_vm._ssrNode("<div" + _vm._ssrClass("message", _vm.inboxHelper.messageClasses(msg, _vm.showAiIcon)) + " data-v-56bf67bc>", "</div>", [_c('span', {
        directives: [{
          name: "b-tooltip",
          rawName: "v-b-tooltip.hover",
          modifiers: {
            "hover": true
          }
        }],
        staticClass: "time",
        attrs: {
          "title": _vm.inboxHelper.tooltipTime(msg)
        }
      }, [_vm._ssrNode(_vm._ssrEscape(_vm._s(_vm.inboxHelper.messageTime(msg))))]), _vm._ssrNode(" "), _vm._ssrNode("<span class=\"status-icon\" data-v-56bf67bc>", "</span>", [_c('b-icon', {
        attrs: {
          "id": "icon-" + msg.id,
          "icon": _vm.inboxHelper.getIconForStatus(_vm.inboxHelper.statusType(msg)).icon,
          "variant": _vm.inboxHelper.getIconForStatus(_vm.inboxHelper.statusType(msg)).variant,
          "font-scale": _vm.inboxHelper.getIconForStatus(_vm.inboxHelper.statusType(msg)).scale
        }
      })], 1), _vm._ssrNode(" "), _c('b-popover', {
        attrs: {
          "target": "icon-" + msg.id,
          "title": "Text Message Details",
          "triggers": "click blur",
          "placement": msg.direction === 'inbound' ? 'right' : 'left'
        },
        scopedSlots: _vm._u([{
          key: "title",
          fn: function fn() {
            return [_vm._v("\n              Text Message Details\n            ")];
          },
          proxy: true
        }], null, true)
      }, [_vm._v(" "), _c('strong', [_vm._v("From:")]), _vm._v(" " + _vm._s(_vm.inboxHelper.formatNumber(msg.from_number))), _c('br'), _vm._v(" "), _c('strong', [_vm._v("To:")]), _vm._v(" " + _vm._s(_vm.inboxHelper.formatNumber(msg.to_number))), _c('br'), _vm._v(" "), _c('strong', [_vm._v("Status:")]), _vm._v(" " + _vm._s(_vm.inboxHelper.messageStatus(msg))), _c('br'), _vm._v(" "), _c('strong', [_vm._v("Sent:")]), _vm._v(" " + _vm._s(_vm.inboxHelper.messageDetailTime(msg)) + "\n            "), msg.metadata ? _c('span', [_c('br'), _c('strong', [_vm._v("Metadata:")]), _vm._v(" " + _vm._s(_vm.inboxHelper.messageMetadata(msg)) + "\n            ")]) : _vm._e()]), _vm._ssrNode(" <span" + _vm._ssrClass(null, {
        'emojiOnly': _vm.isJustEmoji(msg.message_text)
      }) + " style=\"white-space: pre-wrap;\" data-v-56bf67bc>" + _vm._ssrEscape(_vm._s(msg.message_text)) + "</span> "), msg.media.length > 0 ? _vm._ssrNode("<ul class=\"list-inline\" data-v-56bf67bc>", "</ul>", _vm._l(msg.media, function (media, idx) {
        return _vm._ssrNode("<li class=\"cursor-pointer\" data-v-56bf67bc>", "</li>", [_c('LazyImage', {
          attrs: {
            "context": "inbox",
            "store": _vm.store,
            "url": _vm.store.getImageUrl(msg.id, idx)
          },
          nativeOn: {
            "click": function click($event) {
              return _vm.$emit('openImageLightbox', msg.id, idx);
            }
          }
        })], 1);
      }), 0) : _vm._e(), _vm._ssrNode(" "), _vm.showAiIcon && msg.direction === 'inbound' && _vm.store.selectedMessage && _vm.store.selectedMessage.id === msg.id ? _vm._ssrNode("<div class=\"stars-container\" data-v-56bf67bc>", "</div>", [_c('b-icon', {
        staticClass: "selected-icon",
        class: {
          'text-muted': _vm.store.loading.suggestResponse
        },
        attrs: {
          "icon": "stars",
          "scale": "2"
        }
      })], 1) : _vm._e()], 2)])], 2);
    })], 2);
  })], 2);
};
var __vue_staticRenderFns__$4 = [];

/* style */
var __vue_inject_styles__$4 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-56bf67bc_0", {
    source: ".date[data-v-56bf67bc]{clear:both;font-size:1.1em;color:gray;text-align:center}.message[data-v-56bf67bc]{position:relative;display:inline-block;min-width:150px;max-width:450px;padding:10px 18px;clear:both;vertical-align:top;border-radius:5px;-webkit-box-shadow:0 0 6px #b2b2b2;box-shadow:0 0 6px #b2b2b2}.emojiOnly[data-v-56bf67bc]{font-size:1.8em}div.sender[data-v-56bf67bc]{float:right;margin:0 20px 0 0;clear:both;font-size:12px;color:#6c6f76}.inbound[data-v-56bf67bc]{float:left;margin:5px 45px 5px 20px;background-color:#bdf9bd}.inbound[data-v-56bf67bc]::before{left:-9px;background-color:#bdf9bd;-webkit-box-shadow:-2px 2px 2px 0 rgba(178,178,178,.4);box-shadow:-2px 2px 2px 0 rgba(178,178,178,.4)}.inbound.ai-suggestion-selectable[data-v-56bf67bc]:hover{box-shadow:0 0 2px 20px rgba(0,100,0,.4)}.message-container.selected .inbound[data-v-56bf67bc]{box-shadow:0 0 2px 20px rgba(190,205,175,.4)}.message-container.selected .message .stars-container[data-v-56bf67bc]{position:absolute;left:100%;top:50%;transform:translateY(-50%);margin-left:25px;background:linear-gradient(135deg,#6366f1 0,#8b5cf6 25%,#d1d5db 50%,#6366f1 75%,#8b5cf6 100%);padding:12px;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.1);width:40px;height:40px;display:flex;align-items:center;justify-content:center;background-size:400% 400%;cursor:pointer;transition:transform .2s ease}.message-container.selected .message .stars-container[data-v-56bf67bc]:hover:not(:has(.text-muted)){transform:translateY(-50%) scale(1.1);box-shadow:0 4px 8px rgba(0,0,0,.2)}.message-container.selected .message .stars-container[data-v-56bf67bc]:has(.text-muted){animation:gradientShift-data-v-56bf67bc 3s ease-in-out infinite}@keyframes gradientShift-data-v-56bf67bc{0%{background-position:0 50%}50%{background-position:100% 50%}100%{background-position:0 50%}}.message-container.selected .selected-icon[data-v-56bf67bc]{color:#fff;font-size:.875rem;margin:0;padding:0}.message[data-v-56bf67bc]::before{position:absolute;top:11px;display:block;width:20px;height:16px;content:\"\\00a0\";-webkit-transform:rotate(29deg) skew(-35deg);-moz-transform:rotate(29deg) skew(-35deg);-ms-transform:rotate(29deg) skew(-35deg);-o-transform:rotate(29deg) skew(-35deg);transform:rotate(29deg) skew(-35deg)}.outbound[data-v-56bf67bc]{float:right;margin:5px 20px 5px 45px;background-color:#badfff}.outbound[data-v-56bf67bc]::before{right:-9px;-webkit-box-shadow:2px -2px 2px 0 rgb(178 178 178 / 40%);box-shadow:2px -2px 2px 0 rgb(178 178 178 / 40%);background-color:#badfff}.outbound.automated[data-v-56bf67bc],.outbound.automated[data-v-56bf67bc]::before{background-color:#e0f1ff}.outbound.manual[data-v-56bf67bc],.outbound.manual[data-v-56bf67bc]::before{background-color:#badfff}.message-container[data-v-56bf67bc]{position:relative;display:inline-block;width:100%}.message-container .inbound[data-v-56bf67bc]{float:left}.message-container .outbound[data-v-56bf67bc]{float:right}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
var __vue_scope_id__$4 = "data-v-56bf67bc";
/* module identifier */
var __vue_module_identifier__$4 = "data-v-56bf67bc";
/* functional template */
var __vue_is_functional_template__$4 = false;
/* style inject shadow dom */

var __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, createInjectorSSR, undefined);
var MessageView = __vue_component__$4;//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$3 = {
  name: "ManualModeWarningModal",
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  }
};/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('b-modal', _vm._g({
    attrs: {
      "title": "WARNING!",
      "visible": _vm.visible
    }
  }, _vm.$listeners), [_c('p', [_c('strong', [_vm._v("You are about to disable automated messaging for this participant.")])]), _vm._v(" "), _c('p', [_vm._v("By disabling automated messaging:")]), _vm._v(" "), _c('ul', [_c('li', [_vm._v("Any open conversations will be stopped")]), _vm._v(" "), _c('li', [_vm._v("Scheduled text messages and conversations will not be sent to the participant")]), _vm._v(" "), _c('li', [_vm._v("Text messages sent via logic will not be sent to the participants")]), _vm._v(" "), _c('li', [_vm._v("Incoming text messages from the participant will not be processed by configured Responses")]), _vm._v(" "), _c('li', [_vm._v("\n      Incidents that would be created if an incoming message triggered a configured Response will not be created\n    ")])]), _vm._v(" "), _c('p', [_vm._v("Automated messaging will remain disabled until manually re-enabled, or 15 minutes of inactivity.")]), _vm._v(" "), _c('p', [_c('strong', [_vm._v("By clicking \"OK\", you are accepting responsibility for the above operations normally performed by the\n      system.")])])]);
};
var __vue_staticRenderFns__$3 = [];

/* style */
var __vue_inject_styles__$3 = undefined;
/* scoped */
var __vue_scope_id__$3 = undefined;
/* module identifier */
var __vue_module_identifier__$3 = "data-v-6c4248a6";
/* functional template */
var __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);
var ManualModeWarningModal = __vue_component__$3;//
var script$2 = {
  name: "ManualModeToggle",
  components: {
    ManualModeWarningModal: ManualModeWarningModal
  },
  props: {
    store: {
      type: Object,
      required: true
    },
    helper: {
      type: Object,
      required: true
    }
  },
  data: function data() {
    return {
      showWarningModal: false
    };
  },
  mounted: function mounted() {
    var _this = this;
    // force updating for the sake of the relative timer which isn't easy to make reactive
    setInterval(function () {
      _this.$forceUpdate();
    }, 30 * 1000);
  },
  methods: {
    toggleManualMode: function toggleManualMode(val) {
      var mode = val ? 'Automated' : 'Manual';
      if (mode === 'Manual') {
        this.showWarningModal = true;
      } else {
        this.store.disableManualMode();
      }
    }
  }
};/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', {
    staticClass: "mt-2"
  }, [_c('ManualModeWarningModal', {
    attrs: {
      "visible": _vm.showWarningModal
    },
    on: {
      "ok": function ok($event) {
        return _vm.store.enableManualMode();
      }
    }
  }), _vm._ssrNode(" "), _vm.helper.session ? _c('b-form-checkbox', {
    attrs: {
      "checked": !_vm.helper.isManualModeActive,
      "switch": ""
    },
    on: {
      "change": _vm.toggleManualMode
    }
  }, [_vm._v("\n    Automated Messaging Mode\n  ")]) : _vm._e(), _vm._ssrNode(" "), _vm.helper.isManualModeActive ? _vm._ssrNode("<div class=\"alert alert-warning\">", "</div>", [_vm._ssrNode("<strong>All automated text message processing is temporarily disabled</strong>, including conversations\n    (scheduled or ongoing), auto-responders, and incidents. Automated messaging mode will resume\n    in "), _c('abbr', {
    directives: [{
      name: "b-tooltip",
      rawName: "v-b-tooltip"
    }],
    attrs: {
      "title": _vm.helper.manualModeExpiration
    }
  }, [_vm._ssrNode(_vm._ssrEscape(_vm._s(_vm.helper.sessionTimeRemaining)))]), _vm._ssrNode(".\n  ")], 2) : _vm.helper.isConversationActive ? _vm._ssrNode("<div class=\"alert alert-warning\"><strong>" + _vm._ssrEscape(_vm._s(_vm.helper.conversationName)) + "</strong> conversation in progress until\n    <strong>" + _vm._ssrEscape(_vm._s(_vm.helper.conversationExpiration)) + "</strong>. Disabling\n    &quot;Automated Messaging Mode&quot; will stop this conversation and any automated responses.\n  </div>") : _vm.helper.isAutomatedModeActive ? _vm._ssrNode("<div class=\"alert alert-success\">\n    Any incoming texts from this participant will be processed by the study's configured message handlers.\n  </div>") : _vm._e()], 2);
};
var __vue_staticRenderFns__$2 = [];

/* style */
var __vue_inject_styles__$2 = undefined;
/* scoped */
var __vue_scope_id__$2 = undefined;
/* module identifier */
var __vue_module_identifier__$2 = "data-v-b1e399d8";
/* functional template */
var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);
var ManualModeToggle = __vue_component__$2;//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$1 = {
  name: "AiResponseRequestRejectModal",
  props: {
    store: {
      type: Object,
      required: true
    }
  },
  data: function data() {
    return {
      rejectComment: null,
      otherValue: null,
      rejectOptions: [{
        value: null,
        text: 'Please select an option'
      }, {
        value: 'incorrect',
        text: 'The response is factually incorrect'
      }, {
        value: 'incomplete',
        text: 'The response is incomplete'
      }, {
        value: 'other',
        text: 'Other'
      }]
    };
  },
  methods: {
    onSubmit: function onSubmit() {
      var _this = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var rejectComment;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                rejectComment = _this.rejectComment;
                if (rejectComment === 'other') {
                  rejectComment = _this.otherValue;
                }
                _this.$emit('submit', rejectComment);
              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }
};/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('b-modal', {
    attrs: {
      "id": "reject-comment-modal",
      "title": "Reject AI Suggested Response"
    },
    scopedSlots: _vm._u([{
      key: "modal-footer",
      fn: function fn(ref) {
        ref.ok;
        var cancel = ref.cancel;
        return [_c('b-button', {
          attrs: {
            "size": "sm",
            "variant": "success"
          },
          on: {
            "click": _vm.onSubmit
          }
        }, [_vm._v("\n      Submit\n    ")]), _vm._v(" "), _c('b-button', {
          attrs: {
            "size": "sm",
            "variant": "danger"
          },
          on: {
            "click": function click($event) {
              return cancel();
            }
          }
        }, [_vm._v("\n      Cancel\n    ")])];
      }
    }])
  }, [_c('p', [_c('strong', [_vm._v("Please select a reason for rejecting this response and click submit.")])]), _vm._v(" "), _c('b-form-select', {
    attrs: {
      "options": _vm.rejectOptions
    },
    model: {
      value: _vm.rejectComment,
      callback: function callback($$v) {
        _vm.rejectComment = $$v;
      },
      expression: "rejectComment"
    }
  }), _vm._v(" "), _vm.rejectComment === 'other' ? _c('b-form-input', {
    staticClass: "mt-2",
    attrs: {
      "placeholder": "Enter reason for rejection"
    },
    model: {
      value: _vm.otherValue,
      callback: function callback($$v) {
        _vm.otherValue = $$v;
      },
      expression: "otherValue"
    }
  }) : _vm._e()], 1);
};
var __vue_staticRenderFns__$1 = [];

/* style */
var __vue_inject_styles__$1 = undefined;
/* scoped */
var __vue_scope_id__$1 = undefined;
/* module identifier */
var __vue_module_identifier__$1 = "data-v-354f32fa";
/* functional template */
var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);
var AiResponseRequestRejectModal = __vue_component__$1;var script = {
  name: "InboxComponent",
  components: {
    ManualModeToggle: ManualModeToggle,
    GalleryView: GalleryView,
    InputArea: InputArea,
    ImageLightbox: ImageLightbox,
    MessageView: MessageView,
    AiResponseRequestRejectModal: AiResponseRequestRejectModal
  },
  props: {
    auth: {
      type: Object,
      required: false,
      default: function _default() {
        return {
          method: "session",
          apiKey: ""
        };
      }
    },
    pollFrequencySeconds: {
      type: Number,
      required: false,
      default: 10
    },
    apiBaseUrl: {
      type: String,
      required: true
    },
    studyId: {
      type: Number,
      required: true
    },
    participantId: {
      type: Number,
      required: true
    },
    resource: {
      type: String,
      default: "participants",
      validator: function validator(value) {
        // The value must match one of these
        return ['participants', 'support_partners'].includes(value);
      }
    },
    imageUploadEnabled: {
      type: Boolean,
      default: false
    },
    manualModeEnabled: {
      type: Boolean,
      default: false
    },
    aiSuggestionsEnabled: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    styles: {
      type: Object,
      required: false,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      scrolled: false,
      styleConfig: Object.assign(styles$1, this.styles),
      store: null,
      inboxHelper: inboxHelper,
      manualModeHelper: manualModeHelper,
      textContent: "",
      imageUrl: "",
      imageName: "",
      showImageUploader: false,
      showImageLightbox: false,
      galleryView: false
    };
  },
  computed: {
    disableTextInput: function disableTextInput() {
      return !!this.store.loading.send || !!this.store.loading.suggestResponse || !!this.store.loading.refreshResponse;
    },
    sortedMessages: function sortedMessages() {
      if (Object.keys(this.store.messagesObj).length > 0) {
        return this.inboxHelper.sortMessages(Object.values(this.store.messagesObj));
      }
      return [];
    },
    messagesByDate: function messagesByDate() {
      if (this.sortedMessages.length) {
        return this.sortedMessages.reduce(function (rv, x) {
          (rv[x['created_at'].split(" ")[0]] = rv[x['created_at'].split(" ")[0]] || []).push(x);
          return rv;
        }, {});
      }
      return [];
    },
    messagesWithImages: function messagesWithImages() {
      return Object.values(this.store.messagesObj).filter(function (msg) {
        return msg.media.length > 0;
      }).reverse();
    },
    latestMessageId: function latestMessageId() {
      return Math.max.apply(Math, _toConsumableArray(Object.keys(this.store.messagesObj)));
    }
  },
  watch: {
    latestMessageId: function latestMessageId() {
      var _this = this;
      this.$nextTick(function () {
        _this.scrollToNewest('smooth');
      });
    },
    galleryView: function galleryView() {
      var _this2 = this;
      // scroll to newest when changing views
      this.$nextTick(function () {
        _this2.scrollToNewest();
      });
    }
  },
  created: function created() {
    var _this3 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this3.store = new InboxStore$1(_this3.apiBaseUrl, _this3.participantId, _this3.resource, _this3.studyId, _this3.auth);
              _this3.store.loadMessages().then(function () {
                _this3.scrollToNewest();
              }).catch(function (e) {
                // TODO: proper error handling
                console.log(e);
              });
            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  mounted: function mounted() {
    // Only scroll on first mount - if we e.g. switch back and forth between tabs, on subsequent mounts
    // it should stay where we were
    if (!this.scrolled) {
      this.scrollToNewest();
      this.scrolled = true;
    }
    this.handleLoadMore();
    this.poll();
  },
  methods: {
    attachImage: function attachImage(url) {
      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Attachment";
      this.imageUrl = url;
      this.imageName = name;
    },
    removeAttachment: function removeAttachment() {
      this.imageUrl = '';
      this.imageName = '';
    },
    openImageUpload: function openImageUpload() {
      this.showImageUploader = true;
    },
    openImageLightbox: function openImageLightbox(msgId, imageIndex) {
      this.showImageLightbox = true;
      this.$refs.imageLightbox.open(msgId, imageIndex, this.galleryView);
    },
    openRejectCommentModal: function openRejectCommentModal() {
      this.$bvModal.show('reject-comment-modal');
    },
    scrollToNewest: function scrollToNewest() {
      var behavior = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';
      var el = this.$el.querySelector('.inbox');
      var scrollToOffset = this.galleryView ? 0 : el.scrollHeight;
      if (el.scrollTo) {
        el.scrollTo({
          top: scrollToOffset,
          behavior: behavior
        });
      } else {
        // IE fallback
        el.scrollTop = scrollToOffset;
      }
    },
    handleLoadMore: function handleLoadMore() {
      var _this$$el,
        _this4 = this;
      var inboxDiv = (_this$$el = this.$el) === null || _this$$el === void 0 ? void 0 : _this$$el.querySelector('.inbox');
      inboxDiv.onscroll = function () {
        if (inboxDiv) {
          if (_this4.galleryView) {
            if (inboxDiv.scrollTop >= inboxDiv.scrollHeight - inboxDiv.clientHeight - 1) {
              _this4.store.loadOlder();
            }
          } else {
            if (inboxDiv.scrollTop === 0) {
              _this4.store.loadOlder();
            }
          }
        }
      };
    },
    sendMessage: function sendMessage() {
      var _this5 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(_this5.textContent.length || _this5.imageUrl)) {
                  _context2.next = 7;
                  break;
                }
                _context2.next = 3;
                return _this5.store.sendMessage(_this5.textContent, _this5.imageUrl);
              case 3:
                _this5.scrollToNewest('smooth');
                _this5.textContent = "";
                _this5.imageUrl = '';
                _this5.imageName = '';
              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    sendSuggestedResponse: function sendSuggestedResponse() {
      var _this6 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var _this6$$el;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(_this6.textContent.length && _this6.store.aiGeneratedResponse)) {
                  _context3.next = 8;
                  break;
                }
                _context3.next = 3;
                return _this6.store.sendSuggestedMessage(_this6.textContent, _this6.imageUrl);
              case 3:
                (_this6$$el = _this6.$el) === null || _this6$$el === void 0 ? void 0 : _this6$$el.querySelector('.message-container.selected').classList.remove('selected');
                _this6.scrollToNewest('smooth');
                _this6.textContent = "";
                _this6.imageUrl = '';
                _this6.imageName = '';
              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    rejectSuggestedResponse: function rejectSuggestedResponse(comment) {
      var _this7 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var _this7$$el;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!_this7.store.aiGeneratedResponse) {
                  _context4.next = 8;
                  break;
                }
                _context4.next = 3;
                return _this7.store.rejectSuggestedMessage(comment);
              case 3:
                (_this7$$el = _this7.$el) === null || _this7$$el === void 0 ? void 0 : _this7$$el.querySelector('.message-container.selected').classList.remove('selected');
                _this7.textContent = "";
                _this7.imageUrl = '';
                _this7.imageName = '';
                _this7.$bvModal.hide('reject-comment-modal');
              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    refreshSuggestedResponse: function refreshSuggestedResponse() {
      var _this8 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _this8.store.refreshSuggestedMessage();
              case 2:
                _this8.textContent = _this8.store.aiGeneratedResponse.response;
              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    suggestResponse: function suggestResponse() {
      var _this9 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _this9.store.suggestResponse();
              case 2:
                _this9.textContent = _this9.store.aiGeneratedResponse.response;
              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    poll: function poll() {
      var _this10 = this;
      setTimeout(function () {
        _this10.store.poll();
        _this10.poll();
      }, this.pollFrequencySeconds * 1000);
    }
  }
};/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', {
    staticClass: "inbox-component"
  }, [_vm._ssrNode("<div class=\"float-right\" data-v-38d8394c>", "</div>", [_c('b-form-checkbox', {
    staticClass: "float-right mr-2",
    attrs: {
      "switch": ""
    },
    model: {
      value: _vm.galleryView,
      callback: function callback($$v) {
        _vm.galleryView = $$v;
      },
      expression: "galleryView"
    }
  }, [_vm._v("\n      Media View\n    ")])], 1), _vm._ssrNode(" <p data-v-38d8394c>" + _vm._ssrEscape("\n    All texts are displayed in the participant's current time zone: " + _vm._s(_vm.inboxHelper.getFriendlyTimezoneName()) + "\n  ") + "</p> "), _vm._ssrNode("<div data-v-38d8394c>", "</div>", [_vm._ssrNode("<div class=\"inbox clearfix\" data-v-38d8394c>", "</div>", [_vm.galleryView ? _c('GalleryView', {
    attrs: {
      "messages-with-images": _vm.messagesWithImages,
      "store": _vm.store,
      "inbox-helper": _vm.inboxHelper,
      "show-load-more": _vm.store.loading.older
    },
    on: {
      "openImageLightbox": _vm.openImageLightbox
    }
  }) : _c('MessageView', {
    attrs: {
      "messages-by-date": _vm.messagesByDate,
      "inbox-helper": _vm.inboxHelper,
      "store": _vm.store,
      "show-load-more": _vm.store.loading.older,
      "show-ai-icon": !_vm.readOnly && _vm.aiSuggestionsEnabled
    },
    on: {
      "openImageLightbox": _vm.openImageLightbox,
      "suggestResponse": _vm.suggestResponse
    }
  })], 1)]), _vm._ssrNode(" "), _c('ImageLightbox', {
    ref: "imageLightbox",
    attrs: {
      "store": _vm.store
    },
    model: {
      value: _vm.showImageLightbox,
      callback: function callback($$v) {
        _vm.showImageLightbox = $$v;
      },
      expression: "showImageLightbox"
    }
  }), _vm._ssrNode(" "), _vm.manualModeEnabled ? _c('ManualModeToggle', {
    attrs: {
      "store": _vm.store,
      "helper": _vm.manualModeHelper
    }
  }) : _vm._e(), _vm._ssrNode(" "), _c('AiResponseRequestRejectModal', {
    attrs: {
      "store": _vm.store
    },
    on: {
      "submit": _vm.rejectSuggestedResponse
    }
  }), _vm._ssrNode(" "), !_vm.readOnly ? _vm._ssrNode("<div data-v-38d8394c>", "</div>", [_vm._t("imagePicker", null, {
    "attachImage": _vm.attachImage,
    "onClose": function onClose() {
      return _vm.showImageUploader = false;
    },
    "isOpen": _vm.showImageUploader
  }), _vm._ssrNode(" "), _c('InputArea', {
    attrs: {
      "disabled": _vm.disableTextInput,
      "show-image-upload-invoker": _vm.imageUploadEnabled && !_vm.imageUrl
    },
    on: {
      "openImageUpload": function openImageUpload($event) {
        _vm.showImageUploader = true;
      }
    },
    model: {
      value: _vm.textContent,
      callback: function callback($$v) {
        _vm.textContent = $$v;
      },
      expression: "textContent"
    }
  }), _vm._ssrNode(" "), !_vm.store.aiGeneratedResponse ? _vm._ssrNode("<div class=\"inbox-action-items\" data-v-38d8394c>", "</div>", [_vm._ssrNode((_vm.imageUrl ? "<div data-v-38d8394c><h4 data-v-38d8394c>Attachments</h4> <ul class=\"list-unstyled\" data-v-38d8394c><li data-v-38d8394c><span class=\"filename\" data-v-38d8394c>" + _vm._ssrEscape(_vm._s(_vm.imageName)) + "</span> <button type=\"button\" class=\"btn btn-link\" data-v-38d8394c><span class=\"fa fa-trash text-danger\" data-v-38d8394c></span> <span class=\"sr-only\" data-v-38d8394c>Remove</span></button></li></ul></div>" : "<!---->") + " "), !_vm.store.loading.send ? _vm._ssrNode("<input type=\"submit\" value=\"Send SMS Message\"" + _vm._ssrAttr("disabled", _vm.store.loading.send) + _vm._ssrClass(null, _vm.styleConfig.inboxSubmit) + " data-v-38d8394c>", "</input>") : _vm._ssrNode("<div" + _vm._ssrClass("disabled", _vm.styleConfig.inboxSubmit) + " data-v-38d8394c>", "</div>", [_vm._ssrNode("\n        Send SMS Message\n        "), _c('b-spinner', {
    attrs: {
      "small": "",
      "variant": "light",
      "label": "Spinning"
    }
  })], 2), _vm._ssrNode(" "), _vm.aiSuggestionsEnabled && _vm.store.selectedMessage && !_vm.store.loading.suggestResponse ? _vm._ssrNode("<input type=\"submit\" value=\"Suggest Response\"" + _vm._ssrAttr("disabled", _vm.store.loading.suggestResponse && !_vm.store.selectedMessage) + _vm._ssrClass(null, [_vm.styleConfig.inboxSuggestResponse, 'suggest-response-button', {
    'selected': _vm.store.selectedMessage,
    'loading': _vm.store.loading.suggestResponse
  }]) + " data-v-38d8394c>", "</input>") : _vm.aiSuggestionsEnabled && !_vm.store.selectedMessage || _vm.store.loading.suggestResponse ? _vm._ssrNode("<div id=\"ai-response-info\"" + _vm._ssrClass(null, [_vm.styleConfig.inboxSuggestResponse, 'suggest-response-button', {
    'selected': _vm.store.selectedMessage,
    'loading': _vm.store.loading.suggestResponse
  }]) + " data-v-38d8394c>", "</div>", [_vm._ssrNode("\n        Suggest Response\n        "), _vm.store.loading.suggestResponse ? _c('b-spinner', {
    attrs: {
      "small": "",
      "variant": "light",
      "label": "Spinning"
    }
  }) : _vm._e(), _vm._ssrNode(" "), !_vm.store.selectedMessage ? _vm._ssrNode("<span data-v-38d8394c>", "</span>", [_c('b-icon', {
    staticClass: "ml-1",
    attrs: {
      "id": "ai-response-info-icon",
      "icon": "info-circle-fill",
      "variant": "dark",
      "font-scale": "1"
    }
  })], 1) : _vm._e(), _vm._ssrNode(" "), _c('b-popover', {
    attrs: {
      "target": "ai-response-info",
      "title": "AI generated responses are enabled",
      "triggers": "click blur",
      "placement": "right"
    }
  }, [_vm._v("\n          Select an inbound message above and click \"Suggest Response\" to generate a response.\n        ")])], 2) : _vm._e()], 2) : _vm._ssrNode("<div class=\"inbox-action-items mt-1\" data-v-38d8394c>", "</div>", [_c('b-button', {
    attrs: {
      "variant": "primary",
      "disabled": _vm.store.loading.send
    },
    on: {
      "click": _vm.sendSuggestedResponse
    }
  }, [_c('b-icon', {
    attrs: {
      "icon": "hand-thumbs-up"
    }
  }), _vm._v("\n        Send\n      ")], 1), _vm._ssrNode(" "), _c('b-button', {
    attrs: {
      "variant": "danger",
      "disabled": _vm.store.loading.send
    },
    on: {
      "click": _vm.openRejectCommentModal
    }
  }, [_c('b-icon', {
    attrs: {
      "icon": "hand-thumbs-down"
    }
  }), _vm._v("\n        Reject\n      ")], 1), _vm._ssrNode(" "), _c('b-button', {
    class: {
      'refresh-button': true,
      'selected': _vm.store.selectedMessage,
      'loading': _vm.store.loading.refreshResponse
    },
    attrs: {
      "variant": "secondary",
      "disabled": _vm.store.loading.send
    },
    on: {
      "click": _vm.refreshSuggestedResponse
    }
  }, [_c('b-icon', {
    attrs: {
      "icon": "recycle"
    }
  }), _vm._v("\n        Refresh\n        "), _vm.store.loading.refreshResponse ? _c('b-spinner', {
    attrs: {
      "small": "",
      "variant": "light",
      "label": "Spinning"
    }
  }) : _vm._e()], 1)], 2)], 2) : _vm._e()], 2);
};
var __vue_staticRenderFns__ = [];

/* style */
var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-38d8394c_0", {
    source: ".inbox[data-v-38d8394c]{max-height:60vh;min-height:60vh;overflow-x:hidden;overflow-y:scroll;border-bottom:2px solid rgba(0,0,0,.2)}@media print{.inbox[data-v-38d8394c]{max-height:none;height:auto}}[data-v-38d8394c] .time{float:right;margin:0 3px 0;color:gray}[data-v-38d8394c] .status-icon{float:left;cursor:pointer;margin:0 3px 0}[data-v-38d8394c] .cursor-pointer{cursor:pointer}[data-v-38d8394c] .suggest-response-button{border:none;padding:8px 16px;border-radius:4px;cursor:pointer;transition:all .3s ease}[data-v-38d8394c] .suggest-response-button.selected{background:linear-gradient(135deg,#6366f1 0,#8b5cf6 25%,#d1d5db 50%,#6366f1 75%,#8b5cf6 100%);background-size:400% 400%;color:#fff}[data-v-38d8394c] .suggest-response-button.selected.loading{animation:gradientShift-data-v-38d8394c 3s ease-in-out infinite}@keyframes gradientShift-data-v-38d8394c{0%{background-position:0 50%}50%{background-position:100% 50%}100%{background-position:0 50%}}[data-v-38d8394c] .refresh-button{border:none;padding:8px 16px;border-radius:4px;cursor:pointer;transition:all .3s ease}[data-v-38d8394c] .refresh-button.selected{background:linear-gradient(135deg,#6366f1 0,#8b5cf6 25%,#d1d5db 50%,#6366f1 75%,#8b5cf6 100%);background-size:400% 400%;color:#fff}[data-v-38d8394c] .refresh-button.selected.loading{animation:gradientShift-data-v-38d8394c 3s ease-in-out infinite}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
var __vue_scope_id__ = "data-v-38d8394c";
/* module identifier */
var __vue_module_identifier__ = "data-v-38d8394c";
/* functional template */
var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);
var component$1 = __vue_component__;// Import vue component

// Declare install function executed by Vue.use()
function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('InboxComponent', component$1);
}

// Create module definition for Vue.use()
var plugin = {
  install: install
};

// Auto-install when vue is found (eg. in browser via <script> tag)
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,install:install,'default':component$1});// Attach named exports directly to component. IIFE/CJS will
// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)
Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    exportName = _ref2[0],
    exported = _ref2[1];
  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component$1;