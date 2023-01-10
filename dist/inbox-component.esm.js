var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

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
}

var dayjs_min = createCommonjsModule(function (module, exports) {
!function(t,e){module.exports=e();}(commonjsGlobal,(function(){var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return +(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return {M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},v="en",D={};D[v]=M;var p=function(t){return t instanceof _},S=function t(e,n,r){var i;if(!e)return v;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else {var a=e.name;D[a]=e,i=a;}return !r&&i&&(v=i),i||!r&&v},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t);}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init();},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},m.$utils=function(){return O},m.isValid=function(){return !(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var v=this.$locale().weekStart||0,D=(y<v?y+7:y)-v;return $(r?m-D:m+(6-D),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d;}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,v=O.m(this,M);return v=(l={},l[c]=v/12,l[f]=v,l[h]=v/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?v:O.a(v)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),T=_.prototype;return w.prototype=T,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){T[t[1]]=function(e){return this.$g(e,t[0],t[1])};})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=D[v],w.Ls=D,w.p={},w}));
});

var dayjs = dayjs_min;

let appState = {
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
  authCredentials() {
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
  async fetchImage(url) {
    let auth = this.authCredentials();
    let requestParams = Object.assign(auth, {
      method: "GET"
    });
    let res = await fetch(url, requestParams);
    let blob = await res.blob();
    return URL.createObjectURL(blob);
  },
  async fetchMessages(params) {
    let update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    let auth = this.authCredentials();
    let requestParams = Object.assign(auth, {
      method: "GET"
    });
    let search = new URLSearchParams(Object.assign({
      study_id: this.studyId,
      participant_id: this.participantId,
      order_by: 'desc(id)',
      per_page: this.meta.limit
    }, params));
    let res = await fetch(`${this.apiBaseUrl}/api/v2/text_messages?` + search, requestParams);
    if (!res.ok) {
      throw new Error("womp");
    }
    if (update) {
      // Our API call finds items updated after the lastUpdated, so if the lastUpdated matched the updated_at
      // of a text we wouldn't get it. Move the search back by a second to account for that
      this.meta.lastUpdated = dayjs().subtract(1, 'second').format('YYYY-MM-DD HH:mm:ss');
    }
    let messages = (await res.json()).data;
    if (messages.length) {
      let newMessages = messages.reduce((accumulator, text) => {
        if (!this.meta.oldest || text.created_at < this.meta.oldest) {
          this.meta.oldest = text.created_at;
        }
        return {
          ...accumulator,
          [text.id]: text
        };
      }, {});
      this.messagesObj = Object.assign({}, this.messagesObj, newMessages);
    }
    return messages;
  },
  async loadMessages() {
    if (this.loading.initial) {
      return false;
    }
    this.loading.initial = true;
    await this.fetchMessages();
    this.loading.initial = false;
  },
  async poll() {
    if (this.loading.polling) {
      return false;
    }
    let params = {
      updated_at: 'after(' + this.meta.lastUpdated + ')'
    };
    this.loading.polling = true;
    let messages = await this.fetchMessages(params);
    this.loading.polling = false;
    if (messages.length) {
      this.meta.updates = true;
    }
  },
  async loadOlder() {
    if (this.loading.older) {
      return false;
    }
    let params = {
      created_at: 'before(' + this.meta.oldest + ')'
    };
    this.loading.older = true;
    await this.fetchMessages(params, false);
    this.loading.older = false;
  },
  async sendMessage(message) {
    if (this.loading.send) {
      return false;
    }
    let body = {
      message_text: message
    };
    let auth = this.authCredentials();
    let requestParams = Object.assign(auth, {
      method: "POST",
      body: JSON.stringify(body)
    });
    this.loading.send = true;
    let res = await fetch(`${this.apiBaseUrl}/api/v2/participants/${this.participantId}/text_messages`, requestParams);
    if (!res.ok) {
      this.loading.older = false;
      throw new Error("womp");
    }
    let text = (await res.json()).data;
    let obj = {};
    obj[text.id] = text;
    this.messagesObj = Object.assign({}, this.messagesObj, obj);
    this.meta.updates = true;
    this.loading.send = false;
  }
};
var store = appState;

let styles$1 = {
  inboxSubmit: "btn px-4 btn-primary"
};
var styles$2 = styles$1;

let helper = {
  statusType: function (msg) {
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
  messageTime: function (msg) {
    let datetime = msg.sent_at || msg.created_at;
    return dayjs(datetime).format('h:mm A');
  },
  tooltipTime: function (msg) {
    let datetime = msg.sent_at || msg.created_at;
    return dayjs(datetime).format('h:mm:ss A');
  },
  messageDetailTime: function (msg) {
    let datetime = msg.sent_at || msg.created_at;
    return dayjs(datetime).format('M/D/YY h:mm:ss A');
  },
  formatDate: function (date) {
    return dayjs(date).format('~ dddd, D MMMM YYYY ~');
  },
  formatNumber: function (number) {
    // +12345678901 -> 234-567-8901
    var cleaned = ('' + number).replace(/\D/g, '');
    var match = cleaned.match(/^\d{1}(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return match[1] + '-' + match[2] + '-' + match[3];
    } else {
      return number;
    }
  },
  messageClasses: function (msg) {
    let classes = [];
    classes.push(msg.direction == 'inbound' ? 'inbound' : 'outbound');
    classes.push(msg.sender ? 'manual' : 'automated');
    return classes;
  },
  messageStatus: function (msg) {
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
  sortMessages(messages) {
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
var inboxHelper = helper;

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
  data() {
    return {
      src: null
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.src = await this.store.fetchImage(this.url);
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', [_vm.src ? _c('img', {
    staticClass: "inbox-img",
    attrs: {
      "src": _vm.src
    }
  }) : _c('div', {
    staticClass: "inbox-img"
  }, [_c('b-spinner', {
    attrs: {
      "variant": "primary",
      "label": "Spinning"
    }
  })], 1)]);
};
var __vue_staticRenderFns__$1 = [];

/* style */
const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-0fc50674_0", {
    source: ".inbox-img[data-v-0fc50674]{width:200px;height:200px;margin:20px 0;text-align:center;background-repeat:no-repeat;background-position:50% 50%;-webkit-background-size:cover;background-size:cover}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
const __vue_scope_id__$1 = "data-v-0fc50674";
/* module identifier */
const __vue_module_identifier__$1 = undefined;
/* functional template */
const __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);
var LazyImage = __vue_component__$1;

//
var script = {
  name: "InboxComponent",
  components: {
    LazyImage
  },
  props: {
    auth: {
      type: Object,
      required: false,
      default() {
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
  data() {
    return {
      scrolled: false,
      styleConfig: Object.assign(styles$2, this.styles),
      store: store,
      inboxHelper: inboxHelper,
      textContent: ""
    };
  },
  async created() {
    this.store.apiBaseUrl = this.apiBaseUrl;
    this.store.participantId = this.participantId;
    this.store.studyId = this.studyId;
    this.store.auth = this.auth;
    this.loading = true;
    this.store.loadMessages().then(() => {
      this.loading = false;
      this.scrollToBottom();
    }).catch(e => {
      // TODO: proper error handling
      console.log(e);
      this.loading = false;
    });
  },
  mounted() {
    this.scrollToBottom();
    this.handleTop();
    this.poll();
  },
  computed: {
    sortedMessages() {
      if (Object.keys(this.store.messagesObj).length > 0) {
        return this.inboxHelper.sortMessages(Object.values(this.store.messagesObj));
      }
      return [];
    },
    messagesByDate() {
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
    sortedMessages(newObj, oldObj) {
      if (newObj.length > oldObj.length && store.meta.updates) {
        this.$nextTick(() => {
          this.scrollToBottom(true);
        });
      }
      store.meta.updates = false;
    }
  },
  methods: {
    scrollToBottom(force) {
      if (!this.scrolled || force) {
        var _this$$el$querySelect, _this$$el$querySelect2;
        let lastMessage = (_this$$el$querySelect = this.$el.querySelector('.inbox')) === null || _this$$el$querySelect === void 0 ? void 0 : (_this$$el$querySelect2 = _this$$el$querySelect.lastElementChild) === null || _this$$el$querySelect2 === void 0 ? void 0 : _this$$el$querySelect2.lastElementChild;
        if (lastMessage) {
          lastMessage.scrollIntoView();
          this.scrolled = true;
        } else {
          console.log("Failed to find last element");
        }
      }
    },
    handleTop() {
      var _this$$el;
      let inboxDiv = (_this$$el = this.$el) === null || _this$$el === void 0 ? void 0 : _this$$el.querySelector('.inbox');
      inboxDiv.onscroll = () => {
        if (inboxDiv) {
          if (inboxDiv.scrollTop === 0) {
            store.loadOlder();
          }
        }
      };
    },
    async sendMessage() {
      if (this.textContent.length) {
        await this.store.sendMessage(this.textContent);
        this.scrollToBottom(true);
        this.textContent = "";
      }
    },
    getImageUrl(msg, imageIndex) {
      return this.store.apiBaseUrl + "/api/v2/text_messages/" + msg.id + "/image/" + imageIndex;
    },
    poll() {
      setTimeout(() => {
        this.store.poll();
        this.poll();
      }, 10000);
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', {
    staticClass: "component"
  }, [_c('div', [_c('div', {
    staticClass: "inbox"
  }, [_vm.store.loading.older ? _c('div', {
    staticClass: "text-center"
  }, [_c('b-spinner', {
    attrs: {
      "variant": "primary",
      "label": "Spinning"
    }
  })], 1) : _vm._e(), _vm._v(" "), _vm._l(_vm.messagesByDate, function (msgs, date) {
    return _c('span', {
      key: date
    }, [_c('div', {
      staticClass: "date"
    }, [_vm._v(_vm._s(_vm.inboxHelper.formatDate(date)))]), _vm._v(" "), _vm._l(msgs, function (msg) {
      return _c('span', {
        key: msg.id
      }, [msg.sender ? _c('div', {
        staticClass: "sender"
      }, [_vm._v(_vm._s(msg.sender))]) : _vm._e(), _vm._v(" "), _c('div', {
        staticClass: "message",
        class: _vm.inboxHelper.messageClasses(msg)
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
          "title": _vm.inboxHelper.tooltipTime(msg)
        }
      }, [_vm._v(_vm._s(_vm.inboxHelper.messageTime(msg)))]), _vm._v(" "), _c('a', {
        attrs: {
          "href": "#",
          "id": 'icon-' + msg.id
        }
      }, [_vm.inboxHelper.statusType(msg) == 'success' ? _c('b-icon', {
        staticClass: "status-icon",
        attrs: {
          "icon": "check-lg",
          "variant": "success"
        }
      }) : _vm._e(), _vm._v(" "), _vm.inboxHelper.statusType(msg) == 'failure' ? _c('b-icon', {
        staticClass: "status-icon",
        attrs: {
          "icon": "exclamation-triangle-fill",
          "variant": "danger"
        }
      }) : _vm._e(), _vm._v(" "), _vm.inboxHelper.statusType(msg) == 'unknown' ? _c('b-icon', {
        staticClass: "status-icon",
        attrs: {
          "icon": "info-circle-fill",
          "variant": "info"
        }
      }) : _vm._e()], 1), _vm._v(" "), _c('b-popover', {
        attrs: {
          "target": 'icon-' + msg.id,
          "title": "Text Message Details",
          "triggers": "click blur",
          "placement": msg.direction == 'inbound' ? 'right' : 'left'
        },
        scopedSlots: _vm._u([{
          key: "title",
          fn: function () {
            return [_vm._v("Text Message Details")];
          },
          proxy: true
        }], null, true)
      }, [_vm._v(" "), _c('strong', [_vm._v("From:")]), _vm._v(" " + _vm._s(_vm.inboxHelper.formatNumber(msg.from_number))), _c('br'), _vm._v(" "), _c('strong', [_vm._v("To:")]), _vm._v(" " + _vm._s(_vm.inboxHelper.formatNumber(msg.to_number))), _c('br'), _vm._v(" "), _c('strong', [_vm._v("Status:")]), _vm._v(" " + _vm._s(_vm.inboxHelper.messageStatus(msg))), _c('br'), _vm._v(" "), _c('strong', [_vm._v("Sent:")]), _vm._v(" " + _vm._s(_vm.inboxHelper.messageDetailTime(msg)) + "\n            ")]), _vm._v("\n            " + _vm._s(msg.message_text) + "\n            "), msg.media.length > 0 ? _c('ul', {
        staticClass: "list-inline"
      }, _vm._l(msg.media, function (media, idx) {
        return _c('li', {
          key: media.sid
        }, [_c('LazyImage', {
          attrs: {
            "store": _vm.store,
            "url": _vm.getImageUrl(msg, idx)
          }
        })], 1);
      }), 0) : _vm._e()], 1)]);
    })], 2);
  })], 2)]), _vm._v(" "), _c('div', [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.textContent,
      expression: "textContent"
    }],
    staticClass: "form-control",
    attrs: {
      "rows": "1",
      "cols": "30",
      "disabled": _vm.store.loading.send
    },
    domProps: {
      "value": _vm.textContent
    },
    on: {
      "input": function ($event) {
        if ($event.target.composing) {
          return;
        }
        _vm.textContent = $event.target.value;
      }
    }
  }), _vm._v(" "), !_vm.store.loading.send ? _c('input', {
    class: _vm.styleConfig.inboxSubmit,
    attrs: {
      "type": "submit",
      "value": "Send SMS Message",
      "disabled": _vm.store.loading.send
    },
    on: {
      "click": _vm.sendMessage
    }
  }) : _c('div', {
    staticClass: "disabled",
    class: _vm.styleConfig.inboxSubmit
  }, [_vm._v("\n      Send SMS Message "), _c('b-spinner', {
    attrs: {
      "small": "",
      "variant": "light",
      "label": "Spinning"
    }
  })], 1)])]);
};
var __vue_staticRenderFns__ = [];

/* style */
const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-6f91909a_0", {
    source: ".component[data-v-6f91909a]{max-height:55vh;min-height:55vh}.inbox[data-v-6f91909a]{max-height:60vh;min-height:60vh;overflow-x:hidden;overflow-y:scroll;border-bottom:2px solid rgba(0,0,0,.2)}.date[data-v-6f91909a]{clear:both;font-size:1.1em;color:gray;text-align:center}.message[data-v-6f91909a]{position:relative;display:inline-block;min-width:150px;max-width:450px;padding:10px 18px;clear:both;vertical-align:top;border-radius:5px;-webkit-box-shadow:0 0 6px #b2b2b2;box-shadow:0 0 6px #b2b2b2}div.sender[data-v-6f91909a]{float:right;margin:0 20px 0 0;clear:both;font-size:12px;color:#6c6f76}.inbound[data-v-6f91909a]{float:left;margin:5px 45px 5px 20px;background-color:#bdf9bd}.inbound[data-v-6f91909a]::before{left:-9px;background-color:#bdf9bd;-webkit-box-shadow:-2px 2px 2px 0 rgba(178,178,178,.4);box-shadow:-2px 2px 2px 0 rgba(178,178,178,.4)}.message[data-v-6f91909a]::before{position:absolute;top:11px;display:block;width:20px;height:16px;content:\"\\00a0\";-webkit-transform:rotate(29deg) skew(-35deg);-moz-transform:rotate(29deg) skew(-35deg);-ms-transform:rotate(29deg) skew(-35deg);-o-transform:rotate(29deg) skew(-35deg);transform:rotate(29deg) skew(-35deg)}.outbound[data-v-6f91909a]{float:right;margin:5px 20px 5px 45px}.outbound[data-v-6f91909a]::before{right:-9px;-webkit-box-shadow:2px -2px 2px 0 rgb(178 178 178 / 40%);box-shadow:2px -2px 2px 0 rgb(178 178 178 / 40%)}.outbound.automated[data-v-6f91909a],.outbound.automated[data-v-6f91909a]::before{background-color:#e0f1ff}.outbound.manual[data-v-6f91909a],.outbound.manual[data-v-6f91909a]::before{background-color:#badfff}.time[data-v-6f91909a]{float:right;margin:0 3px 0;color:gray}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
const __vue_scope_id__ = "data-v-6f91909a";
/* module identifier */
const __vue_module_identifier__ = undefined;
/* functional template */
const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);
var component = __vue_component__;

// Import vue component

// Declare install function executed by Vue.use()
function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('InboxComponent', component);
}

// Create module definition for Vue.use()
const plugin = {
  install
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export { component as default, install };
