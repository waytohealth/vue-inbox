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

var script$2 = {
  name: "InboxDisplay",
  props: {
    store: {
      type: Object,
      required: true
    }
  },
  computed: {
    sortedMessages() {
      var _this$store$messages;
      if ((_this$store$messages = this.store.messages) !== null && _this$store$messages !== void 0 && _this$store$messages.length) {
        let tmp = this.store.messages;
        return tmp.sort(function (a, b) {
          if ((a.sent_at || a.created_at) > (b.sent_at || b.created_at)) {
            return 1;
          } else if ((a.sent_at || a.created_at) < (b.sent_at || b.created_at)) {
            return -1;
          }
          return a.id > b.id ? 1 : -1;
        });
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
  async mounted() {
    this.loading = true;
    this.store.loadMessages().then(() => {
      this.loading = false;
    }).catch(e => {
      // TODO: proper error handling
      console.log(e);
      this.loading = false;
    });
  },
  methods: {
    formatDate(date) {
      // TODO: proper date formatting
      return "~ " + date + " ~";
    },
    messageTime(msg) {
      let datetime = msg.sent_at || msg.created_at;
      return datetime.split(" ")[1];
    }
  },
  data() {
    return {
      loading: false
    };
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
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', [_vm._v("\n  " + _vm._s(_vm.loading ? 'loading' : 'done') + "\n  "), !_vm.loading ? _c('div', {
    staticStyle: {
      "min-height": "300px",
      "border-style": "solid"
    },
    attrs: {
      "id": "inbox"
    }
  }, _vm._l(_vm.messagesByDate, function (msgs, date) {
    return _c('span', {
      key: date
    }, [_c('div', {
      staticClass: "date"
    }, [_vm._v(_vm._s(_vm.formatDate(date)))]), _vm._v(" "), _vm._l(msgs, function (msg) {
      return _c('div', {
        key: msg.id,
        staticClass: "message",
        class: [msg.direction == 'inbound' ? 'inbound' : 'outbound']
      }, [_c('span', {
        staticClass: "time"
      }, [_vm._v(_vm._s(_vm.messageTime(msg)))]), _vm._v("\n        " + _vm._s(msg.message_text) + "\n      ")]);
    })], 2);
  }), 0) : _vm._e()]);
};
var __vue_staticRenderFns__$2 = [];

/* style */
const __vue_inject_styles__$2 = function (inject) {
  if (!inject) return;
  inject("data-v-646bc058_0", {
    source: ".date[data-v-646bc058]{clear:both;font-size:1.1em;color:gray;text-align:center}.message[data-v-646bc058]{position:relative;display:inline-block;min-width:150px;max-width:450px;padding:10px 18px;clear:both;vertical-align:top;border-radius:5px;-webkit-box-shadow:0 0 6px #b2b2b2;box-shadow:0 0 6px #b2b2b2}.inbound[data-v-646bc058]{float:left;margin:5px 45px 5px 20px;background-color:#bdf9bd}.inbound[data-v-646bc058]::before{left:-9px;background-color:#bdf9bd;-webkit-box-shadow:-2px 2px 2px 0 rgba(178,178,178,.4);box-shadow:-2px 2px 2px 0 rgba(178,178,178,.4)}.message[data-v-646bc058]::before{position:absolute;top:11px;display:block;width:20px;height:16px;content:\"\\00a0\";-webkit-transform:rotate(29deg) skew(-35deg);-moz-transform:rotate(29deg) skew(-35deg);-ms-transform:rotate(29deg) skew(-35deg);-o-transform:rotate(29deg) skew(-35deg);transform:rotate(29deg) skew(-35deg)}.outbound[data-v-646bc058]{float:right;margin:5px 20px 5px 45px;background-color:#e0f1ff}.outbound[data-v-646bc058]::before{right:-9px;background-color:#e0f1ff;-webkit-box-shadow:2px -2px 2px 0 rgb(178 178 178 / 40%);box-shadow:2px -2px 2px 0 rgb(178 178 178 / 40%)}.time[data-v-646bc058]{float:right;margin:0 3px 0;color:gray}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
const __vue_scope_id__$2 = "data-v-646bc058";
/* module identifier */
const __vue_module_identifier__$2 = undefined;
/* functional template */
const __vue_is_functional_template__$2 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, createInjector, undefined, undefined);
var InboxDisplay = __vue_component__$2;

//
//
//
//
//
//
//

var script$1 = {
  name: "InboxInput",
  props: {
    store: {
      type: Object,
      required: true
    }
  },
  methods: {
    async sendMessage() {
      if (this.textContent.length) {
        await this.store.sendMessage(this.textContent);
        this.textContent = "";
      }
    }
  },
  data() {
    return {
      loading: false,
      textContent: ""
    };
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.textContent,
      expression: "textContent"
    }],
    staticClass: "form-control",
    attrs: {
      "rows": "4",
      "cols": "30"
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
  }), _vm._v(" "), _c('input', {
    staticClass: "btn btn-primary",
    attrs: {
      "type": "submit",
      "value": "Send SMS Message"
    },
    on: {
      "click": _vm.sendMessage
    }
  })]);
};
var __vue_staticRenderFns__$1 = [];

/* style */
const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-149f1478_0", {
    source: ".form-control[data-v-149f1478]{display:block;width:100%;height:34px;padding:6px 12px;font-size:14px;line-height:1.42857143;color:#6c6f76;background-color:#fff;background-image:none;border:1px solid #ccc;border-radius:4px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075);-webkit-transition:border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;-o-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s}textarea.form-control[data-v-149f1478]{height:auto}.btn[data-v-149f1478]{display:inline-block;padding:6px 12px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.42857143;text-align:center;white-space:nowrap;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-image:none;border:1px solid transparent;border-radius:4px}.btn-primary[data-v-149f1478]{color:#fff;background-color:#01256e;border-color:#011c55}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
const __vue_scope_id__$1 = "data-v-149f1478";
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
var InboxInput = __vue_component__$1;

let appState = {
  messages: [],
  apiBaseUrl: null,
  participantId: null,
  studyId: null,
  auth: {
    method: "session",
    apiKey: ""
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
  async loadMessages() {
    let auth = this.authCredentials();
    let requestParams = Object.assign(auth, {
      method: "GET"
    });
    let params = new URLSearchParams({
      study_id: this.studyId,
      participant_id: this.participantId,
      order_by: 'desc(id)'
    });
    console.log(this);
    let res = await fetch(`${this.apiBaseUrl}/api/v2/text_messages?` + params, requestParams);
    if (!res.ok) {
      throw new Error("womp");
    }
    this.messages = (await res.json()).data;
  },
  async sendMessage(message) {
    let body = {
      message_text: message
    };
    let auth = this.authCredentials();
    let requestParams = Object.assign(auth, {
      method: "POST",
      body: JSON.stringify(body)
    });
    let res = await fetch(`${this.apiBaseUrl}/api/v2/participants/${this.participantId}/text_messages`, requestParams);
    if (!res.ok) {
      throw new Error("womp");
    }
    let text = (await res.json()).data;
    this.messages.push(text);
  }
};
var store = appState;

//
var script = {
  name: "InboxComponent",
  components: {
    InboxInput,
    InboxDisplay
  },
  props: {
    auth: {
      type: Object,
      required: true,
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
    }
  },
  data() {
    return {
      store: store
    };
  },
  beforeMount() {
    this.store.apiBaseUrl = this.apiBaseUrl;
    this.store.participantId = this.participantId;
    this.store.studyId = this.studyId;
    this.store.auth = this.auth;
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', [_c('h2', [_vm._v("SMS Inbox")]), _vm._v(" "), _c('InboxDisplay', {
    attrs: {
      "store": _vm.store
    }
  }), _vm._v(" "), _c('InboxInput', {
    attrs: {
      "store": _vm.store
    }
  })], 1);
};
var __vue_staticRenderFns__ = [];

/* style */
const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-1306dfd2_0", {
    source: ".b-overlay-wrap{min-height:150px;padding-bottom:1rem}.date{clear:both;font-size:1.1em;color:gray;text-align:center}.message{position:relative;display:inline-block;min-width:150px;max-width:450px;padding:10px 18px;clear:both;vertical-align:top;border-radius:5px;-webkit-box-shadow:0 0 6px #b2b2b2;box-shadow:0 0 6px #b2b2b2}.inbound{float:left;margin:5px 45px 5px 20px;background-color:#bdf9bd}.inbound::before{left:-9px;background-color:#bdf9bd;-webkit-box-shadow:-2px 2px 2px 0 rgba(178,178,178,.4);box-shadow:-2px 2px 2px 0 rgba(178,178,178,.4)}.message::before{position:absolute;top:11px;display:block;width:20px;height:16px;content:\"\\00a0\";-webkit-transform:rotate(29deg) skew(-35deg);-moz-transform:rotate(29deg) skew(-35deg);-ms-transform:rotate(29deg) skew(-35deg);-o-transform:rotate(29deg) skew(-35deg);transform:rotate(29deg) skew(-35deg)}.outbound{float:right;margin:5px 20px 5px 45px;background-color:#e0f1ff}.outbound::before{right:-9px;background-color:#e0f1ff;-webkit-box-shadow:2px -2px 2px 0 rgb(178 178 178 / 40%);box-shadow:2px -2px 2px 0 rgb(178 178 178 / 40%)}.time{float:right;margin:0 3px 0;color:gray}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
const __vue_scope_id__ = undefined;
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
