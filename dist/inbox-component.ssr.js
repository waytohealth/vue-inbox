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
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
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

var dayjs = dayjs_min;var appState = {
  messagesObj: {},
  apiBaseUrl: null,
  participantId: null,
  studyId: null,
  auth: {
    method: "session",
    apiKey: ""
  },
  meta: {
    lastUpdated: null,
    updates: false,
    oldest: null,
    limit: 20
  },
  loading: {
    older: false,
    initial: false,
    polling: false,
    send: false
  },
  authCredentials: function authCredentials() {
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
  },
  fetchImage: function fetchImage(url) {
    var _this = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var auth, requestParams, res, blob;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              auth = _this.authCredentials();
              requestParams = Object.assign(auth, {
                method: "GET"
              });
              _context.next = 4;
              return fetch(url, requestParams);
            case 4:
              res = _context.sent;
              _context.next = 7;
              return res.blob();
            case 7:
              blob = _context.sent;
              return _context.abrupt("return", URL.createObjectURL(blob));
            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  fetchMessages: function fetchMessages(params) {
    var _arguments = arguments,
      _this2 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var update, auth, requestParams, search, res, messages, newMessages;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              update = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : true;
              auth = _this2.authCredentials();
              requestParams = Object.assign(auth, {
                method: "GET"
              });
              search = new URLSearchParams(Object.assign({
                study_id: _this2.studyId,
                participant_id: _this2.participantId,
                order_by: 'desc(id)',
                per_page: _this2.meta.limit
              }, params));
              _context2.next = 6;
              return fetch("".concat(_this2.apiBaseUrl, "/api/v2/text_messages?") + search, requestParams);
            case 6:
              res = _context2.sent;
              if (res.ok) {
                _context2.next = 9;
                break;
              }
              throw new Error("womp");
            case 9:
              if (update) {
                // Our API call finds items updated after the lastUpdated, so if the lastUpdated matched the updated_at
                // of a text we wouldn't get it. Move the search back by a second to account for that
                _this2.meta.lastUpdated = dayjs().subtract(1, 'second').format('YYYY-MM-DD HH:mm:ss');
              }
              _context2.next = 12;
              return res.json();
            case 12:
              messages = _context2.sent.data;
              if (messages.length) {
                newMessages = messages.reduce(function (accumulator, text) {
                  if (!_this2.meta.oldest || text.created_at < _this2.meta.oldest) {
                    _this2.meta.oldest = text.created_at;
                  }
                  return _objectSpread2(_objectSpread2({}, accumulator), {}, _defineProperty({}, text.id, text));
                }, {});
                _this2.messagesObj = Object.assign({}, _this2.messagesObj, newMessages);
              }
              return _context2.abrupt("return", messages);
            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  loadMessages: function loadMessages() {
    var _this3 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!_this3.loading.initial) {
                _context3.next = 2;
                break;
              }
              return _context3.abrupt("return", false);
            case 2:
              _this3.loading.initial = true;
              _context3.next = 5;
              return _this3.fetchMessages();
            case 5:
              _this3.loading.initial = false;
            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  poll: function poll() {
    var _this4 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var params, messages;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!_this4.loading.polling) {
                _context4.next = 2;
                break;
              }
              return _context4.abrupt("return", false);
            case 2:
              params = {
                updated_at: 'after(' + _this4.meta.lastUpdated + ')'
              };
              _this4.loading.polling = true;
              _context4.next = 6;
              return _this4.fetchMessages(params);
            case 6:
              messages = _context4.sent;
              _this4.loading.polling = false;
              if (messages.length) {
                _this4.meta.updates = true;
              }
            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  loadOlder: function loadOlder() {
    var _this5 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      var params;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!_this5.loading.older) {
                _context5.next = 2;
                break;
              }
              return _context5.abrupt("return", false);
            case 2:
              params = {
                created_at: 'before(' + _this5.meta.oldest + ')'
              };
              _this5.loading.older = true;
              _context5.next = 6;
              return _this5.fetchMessages(params, false);
            case 6:
              _this5.loading.older = false;
            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },
  sendMessage: function sendMessage(message) {
    var _this6 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      var body, auth, requestParams, res, text, obj;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!_this6.loading.send) {
                _context6.next = 2;
                break;
              }
              return _context6.abrupt("return", false);
            case 2:
              body = {
                message_text: message
              };
              auth = _this6.authCredentials();
              requestParams = Object.assign(auth, {
                method: "POST",
                body: JSON.stringify(body)
              });
              _this6.loading.send = true;
              _context6.next = 8;
              return fetch("".concat(_this6.apiBaseUrl, "/api/v2/participants/").concat(_this6.participantId, "/text_messages"), requestParams);
            case 8:
              res = _context6.sent;
              if (res.ok) {
                _context6.next = 12;
                break;
              }
              _this6.loading.older = false;
              throw new Error("womp");
            case 12:
              _context6.next = 14;
              return res.json();
            case 14:
              text = _context6.sent.data;
              obj = {};
              obj[text.id] = text;
              _this6.messagesObj = Object.assign({}, _this6.messagesObj, obj);
              _this6.meta.updates = true;
              _this6.loading.send = false;
            case 20:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  }
};
var store = appState;var styles = {
  inboxSubmit: "btn px-4 btn-primary"
};
var styles$1 = styles;var helper = {
  statusType: function statusType(msg) {
    switch (msg.status) {
      case 'delivered':
      case 'completed':
      case 'sent':
      case 'received':
        return 'success';
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
    return dayjs(datetime).format('h:mm A');
  },
  tooltipTime: function tooltipTime(msg) {
    var datetime = msg.sent_at || msg.created_at;
    return dayjs(datetime).format('h:mm:ss A');
  },
  messageDetailTime: function messageDetailTime(msg) {
    var datetime = msg.sent_at || msg.created_at;
    return dayjs(datetime).format('M/D/YY h:mm:ss A');
  },
  formatDate: function formatDate(date) {
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
  messageClasses: function messageClasses(msg) {
    var classes = [];
    classes.push(msg.direction == 'inbound' ? 'inbound' : 'outbound');
    classes.push(msg.sender ? 'manual' : 'automated');
    return classes;
  },
  messageStatus: function messageStatus(msg) {
    switch (msg.status) {
      case 'queued':
      case 'accepted':
        return 'Text message queued for delivery';
      case 'delivered':
      case 'sent':
        return 'Text message delivered to carrier';
      case 'failed':
      case 'undelivered':
        return "Text message was not delivered. Error " + msg.error_code + ": " + msg.error_message;
      default:
        return msg.status;
    }
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
  }
};
var inboxHelper = helper;//
//
//
//
//
//
//
//
//

var script$1 = {
  name: "LazyImage",
  props: {
    store: {
      type: Object,
      reruired: true
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
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', [_vm.src ? _vm._ssrNode("<img" + _vm._ssrAttr("src", _vm.src) + " class=\"inbox-img\" data-v-0fc50674>", "</img>") : _vm._ssrNode("<div class=\"inbox-img\" data-v-0fc50674>", "</div>", [_c('b-spinner', {
    attrs: {
      "variant": "primary",
      "label": "Spinning"
    }
  })], 1)]);
};
var __vue_staticRenderFns__$1 = [];

/* style */
var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-0fc50674_0", {
    source: ".inbox-img[data-v-0fc50674]{width:200px;height:200px;margin:20px 0;text-align:center;background-repeat:no-repeat;background-position:50% 50%;-webkit-background-size:cover;background-size:cover}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
var __vue_scope_id__$1 = "data-v-0fc50674";
/* module identifier */
var __vue_module_identifier__$1 = "data-v-0fc50674";
/* functional template */
var __vue_is_functional_template__$1 = false;
/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, createInjectorSSR, undefined);
var LazyImage = __vue_component__$1;var script = {
  name: "InboxComponent",
  components: {
    LazyImage: LazyImage
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
    styles: {
      type: Object,
      required: false
    }
  },
  data: function data() {
    return {
      scrolled: false,
      styleConfig: Object.assign(styles$1, this.styles),
      store: store,
      inboxHelper: inboxHelper,
      textContent: ""
    };
  },
  created: function created() {
    var _this = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.store.apiBaseUrl = _this.apiBaseUrl;
              _this.store.participantId = _this.participantId;
              _this.store.studyId = _this.studyId;
              _this.store.auth = _this.auth;
              _this.loading = true;
              _this.store.loadMessages().then(function () {
                _this.loading = false;
                _this.scrollToBottom();
              }).catch(function (e) {
                // TODO: proper error handling
                console.log(e);
                _this.loading = false;
              });
            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  mounted: function mounted() {
    this.scrollToBottom();
    this.handleTop();
    this.poll();
  },
  computed: {
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
    }
  },
  watch: {
    sortedMessages: function sortedMessages(newObj, oldObj) {
      var _this2 = this;
      if (newObj.length > oldObj.length && store.meta.updates) {
        this.$nextTick(function () {
          _this2.scrollToBottom(true);
        });
      }
      store.meta.updates = false;
    }
  },
  methods: {
    scrollToBottom: function scrollToBottom(force) {
      if (!this.scrolled || force) {
        var _this$$el$querySelect, _this$$el$querySelect2;
        var lastMessage = (_this$$el$querySelect = this.$el.querySelector('.inbox')) === null || _this$$el$querySelect === void 0 ? void 0 : (_this$$el$querySelect2 = _this$$el$querySelect.lastElementChild) === null || _this$$el$querySelect2 === void 0 ? void 0 : _this$$el$querySelect2.lastElementChild;
        if (lastMessage) {
          lastMessage.scrollIntoView();
          this.scrolled = true;
        } else {
          console.log("Failed to find last element");
        }
      }
    },
    handleTop: function handleTop() {
      var _this$$el;
      var inboxDiv = (_this$$el = this.$el) === null || _this$$el === void 0 ? void 0 : _this$$el.querySelector('.inbox');
      inboxDiv.onscroll = function () {
        if (inboxDiv) {
          if (inboxDiv.scrollTop === 0) {
            store.loadOlder();
          }
        }
      };
    },
    sendMessage: function sendMessage() {
      var _this3 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!_this3.textContent.length) {
                  _context2.next = 5;
                  break;
                }
                _context2.next = 3;
                return _this3.store.sendMessage(_this3.textContent);
              case 3:
                _this3.scrollToBottom(true);
                _this3.textContent = "";
              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    getImageUrl: function getImageUrl(msg, imageIndex) {
      return this.store.apiBaseUrl + "/api/v2/text_messages/" + msg.id + "/image/" + imageIndex;
    },
    poll: function poll() {
      var _this4 = this;
      setTimeout(function () {
        _this4.store.poll();
        _this4.poll();
      }, 10000);
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
    staticClass: "component"
  }, [_vm._ssrNode("<div data-v-6f91909a>", "</div>", [_vm._ssrNode("<div class=\"inbox\" data-v-6f91909a>", "</div>", [_vm.store.loading.older ? _vm._ssrNode("<div class=\"text-center\" data-v-6f91909a>", "</div>", [_c('b-spinner', {
    attrs: {
      "variant": "primary",
      "label": "Spinning"
    }
  })], 1) : _vm._e(), _vm._ssrNode(" "), _vm._l(_vm.messagesByDate, function (msgs, date) {
    return _vm._ssrNode("<span data-v-6f91909a>", "</span>", [_vm._ssrNode("<div class=\"date\" data-v-6f91909a>" + _vm._ssrEscape(_vm._s(_vm.inboxHelper.formatDate(date))) + "</div> "), _vm._l(msgs, function (msg) {
      return _vm._ssrNode("<span data-v-6f91909a>", "</span>", [_vm._ssrNode((msg.sender ? "<div class=\"sender\" data-v-6f91909a>" + _vm._ssrEscape(_vm._s(msg.sender)) + "</div>" : "<!---->") + " "), _vm._ssrNode("<div" + _vm._ssrClass("message", _vm.inboxHelper.messageClasses(msg)) + " data-v-6f91909a>", "</div>", [_c('span', {
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
      }, [_vm._ssrNode(_vm._ssrEscape(_vm._s(_vm.inboxHelper.messageTime(msg))))]), _vm._ssrNode(" "), _vm._ssrNode("<a href=\"#\"" + _vm._ssrAttr("id", 'icon-' + msg.id) + " data-v-6f91909a>", "</a>", [_vm.inboxHelper.statusType(msg) == 'success' ? _c('b-icon', {
        staticClass: "status-icon",
        attrs: {
          "icon": "check-lg",
          "variant": "success"
        }
      }) : _vm._e(), _vm._ssrNode(" "), _vm.inboxHelper.statusType(msg) == 'failure' ? _c('b-icon', {
        staticClass: "status-icon",
        attrs: {
          "icon": "exclamation-triangle-fill",
          "variant": "danger"
        }
      }) : _vm._e(), _vm._ssrNode(" "), _vm.inboxHelper.statusType(msg) == 'unknown' ? _c('b-icon', {
        staticClass: "status-icon",
        attrs: {
          "icon": "info-circle-fill",
          "variant": "info"
        }
      }) : _vm._e()], 2), _vm._ssrNode(" "), _c('b-popover', {
        attrs: {
          "target": 'icon-' + msg.id,
          "title": "Text Message Details",
          "triggers": "click blur",
          "placement": msg.direction == 'inbound' ? 'right' : 'left'
        },
        scopedSlots: _vm._u([{
          key: "title",
          fn: function fn() {
            return [_vm._v("Text Message Details")];
          },
          proxy: true
        }], null, true)
      }, [_vm._v(" "), _c('strong', [_vm._v("From:")]), _vm._v(" " + _vm._s(_vm.inboxHelper.formatNumber(msg.from_number))), _c('br'), _vm._v(" "), _c('strong', [_vm._v("To:")]), _vm._v(" " + _vm._s(_vm.inboxHelper.formatNumber(msg.to_number))), _c('br'), _vm._v(" "), _c('strong', [_vm._v("Status:")]), _vm._v(" " + _vm._s(_vm.inboxHelper.messageStatus(msg))), _c('br'), _vm._v(" "), _c('strong', [_vm._v("Sent:")]), _vm._v(" " + _vm._s(_vm.inboxHelper.messageDetailTime(msg)) + "\n            ")]), _vm._ssrNode(_vm._ssrEscape("\n            " + _vm._s(msg.message_text) + "\n            ")), msg.media.length > 0 ? _vm._ssrNode("<ul class=\"list-inline\" data-v-6f91909a>", "</ul>", _vm._l(msg.media, function (media, idx) {
        return _vm._ssrNode("<li data-v-6f91909a>", "</li>", [_c('LazyImage', {
          attrs: {
            "store": _vm.store,
            "url": _vm.getImageUrl(msg, idx)
          }
        })], 1);
      }), 0) : _vm._e()], 2)], 2);
    })], 2);
  })], 2)]), _vm._ssrNode(" "), _vm._ssrNode("<div data-v-6f91909a>", "</div>", [_vm._ssrNode("<textarea rows=\"1\" cols=\"30\"" + _vm._ssrAttr("disabled", _vm.store.loading.send) + " class=\"form-control\" data-v-6f91909a>" + _vm._ssrEscape(_vm._s(_vm.textContent)) + "</textarea> "), !_vm.store.loading.send ? _vm._ssrNode("<input type=\"submit\" value=\"Send SMS Message\"" + _vm._ssrAttr("disabled", _vm.store.loading.send) + _vm._ssrClass(null, _vm.styleConfig.inboxSubmit) + " data-v-6f91909a>", "</input>") : _vm._ssrNode("<div" + _vm._ssrClass("disabled", _vm.styleConfig.inboxSubmit) + " data-v-6f91909a>", "</div>", [_vm._ssrNode("\n      Send SMS Message "), _c('b-spinner', {
    attrs: {
      "small": "",
      "variant": "light",
      "label": "Spinning"
    }
  })], 2)], 2)], 2);
};
var __vue_staticRenderFns__ = [];

/* style */
var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-6f91909a_0", {
    source: ".component[data-v-6f91909a]{max-height:55vh;min-height:55vh}.inbox[data-v-6f91909a]{max-height:60vh;min-height:60vh;overflow-x:hidden;overflow-y:scroll;border-bottom:2px solid rgba(0,0,0,.2)}.date[data-v-6f91909a]{clear:both;font-size:1.1em;color:gray;text-align:center}.message[data-v-6f91909a]{position:relative;display:inline-block;min-width:150px;max-width:450px;padding:10px 18px;clear:both;vertical-align:top;border-radius:5px;-webkit-box-shadow:0 0 6px #b2b2b2;box-shadow:0 0 6px #b2b2b2}div.sender[data-v-6f91909a]{float:right;margin:0 20px 0 0;clear:both;font-size:12px;color:#6c6f76}.inbound[data-v-6f91909a]{float:left;margin:5px 45px 5px 20px;background-color:#bdf9bd}.inbound[data-v-6f91909a]::before{left:-9px;background-color:#bdf9bd;-webkit-box-shadow:-2px 2px 2px 0 rgba(178,178,178,.4);box-shadow:-2px 2px 2px 0 rgba(178,178,178,.4)}.message[data-v-6f91909a]::before{position:absolute;top:11px;display:block;width:20px;height:16px;content:\"\\00a0\";-webkit-transform:rotate(29deg) skew(-35deg);-moz-transform:rotate(29deg) skew(-35deg);-ms-transform:rotate(29deg) skew(-35deg);-o-transform:rotate(29deg) skew(-35deg);transform:rotate(29deg) skew(-35deg)}.outbound[data-v-6f91909a]{float:right;margin:5px 20px 5px 45px}.outbound[data-v-6f91909a]::before{right:-9px;-webkit-box-shadow:2px -2px 2px 0 rgb(178 178 178 / 40%);box-shadow:2px -2px 2px 0 rgb(178 178 178 / 40%)}.outbound.automated[data-v-6f91909a],.outbound.automated[data-v-6f91909a]::before{background-color:#e0f1ff}.outbound.manual[data-v-6f91909a],.outbound.manual[data-v-6f91909a]::before{background-color:#badfff}.time[data-v-6f91909a]{float:right;margin:0 3px 0;color:gray}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
var __vue_scope_id__ = "data-v-6f91909a";
/* module identifier */
var __vue_module_identifier__ = "data-v-6f91909a";
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