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

var utc = createCommonjsModule(function (module, exports) {
!function(t,i){module.exports=i();}(commonjsGlobal,(function(){var t="minute",i=/[+-]\d\d(?::?\d\d)?/g,e=/([+-]|\d\d)/g;return function(s,f,n){var u=f.prototype;n.utc=function(t){var i={date:t,utc:!0,args:arguments};return new f(i)},u.utc=function(i){var e=n(this.toDate(),{locale:this.$L,utc:!0});return i?e.add(this.utcOffset(),t):e},u.local=function(){return n(this.toDate(),{locale:this.$L,utc:!1})};var o=u.parse;u.parse=function(t){t.utc&&(this.$u=!0),this.$utils().u(t.$offset)||(this.$offset=t.$offset),o.call(this,t);};var r=u.init;u.init=function(){if(this.$u){var t=this.$d;this.$y=t.getUTCFullYear(),this.$M=t.getUTCMonth(),this.$D=t.getUTCDate(),this.$W=t.getUTCDay(),this.$H=t.getUTCHours(),this.$m=t.getUTCMinutes(),this.$s=t.getUTCSeconds(),this.$ms=t.getUTCMilliseconds();}else r.call(this);};var a=u.utcOffset;u.utcOffset=function(s,f){var n=this.$utils().u;if(n(s))return this.$u?0:n(this.$offset)?a.call(this):this.$offset;if("string"==typeof s&&(s=function(t){void 0===t&&(t="");var s=t.match(i);if(!s)return null;var f=(""+s[0]).match(e)||["-",0,0],n=f[0],u=60*+f[1]+ +f[2];return 0===u?0:"+"===n?u:-u}(s),null===s))return this;var u=Math.abs(s)<=16?60*s:s,o=this;if(f)return o.$offset=u,o.$u=0===s,o;if(0!==s){var r=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(o=this.local().add(u+r,t)).$offset=u,o.$x.$localOffset=r;}else o=this.utc();return o};var h=u.format;u.format=function(t){var i=t||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return h.call(this,i)},u.valueOf=function(){var t=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*t},u.isUTC=function(){return !!this.$u},u.toISOString=function(){return this.toDate().toISOString()},u.toString=function(){return this.toDate().toUTCString()};var l=u.toDate;u.toDate=function(t){return "s"===t&&this.$offset?n(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():l.call(this)};var c=u.diff;u.diff=function(t,i,e){if(t&&this.$u===t.$u)return c.call(this,t,i,e);var s=this.local(),f=n(t).local();return c.call(s,f,i,e)};}}));
});

var timezone = createCommonjsModule(function (module, exports) {
!function(t,e){module.exports=e();}(commonjsGlobal,(function(){var t={year:0,month:1,day:2,hour:3,minute:4,second:5},e={};return function(n,i,o){var r,a=function(t,n,i){void 0===i&&(i={});var o=new Date(t),r=function(t,n){void 0===n&&(n={});var i=n.timeZoneName||"short",o=t+"|"+i,r=e[o];return r||(r=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:i}),e[o]=r),r}(n,i);return r.formatToParts(o)},u=function(e,n){for(var i=a(e,n),r=[],u=0;u<i.length;u+=1){var f=i[u],s=f.type,m=f.value,c=t[s];c>=0&&(r[c]=parseInt(m,10));}var d=r[3],l=24===d?0:d,v=r[0]+"-"+r[1]+"-"+r[2]+" "+l+":"+r[4]+":"+r[5]+":000",h=+e;return (o.utc(v).valueOf()-(h-=h%1e3))/6e4},f=i.prototype;f.tz=function(t,e){void 0===t&&(t=r);var n=this.utcOffset(),i=this.toDate(),a=i.toLocaleString("en-US",{timeZone:t}),u=Math.round((i-new Date(a))/1e3/60),f=o(a).$set("millisecond",this.$ms).utcOffset(15*-Math.round(i.getTimezoneOffset()/15)-u,!0);if(e){var s=f.utcOffset();f=f.add(n-s,"minute");}return f.$x.$timezone=t,f},f.offsetName=function(t){var e=this.$x.$timezone||o.tz.guess(),n=a(this.valueOf(),e,{timeZoneName:t}).find((function(t){return "timezonename"===t.type.toLowerCase()}));return n&&n.value};var s=f.startOf;f.startOf=function(t,e){if(!this.$x||!this.$x.$timezone)return s.call(this,t,e);var n=o(this.format("YYYY-MM-DD HH:mm:ss:SSS"));return s.call(n,t,e).tz(this.$x.$timezone,!0)},o.tz=function(t,e,n){var i=n&&e,a=n||e||r,f=u(+o(),a);if("string"!=typeof t)return o(t).tz(a);var s=function(t,e,n){var i=t-60*e*1e3,o=u(i,n);if(e===o)return [i,e];var r=u(i-=60*(o-e)*1e3,n);return o===r?[i,o]:[t-60*Math.min(o,r)*1e3,Math.max(o,r)]}(o.utc(t,i).valueOf(),f,a),m=s[0],c=s[1],d=o(m).utcOffset(c);return d.$x.$timezone=a,d},o.tz.guess=function(){return Intl.DateTimeFormat().resolvedOptions().timeZone},o.tz.setDefault=function(t){r=t;};}}));
});

var advancedFormat = createCommonjsModule(function (module, exports) {
!function(e,t){module.exports=t();}(commonjsGlobal,(function(){return function(e,t,r){var n=t.prototype,s=n.format;r.en.ordinal=function(e){var t=["th","st","nd","rd"],r=e%100;return "["+e+(t[(r-20)%10]||t[r]||t[0])+"]"},n.format=function(e){var t=this,r=this.$locale();if(!this.isValid())return s.bind(this)(e);var n=this.$utils(),a=(e||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,(function(e){switch(e){case"Q":return Math.ceil((t.$M+1)/3);case"Do":return r.ordinal(t.$D);case"gggg":return t.weekYear();case"GGGG":return t.isoWeekYear();case"wo":return r.ordinal(t.week(),"W");case"w":case"ww":return n.s(t.week(),"w"===e?1:2,"0");case"W":case"WW":return n.s(t.isoWeek(),"W"===e?1:2,"0");case"k":case"kk":return n.s(String(0===t.$H?24:t.$H),"k"===e?1:2,"0");case"X":return Math.floor(t.$d.getTime()/1e3);case"x":return t.$d.getTime();case"z":return "["+t.offsetName()+"]";case"zzz":return "["+t.offsetName("long")+"]";default:return e}}));return s.bind(this)(a)};}}));
});

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
let helper = {
  tz: "America/New_York",
  setTimezone(tz) {
    this.tz = tz;
  },
  getFriendlyTimezoneName() {
    return dayjs().tz(this.tz).format("zzz");
  },
  statusType: function (msg) {
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
  messageTime: function (msg) {
    let datetime = msg.sent_at || msg.created_at;
    return dayjs(datetime).tz(this.tz).format('h:mm A');
  },
  messageDate: function (msg) {
    let datetime = msg.sent_at || msg.created_at;
    return dayjs(datetime).tz(this.tz).format('M/D/YY');
  },
  tooltipTime: function (msg) {
    let datetime = msg.sent_at || msg.created_at;
    return dayjs(datetime).tz(this.tz).format('h:mm:ss A z');
  },
  messageDetailTime: function (msg) {
    let datetime = msg.sent_at || msg.created_at;
    return dayjs(datetime).tz(this.tz).format('M/D/YY h:mm:ss A z');
  },
  imageDetailTime: function (msg) {
    let datetime = msg.sent_at || msg.created_at;
    return dayjs(datetime).tz(this.tz).format('dddd, D MMMM YYYY – h:mm:ss A');
  },
  formatDate: function (date) {
    let applyTz = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (applyTz) {
      return dayjs(date).tz(this.tz).format('~ dddd, D MMMM YYYY ~');
    }
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
  messageClasses: function (msg, aiSuggestionsEnabled) {
    let classes = [];
    classes.push(msg.direction === 'inbound' ? 'inbound' : 'outbound');
    classes.push(msg.sender ? 'manual' : 'automated');
    if (aiSuggestionsEnabled) {
      classes.push('ai-suggestion-selectable');
    }
    return classes;
  },
  messageStatus: function (msg) {
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
  messageMetadata: function (msg) {
    return msg.metadata.map(function (m) {
      return m.message;
    }).join('; ');
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
  },
  getIconForStatus(status) {
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
var inboxHelper = helper;

var relativeTime = createCommonjsModule(function (module, exports) {
!function(r,e){module.exports=e();}(commonjsGlobal,(function(){return function(r,e,t){r=r||{};var n=e.prototype,o={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function i(r,e,t,o){return n.fromToBase(r,e,t,o)}t.en.relativeTime=o,n.fromToBase=function(e,n,i,d,u){for(var f,a,s,l=i.$locale().relativeTime||o,h=r.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],m=h.length,c=0;c<m;c+=1){var y=h[c];y.d&&(f=d?t(e).diff(i,y.d,!0):i.diff(e,y.d,!0));var p=(r.rounding||Math.round)(Math.abs(f));if(s=f>0,p<=y.r||!y.r){p<=1&&c>0&&(y=h[c-1]);var v=l[y.l];u&&(p=u(""+p)),a="string"==typeof v?v.replace("%d",p):v(p,n,y.l,s);break}}if(n)return a;var M=s?l.future:l.past;return "function"==typeof M?M(a):M.replace("%s",a)},n.to=function(r,e){return i(r,e,this,!0)},n.from=function(r,e){return i(r,e,this)};var d=function(r){return r.$u?t.utc():t()};n.toNow=function(r){return this.to(d(this),r)},n.fromNow=function(r){return this.from(d(this),r)};}}));
});

dayjs.extend(relativeTime);
var manualModeHelper = {
  session: null,
  conversation: null,
  setCurrentSession(messaging_mode_session) {
    this.session = messaging_mode_session;
  },
  setCurrentConversation(conversation) {
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
      let datetime = this.session.expires_at;
      return dayjs(datetime).format('M/D/YYYY h:mm:ss A z');
    }
  },
  get sessionTimeRemaining() {
    var _this$session4;
    if ((_this$session4 = this.session) !== null && _this$session4 !== void 0 && _this$session4.expires_at) {
      const datetime = this.session.expires_at;
      return dayjs(datetime).fromNow(true);
    }
  },
  get isConversationActive() {
    var _this$conversation;
    return !!((_this$conversation = this.conversation) !== null && _this$conversation !== void 0 && _this$conversation.id);
  },
  get conversationExpiration() {
    if (this.conversation) {
      let datetime = this.conversation.expires_at;
      return dayjs(datetime).format('M/D/YYYY h:mm:ss A z');
    }
  },
  get conversationName() {
    if (this.conversation) {
      return this.conversation.source_name;
    }
  }
};

class InboxStore {
  constructor(apiBaseUrl, participantId, resource, studyId, auth) {
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
  }
  async fetchImage(url) {
    if (this.imageCache[url]) {
      return this.imageCache[url];
    }
    let auth = this.authCredentials();
    let requestParams = Object.assign(auth, {
      method: "GET"
    });
    let res = await fetch(url, requestParams);
    let blob = await res.blob();
    this.imageCache[url] = URL.createObjectURL(blob);
    return this.imageCache[url];
  }
  getImageUrl(msgId, imageIndex) {
    return `${this.apiBaseUrl}/api/v2/text_messages/${msgId}/image/${imageIndex}`;
  }
  async enableManualMode() {
    const requestParams = Object.assign(this.authCredentials(), {
      method: "POST",
      body: JSON.stringify({
        mode: "Manual",
        duration_mins: 15
      })
    });
    await fetch(`${this.apiBaseUrl}/api/v2/participants/${this.participantId}/messaging_mode_session`, requestParams);

    // reload participant state including messaging mode and conversations
    return this.loadMessages();
  }
  async disableManualMode() {
    const requestParams = Object.assign(this.authCredentials(), {
      method: "PATCH",
      body: JSON.stringify([{
        op: "end"
      }])
    });
    await fetch(`${this.apiBaseUrl}/api/v2/participants/${this.participantId}/messaging_mode_session`, requestParams);
    // reload participant state including messaging mode and conversations
    return this.loadMessages();
  }
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
      per_page: this.meta.pageSize
    }, params));
    let res = await fetch(`${this.apiBaseUrl}/api/v2/text_messages?` + search, requestParams);
    if (!res.ok) {
      throw new Error("womp");
    }
    let messages = (await res.json()).data;
    return this.pullMessagesFromData(messages, update);
  }
  pullMessagesFromData(messages) {
    let update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (update) {
      // Our API call finds items updated after the lastUpdated, so if the lastUpdated matched the updated_at
      // of a text we wouldn't get it. Move the search back by a second to account for that
      this.meta.lastUpdated = dayjs().subtract(1, 'second').format('YYYY-MM-DD HH:mm:ss');
    }
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
  }
  async loadMessages() {
    if (this.loading.initial) {
      return false;
    }
    this.loading.initial = true;
    await this.loadMessagesViaParticipantApi(`limit(${this.meta.pageSize})`);
    this.loading.initial = false;
  }
  async poll() {
    if (this.loading.polling) {
      return false;
    }
    this.loading.polling = true;
    await this.loadMessagesViaParticipantApi(`updatedAfter(${this.meta.lastUpdated})`);
    this.loading.polling = false;
  }
  async loadMessagesViaParticipantApi(textMessageCriteria) {
    var _ppt$time_zone_name;
    // use the participants/support_partners endpoint for the initial load and when polling, so we get info on timezone, conversations,
    // and messaging mode
    let auth = this.authCredentials();
    let requestParams = Object.assign(auth, {
      method: "GET"
    });
    const includes = [`text_messages:${textMessageCriteria}`, 'messaging_mode_session', 'current_conversation'];
    const url = `${this.apiBaseUrl}/api/v2/${this.resource}/${this.participantId}?include=${includes.join(',')}`;
    let res = await fetch(url, requestParams);
    if (!res.ok) {
      throw new Error("womp");
    }
    const ppt = (await res.json()).data;
    inboxHelper.setTimezone((_ppt$time_zone_name = ppt === null || ppt === void 0 ? void 0 : ppt.time_zone_name) !== null && _ppt$time_zone_name !== void 0 ? _ppt$time_zone_name : "America/New_York");
    manualModeHelper.setCurrentSession(ppt === null || ppt === void 0 ? void 0 : ppt.messaging_mode_session);
    manualModeHelper.setCurrentConversation(ppt === null || ppt === void 0 ? void 0 : ppt.current_conversation);
    this.pullMessagesFromData(ppt.text_messages, true);
  }
  async loadOlder() {
    if (this.loading.older) {
      return false;
    }
    let params = {
      created_at: 'beforeOrEqual(' + this.meta.oldest + ')'
    };
    this.loading.older = true;
    await this.fetchMessages(params, false);
    this.loading.older = false;
  }
  async sendMessage(message, imageUrl) {
    if (this.loading.send) {
      return false;
    }
    let body = {
      message_text: message,
      media_url: imageUrl,
      force: true
    };
    let auth = this.authCredentials();
    let requestParams = Object.assign(auth, {
      method: "POST",
      body: JSON.stringify(body)
    });
    this.loading.send = true;
    let res = await fetch(`${this.apiBaseUrl}/api/v2/${this.resource}/${this.participantId}/text_messages`, requestParams);
    if (!res.ok) {
      this.loading.older = false;
      throw new Error("womp");
    }
    let text = (await res.json()).data;
    let obj = {};
    obj[text.id] = text;
    this.selectedMessage = null;
    this.messagesObj = Object.assign({}, this.messagesObj, obj);
    this.loading.send = false;
  }
  async sendSuggestedMessage(message, imageUrl) {
    if (!this.aiGeneratedResponse) {
      return false;
    }
    let body = [{
      op: 'replace',
      path: '/final',
      value: message
    }];
    let auth = this.authCredentials();
    let requestParams = Object.assign(auth, {
      method: "PATCH",
      body: JSON.stringify(body)
    });
    let res = await fetch(`${this.apiBaseUrl}/api/v2/ai_response_requests/${this.aiGeneratedResponse.id}`, requestParams);
    if (!res.ok) {
      this.loading.older = false;
      throw new Error("womp");
    }

    //once we've updated the AiResponseRequest we can generate/send the text message
    await this.sendMessage(message, imageUrl);
    this.aiGeneratedResponse = null;
    this.selectedMessage = null;
  }
  async rejectSuggestedMessage(rejectComment) {
    if (!this.aiGeneratedResponse) {
      return false;
    }
    let body = [{
      op: 'replace',
      path: '/review',
      value: 'Rejected'
    }, {
      op: 'replace',
      path: '/comment',
      value: rejectComment
    }];
    let auth = this.authCredentials();
    let requestParams = Object.assign(auth, {
      method: "PATCH",
      body: JSON.stringify(body)
    });
    let res = await fetch(`${this.apiBaseUrl}/api/v2/ai_response_requests/${this.aiGeneratedResponse.id}`, requestParams);
    if (!res.ok) {
      this.loading.older = false;
      throw new Error("womp");
    }
    this.aiGeneratedResponse = null;
    this.selectedMessage = null;
  }
  async refreshSuggestedMessage() {
    if (this.loading.refreshResponse) {
      return false;
    }
    if (!this.aiGeneratedResponse) {
      return false;
    }
    this.loading.refreshResponse = true;
    let body = [{
      op: 'replace',
      path: '/review',
      value: 'Refreshed'
    }];
    let auth = this.authCredentials();
    let requestParams = Object.assign(auth, {
      method: "PATCH",
      body: JSON.stringify(body)
    });
    let res = await fetch(`${this.apiBaseUrl}/api/v2/ai_response_requests/${this.aiGeneratedResponse.id}`, requestParams);
    if (!res.ok) {
      this.loading.older = false;
      throw new Error("womp");
    }
    await this.suggestResponse();
    this.loading.refreshResponse = false;
  }
  async suggestResponse() {
    if (this.loading.suggestResponse) {
      return false;
    }
    if (!this.selectedMessage) {
      return false;
    }
    let body = {
      input: this.selectedMessage.message_text,
      participant_id: this.participantId
    };
    let auth = this.authCredentials();
    let requestParams = Object.assign(auth, {
      method: "POST",
      body: JSON.stringify(body)
    });
    this.loading.suggestResponse = true;
    let res = await fetch(`${this.apiBaseUrl}/api/v2/ai_response_requests`, requestParams);
    if (!res.ok) {
      this.loading.suggestResponse = false;
      throw new Error("womp");
    }
    this.aiGeneratedResponse = (await res.json()).data;
    this.loading.suggestResponse = false;
  }
}
var InboxStore$1 = InboxStore;

let styles$1 = {
  inboxSubmit: "btn px-4 btn-primary mt-1",
  inboxSuggestResponse: "btn px-4 btn-secondary mt-1"
};
var styles$2 = styles$1;

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

var script$8 = {
  name: "LazyImage",
  props: {
    context: {
      type: String,
      validator(value) {
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
  data() {
    return {
      src: null
    };
  },
  computed: {
    loading() {
      return this.src === null;
    },
    imageClass() {
      return `${this.context}-img`;
    },
    style() {
      return {
        'background-image': `url(${this.src})`
      };
    }
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
const __vue_script__$8 = script$8;

/* template */
var __vue_render__$8 = function () {
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
  })], 1) : _c('div', [_vm.context === 'inbox' ? _c('div', {
    staticClass: "inbox-img",
    style: {
      'background-image': "url(" + _vm.src + ")"
    }
  }) : _c('img', {
    class: _vm.imageClass,
    attrs: {
      "src": _vm.src,
      "alt": "Image sent/received by text message"
    }
  })]);
};
var __vue_staticRenderFns__$8 = [];

/* style */
const __vue_inject_styles__$8 = function (inject) {
  if (!inject) return;
  inject("data-v-cdc77716_0", {
    source: ".inbox-img[data-v-cdc77716]{width:200px;height:200px;margin:20px 0;text-align:center;background-repeat:no-repeat;background-position:50% 50%;-webkit-background-size:cover;background-size:cover}.modal-img[data-v-cdc77716]{text-align:center;max-width:100%;max-height:80vh}.gallery-img[data-v-cdc77716]{max-width:100%;margin:10px 0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
const __vue_scope_id__$8 = "data-v-cdc77716";
/* module identifier */
const __vue_module_identifier__$8 = undefined;
/* functional template */
const __vue_is_functional_template__$8 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$8 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, createInjector, undefined, undefined);
var LazyImage = __vue_component__$8;

//
var script$7 = {
  name: "ImageLightbox",
  components: {
    LazyImage
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
  data() {
    return {
      msgId: null,
      imageIndex: null,
      reverseDirection: false
    };
  },
  computed: {
    images() {
      const output = [];
      Object.values(this.store.messagesObj).forEach(msg => {
        msg.media.forEach((media, imageIndex) => {
          output.push({
            msgId: msg.id,
            imageIndex: imageIndex
          });
        });
      });
      return this.reverseDirection ? output.reverse() : output;
    },
    sentTime() {
      const msg = this.store.messagesObj[this.msgId];
      if (msg) {
        return inboxHelper.imageDetailTime(msg);
      } else {
        return '';
      }
    },
    firstImage() {
      return this.images[0];
    },
    lastImage() {
      return this.images[this.images.length - 1];
    },
    showPreviousImageButton() {
      if (!this.firstImage) {
        return false;
      }
      return this.msgId !== this.firstImage.msgId || this.imageIndex !== this.firstImage.imageIndex;
    },
    showNextImageButton() {
      if (!this.lastImage) {
        return false;
      }
      return this.msgId !== this.lastImage.msgId || this.imageIndex !== this.lastImage.imageIndex;
    }
  },
  methods: {
    open(msgId, imageIndex, reverseDirection) {
      // Called from parent component
      this.msgId = msgId;
      this.imageIndex = imageIndex;
      this.reverseDirection = reverseDirection;
    },
    previousImage() {
      const x = this.images.findIndex(item => item.msgId === this.msgId && item.imageIndex === this.imageIndex);
      if (x <= 0) {
        return;
      }
      this.msgId = this.images[x - 1].msgId;
      this.imageIndex = this.images[x - 1].imageIndex;
    },
    nextImage() {
      const x = this.images.findIndex(item => item.msgId === this.msgId && item.imageIndex === this.imageIndex);
      if (x >= this.images.length - 1) {
        return;
      }
      this.msgId = this.images[x + 1].msgId;
      this.imageIndex = this.images[x + 1].imageIndex;
    }
  }
};

/* script */
const __vue_script__$7 = script$7;

/* template */
var __vue_render__$7 = function () {
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
      "change": function ($event) {
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
const __vue_inject_styles__$7 = function (inject) {
  if (!inject) return;
  inject("data-v-8c1ad63a_0", {
    source: "#next-btn[data-v-8c1ad63a],#prev-btn[data-v-8c1ad63a]{cursor:pointer;position:absolute;top:50%;width:auto;padding:16px;margin-top:-50px;color:#fff;font-weight:700;font-size:20px;transition:.6s ease;user-select:none;-webkit-user-select:none;opacity:.3;background-color:#000}#prev-btn[data-v-8c1ad63a]{left:0;border-radius:3px 0 0 3px}#next-btn[data-v-8c1ad63a]{right:0;border-radius:0 3px 3px 0}#next-btn[data-v-8c1ad63a]:hover,#prev-btn[data-v-8c1ad63a]:hover{opacity:.8}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
const __vue_scope_id__$7 = "data-v-8c1ad63a";
/* module identifier */
const __vue_module_identifier__$7 = undefined;
/* functional template */
const __vue_is_functional_template__$7 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$7 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, createInjector, undefined, undefined);
var ImageLightbox = __vue_component__$7;

var main = createCommonjsModule(function (module, exports) {
!function(e,o){module.exports=o();}(commonjsGlobal,function(){return function(e){function o(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,o),n.l=!0,n.exports}var t={};return o.m=e,o.c=t,o.i=function(e){return e},o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:a});},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},o.p="/dist-module/",o(o.s=3)}([function(e,o,t){var a=t(4)(t(1),t(5),null,null,null);e.exports=a.exports;},function(e,o,t){Object.defineProperty(o,"__esModule",{value:!0});var a=t(2),n=function(e){return e&&e.__esModule?e:{default:e}}(a),i=function(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")};o.default={props:{search:{type:String,required:!1,default:""},emojiTable:{type:Object,required:!1,default:function(){return n.default}}},data:function(){return {display:{x:0,y:0,visible:!1}}},computed:{emojis:function(){if(this.search){var e={};for(var o in this.emojiTable){e[o]={};for(var t in this.emojiTable[o])new RegExp(".*"+i(this.search)+".*").test(t)&&(e[o][t]=this.emojiTable[o][t]);0===Object.keys(e[o]).length&&delete e[o];}return e}return this.emojiTable}},methods:{insert:function(e){this.$emit("emoji",e);},toggle:function(e){this.display.visible=!this.display.visible,this.display.x=e.clientX,this.display.y=e.clientY;},hide:function(){this.display.visible=!1;},escape:function(e){!0===this.display.visible&&27===e.keyCode&&(this.display.visible=!1);}},directives:{"click-outside":{bind:function(e,o,t){if("function"==typeof o.value){var a=o.modifiers.bubble,n=function(t){(a||!e.contains(t.target)&&e!==t.target)&&o.value(t);};e.__vueClickOutside__=n,document.addEventListener("click",n);}},unbind:function(e,o){document.removeEventListener("click",e.__vueClickOutside__),e.__vueClickOutside__=null;}}},mounted:function(){document.addEventListener("keyup",this.escape);},destroyed:function(){document.removeEventListener("keyup",this.escape);}};},function(e,o,t){Object.defineProperty(o,"__esModule",{value:!0}),o.default={"Frequently used":{thumbs_up:"👍","-1":"👎",sob:"😭",confused:"😕",neutral_face:"😐",blush:"😊",heart_eyes:"😍"},People:{smile:"😄",smiley:"😃",grinning:"😀",blush:"😊",wink:"😉",heart_eyes:"😍",kissing_heart:"😘",kissing_closed_eyes:"😚",kissing:"😗",kissing_smiling_eyes:"😙",stuck_out_tongue_winking_eye:"😜",stuck_out_tongue_closed_eyes:"😝",stuck_out_tongue:"😛",flushed:"😳",grin:"😁",pensive:"😔",relieved:"😌",unamused:"😒",disappointed:"😞",persevere:"😣",cry:"😢",joy:"😂",sob:"😭",sleepy:"😪",disappointed_relieved:"😥",cold_sweat:"😰",sweat_smile:"😅",sweat:"😓",weary:"😩",tired_face:"😫",fearful:"😨",scream:"😱",angry:"😠",rage:"😡",triumph:"😤",confounded:"😖",laughing:"😆",yum:"😋",mask:"😷",sunglasses:"😎",sleeping:"😴",dizzy_face:"😵",astonished:"😲",worried:"😟",frowning:"😦",anguished:"😧",imp:"👿",open_mouth:"😮",grimacing:"😬",neutral_face:"😐",confused:"😕",hushed:"😯",smirk:"😏",expressionless:"😑",man_with_gua_pi_mao:"👲",man_with_turban:"👳",cop:"👮",construction_worker:"👷",guardsman:"💂",baby:"👶",boy:"👦",girl:"👧",man:"👨",woman:"👩",older_man:"👴",older_woman:"👵",person_with_blond_hair:"👱",angel:"👼",princess:"👸",smiley_cat:"😺",smile_cat:"😸",heart_eyes_cat:"😻",kissing_cat:"😽",smirk_cat:"😼",scream_cat:"🙀",crying_cat_face:"😿",joy_cat:"😹",pouting_cat:"😾",japanese_ogre:"👹",japanese_goblin:"👺",see_no_evil:"🙈",hear_no_evil:"🙉",speak_no_evil:"🙊",skull:"💀",alien:"👽",hankey:"💩",fire:"🔥",sparkles:"✨",star2:"🌟",dizzy:"💫",boom:"💥",anger:"💢",sweat_drops:"💦",droplet:"💧",zzz:"💤",dash:"💨",ear:"👂",eyes:"👀",nose:"👃",tongue:"👅",lips:"👄",thumbs_up:"👍","-1":"👎",ok_hand:"👌",facepunch:"👊",fist:"✊",wave:"👋",hand:"✋",open_hands:"👐",point_up_2:"👆",point_down:"👇",point_right:"👉",point_left:"👈",raised_hands:"🙌",pray:"🙏",clap:"👏",muscle:"💪",walking:"🚶",runner:"🏃",dancer:"💃",couple:"👫",family:"👪",couplekiss:"💏",couple_with_heart:"💑",dancers:"👯",ok_woman:"🙆",no_good:"🙅",information_desk_person:"💁",raising_hand:"🙋",massage:"💆",haircut:"💇",nail_care:"💅",bride_with_veil:"👰",person_with_pouting_face:"🙎",person_frowning:"🙍",bow:"🙇",tophat:"🎩",crown:"👑",womans_hat:"👒",athletic_shoe:"👟",mans_shoe:"👞",sandal:"👡",high_heel:"👠",boot:"👢",shirt:"👕",necktie:"👔",womans_clothes:"👚",dress:"👗",running_shirt_with_sash:"🎽",jeans:"👖",kimono:"👘",bikini:"👙",briefcase:"💼",handbag:"👜",pouch:"👝",purse:"👛",eyeglasses:"👓",ribbon:"🎀",closed_umbrella:"🌂",lipstick:"💄",yellow_heart:"💛",blue_heart:"💙",purple_heart:"💜",green_heart:"💚",broken_heart:"💔",heartpulse:"💗",heartbeat:"💓",two_hearts:"💕",sparkling_heart:"💖",revolving_hearts:"💞",cupid:"💘",love_letter:"💌",kiss:"💋",ring:"💍",gem:"💎",bust_in_silhouette:"👤",speech_balloon:"💬",footprints:"👣"},Nature:{dog:"🐶",wolf:"🐺",cat:"🐱",mouse:"🐭",hamster:"🐹",rabbit:"🐰",frog:"🐸",tiger:"🐯",koala:"🐨",bear:"🐻",pig:"🐷",pig_nose:"🐽",cow:"🐮",boar:"🐗",monkey_face:"🐵",monkey:"🐒",horse:"🐴",sheep:"🐑",elephant:"🐘",panda_face:"🐼",penguin:"🐧",bird:"🐦",baby_chick:"🐤",hatched_chick:"🐥",hatching_chick:"🐣",chicken:"🐔",snake:"🐍",turtle:"🐢",bug:"🐛",bee:"🐝",ant:"🐜",beetle:"🐞",snail:"🐌",octopus:"🐙",shell:"🐚",tropical_fish:"🐠",fish:"🐟",dolphin:"🐬",whale:"🐳",racehorse:"🐎",dragon_face:"🐲",blowfish:"🐡",camel:"🐫",poodle:"🐩",feet:"🐾",bouquet:"💐",cherry_blossom:"🌸",tulip:"🌷",four_leaf_clover:"🍀",rose:"🌹",sunflower:"🌻",hibiscus:"🌺",maple_leaf:"🍁",leaves:"🍃",fallen_leaf:"🍂",herb:"🌿",ear_of_rice:"🌾",mushroom:"🍄",cactus:"🌵",palm_tree:"🌴",chestnut:"🌰",seedling:"🌱",blossom:"🌼",new_moon:"🌑",first_quarter_moon:"🌓",moon:"🌔",full_moon:"🌕",first_quarter_moon_with_face:"🌛",crescent_moon:"🌙",earth_asia:"🌏",volcano:"🌋",milky_way:"🌌",stars:"🌠",partly_sunny:"⛅",snowman:"⛄",cyclone:"🌀",foggy:"🌁",rainbow:"🌈",ocean:"🌊"},Objects:{bamboo:"🎍",gift_heart:"💝",dolls:"🎎",school_satchel:"🎒",mortar_board:"🎓",flags:"🎏",fireworks:"🎆",sparkler:"🎇",wind_chime:"🎐",rice_scene:"🎑",jack_o_lantern:"🎃",ghost:"👻",santa:"🎅",christmas_tree:"🎄",gift:"🎁",tanabata_tree:"🎋",tada:"🎉",confetti_ball:"🎊",balloon:"🎈",crossed_flags:"🎌",crystal_ball:"🔮",movie_camera:"🎥",camera:"📷",video_camera:"📹",vhs:"📼",cd:"💿",dvd:"📀",minidisc:"💽",floppy_disk:"💾",computer:"💻",iphone:"📱",telephone_receiver:"📞",pager:"📟",fax:"📠",satellite:"📡",tv:"📺",radio:"📻",loud_sound:"🔊",bell:"🔔",loudspeaker:"📢",mega:"📣",hourglass_flowing_sand:"⏳",hourglass:"⌛",alarm_clock:"⏰",watch:"⌚",unlock:"🔓",lock:"🔒",lock_with_ink_pen:"🔏",closed_lock_with_key:"🔐",key:"🔑",mag_right:"🔎",bulb:"💡",flashlight:"🔦",electric_plug:"🔌",battery:"🔋",mag:"🔍",bath:"🛀",toilet:"🚽",wrench:"🔧",nut_and_bolt:"🔩",hammer:"🔨",door:"🚪",smoking:"🚬",bomb:"💣",gun:"🔫",hocho:"🔪",pill:"💊",syringe:"💉",moneybag:"💰",yen:"💴",dollar:"💵",credit_card:"💳",money_with_wings:"💸",calling:"📲","e-mail":"📧",inbox_tray:"📥",outbox_tray:"📤",envelope_with_arrow:"📩",incoming_envelope:"📨",mailbox:"📫",mailbox_closed:"📪",postbox:"📮",package:"📦",memo:"📝",page_facing_up:"📄",page_with_curl:"📃",bookmark_tabs:"📑",bar_chart:"📊",chart_with_upwards_trend:"📈",chart_with_downwards_trend:"📉",scroll:"📜",clipboard:"📋",date:"📅",calendar:"📆",card_index:"📇",file_folder:"📁",open_file_folder:"📂",pushpin:"📌",paperclip:"📎",straight_ruler:"📏",triangular_ruler:"📐",closed_book:"📕",green_book:"📗",blue_book:"📘",orange_book:"📙",notebook:"📓",notebook_with_decorative_cover:"📔",ledger:"📒",books:"📚",book:"📖",bookmark:"🔖",name_badge:"📛",newspaper:"📰",art:"🎨",clapper:"🎬",microphone:"🎤",headphones:"🎧",musical_score:"🎼",musical_note:"🎵",notes:"🎶",musical_keyboard:"🎹",violin:"🎻",trumpet:"🎺",saxophone:"🎷",guitar:"🎸",space_invader:"👾",video_game:"🎮",black_joker:"🃏",flower_playing_cards:"🎴",mahjong:"🀄",game_die:"🎲",dart:"🎯",football:"🏈",basketball:"🏀",soccer:"⚽",baseball:"⚾",tennis:"🎾","8ball":"🎱",bowling:"🎳",golf:"⛳",checkered_flag:"🏁",trophy:"🏆",ski:"🎿",snowboarder:"🏂",swimmer:"🏊",surfer:"🏄",fishing_pole_and_fish:"🎣",tea:"🍵",sake:"🍶",beer:"🍺",beers:"🍻",cocktail:"🍸",tropical_drink:"🍹",wine_glass:"🍷",fork_and_knife:"🍴",pizza:"🍕",hamburger:"🍔",fries:"🍟",poultry_leg:"🍗",meat_on_bone:"🍖",spaghetti:"🍝",curry:"🍛",fried_shrimp:"🍤",bento:"🍱",sushi:"🍣",fish_cake:"🍥",rice_ball:"🍙",rice_cracker:"🍘",rice:"🍚",ramen:"🍜",stew:"🍲",oden:"🍢",dango:"🍡",egg:"🍳",bread:"🍞",doughnut:"🍩",custard:"🍮",icecream:"🍦",ice_cream:"🍨",shaved_ice:"🍧",birthday:"🎂",cake:"🍰",cookie:"🍪",chocolate_bar:"🍫",candy:"🍬",lollipop:"🍭",honey_pot:"🍯",apple:"🍎",green_apple:"🍏",tangerine:"🍊",cherries:"🍒",grapes:"🍇",watermelon:"🍉",strawberry:"🍓",peach:"🍑",melon:"🍈",banana:"🍌",pineapple:"🍍",sweet_potato:"🍠",eggplant:"🍆",tomato:"🍅",corn:"🌽"},Places:{house:"🏠",house_with_garden:"🏡",school:"🏫",office:"🏢",post_office:"🏣",hospital:"🏥",bank:"🏦",convenience_store:"🏪",love_hotel:"🏩",hotel:"🏨",wedding:"💒",church:"⛪",department_store:"🏬",city_sunrise:"🌇",city_sunset:"🌆",japanese_castle:"🏯",european_castle:"🏰",tent:"⛺",factory:"🏭",tokyo_tower:"🗼",japan:"🗾",mount_fuji:"🗻",sunrise_over_mountains:"🌄",sunrise:"🌅",night_with_stars:"🌃",statue_of_liberty:"🗽",bridge_at_night:"🌉",carousel_horse:"🎠",ferris_wheel:"🎡",fountain:"⛲",roller_coaster:"🎢",ship:"🚢",boat:"⛵",speedboat:"🚤",rocket:"🚀",seat:"💺",station:"🚉",bullettrain_side:"🚄",bullettrain_front:"🚅",metro:"🚇",railway_car:"🚃",bus:"🚌",blue_car:"🚙",car:"🚗",taxi:"🚕",truck:"🚚",rotating_light:"🚨",police_car:"🚓",fire_engine:"🚒",ambulance:"🚑",bike:"🚲",barber:"💈",busstop:"🚏",ticket:"🎫",traffic_light:"🚥",construction:"🚧",beginner:"🔰",fuelpump:"⛽",izakaya_lantern:"🏮",slot_machine:"🎰",moyai:"🗿",circus_tent:"🎪",performing_arts:"🎭",round_pushpin:"📍",triangular_flag_on_post:"🚩"},Symbols:{keycap_ten:"🔟",1234:"🔢",symbols:"🔣",capital_abcd:"🔠",abcd:"🔡",abc:"🔤",arrow_up_small:"🔼",arrow_down_small:"🔽",rewind:"⏪",fast_forward:"⏩",arrow_double_up:"⏫",arrow_double_down:"⏬",ok:"🆗",new:"🆕",up:"🆙",cool:"🆒",free:"🆓",ng:"🆖",signal_strength:"📶",cinema:"🎦",koko:"🈁",u6307:"🈯",u7a7a:"🈳",u6e80:"🈵",u5408:"🈴",u7981:"🈲",ideograph_advantage:"🉐",u5272:"🈹",u55b6:"🈺",u6709:"🈶",u7121:"🈚",restroom:"🚻",mens:"🚹",womens:"🚺",baby_symbol:"🚼",wc:"🚾",no_smoking:"🚭",u7533:"🈸",accept:"🉑",cl:"🆑",sos:"🆘",id:"🆔",no_entry_sign:"🚫",underage:"🔞",no_entry:"⛔",negative_squared_cross_mark:"❎",white_check_mark:"✅",heart_decoration:"💟",vs:"🆚",vibration_mode:"📳",mobile_phone_off:"📴",ab:"🆎",diamond_shape_with_a_dot_inside:"💠",ophiuchus:"⛎",six_pointed_star:"🔯",atm:"🏧",chart:"💹",heavy_dollar_sign:"💲",currency_exchange:"💱",x:"❌",exclamation:"❗",question:"❓",grey_exclamation:"❕",grey_question:"❔",o:"⭕",top:"🔝",end:"🔚",back:"🔙",on:"🔛",soon:"🔜",arrows_clockwise:"🔃",clock12:"🕛",clock1:"🕐",clock2:"🕑",clock3:"🕒",clock4:"🕓",clock5:"🕔",clock6:"🕕",clock7:"🕖",clock8:"🕗",clock9:"🕘",clock10:"🕙",clock11:"🕚",heavy_plus_sign:"➕",heavy_minus_sign:"➖",heavy_division_sign:"➗",white_flower:"💮",100:"💯",radio_button:"🔘",link:"🔗",curly_loop:"➰",trident:"🔱",small_red_triangle:"🔺",black_square_button:"🔲",white_square_button:"🔳",red_circle:"🔴",large_blue_circle:"🔵",small_red_triangle_down:"🔻",white_large_square:"⬜",black_large_square:"⬛",large_orange_diamond:"🔶",large_blue_diamond:"🔷",small_orange_diamond:"🔸",small_blue_diamond:"🔹"}};},function(e,o,t){Object.defineProperty(o,"__esModule",{value:!0}),o.EmojiPickerPlugin=o.EmojiPicker=void 0;var a=t(0),n=function(e){return e&&e.__esModule?e:{default:e}}(a),i={install:function(e){e.component("emoji-picker",n.default);}};"undefined"!=typeof window&&(window.EmojiPicker=i),o.EmojiPicker=n.default,o.EmojiPickerPlugin=i,o.default=n.default;},function(e,o){e.exports=function(e,o,t,a,n){var i,r=e=e||{},s=typeof e.default;"object"!==s&&"function"!==s||(i=e,r=e.default);var l="function"==typeof r?r.options:r;o&&(l.render=o.render,l.staticRenderFns=o.staticRenderFns),a&&(l._scopeId=a);var _;if(n?(_=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),t&&t.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(n);},l._ssrRegister=_):t&&(_=t),_){var c=l.functional,u=c?l.render:l.beforeCreate;c?l.render=function(e,o){return _.call(o),u(e,o)}:l.beforeCreate=u?[].concat(u,_):[_];}return {esModule:i,exports:r,options:l}};},function(e,o){e.exports={render:function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("div",[e._t("emoji-invoker",null,{events:{click:function(o){return e.toggle(o)}}}),e._v(" "),e.display.visible?t("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.hide,expression:"hide"}]},[e._t("emoji-picker",null,{emojis:e.emojis,insert:e.insert,display:e.display})],2):e._e()],2)},staticRenderFns:[]};}])});

});

var emojiRegex = () => {
	// https://mths.be/emoji
	return /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26F9(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC3\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC08\uDC26](?:\u200D\u2B1B)?|[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC2\uDECE-\uDEDB\uDEE0-\uDEE8]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
};

function isJustEmoji(string) {
  // regex is: (start-of-string)(1 or more emoji, spaces, or newlines)(end-of-string)
  const justEmojiRegex = new RegExp(`^((${emojiRegex().source})|[ \n])+$`);
  return justEmojiRegex.test(string);
}

//
var script$6 = {
  name: 'InputArea',
  components: {
    EmojiPicker: main.EmojiPicker
  },
  directives: {
    focus: {
      inserted(el) {
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
  data() {
    return {
      search: ''
    };
  },
  watch: {
    value(newVal) {
      this.resizeTextarea(newVal);
    }
  },
  methods: {
    insertEmoji(emoji) {
      const textarea = this.$refs.textarea;
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const newValue = this.value.substring(0, startPos) + emoji + this.value.substring(endPos, this.value.length);
      this.$emit('input', newValue);
      textarea.focus();
      this.$nextTick(() => {
        textarea.selectionStart = textarea.selectionEnd = startPos + emoji.length;
      });
    },
    resizeTextarea(newVal) {
      const textarea = this.$refs.textarea;
      textarea.style.height = "auto"; // reset
      textarea.style.fontSize = isJustEmoji(newVal) ? '1.8rem' : null;
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }
};

/* script */
const __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', {
    staticClass: "wrapper"
  }, [_c('textarea', {
    ref: "textarea",
    staticClass: "form-control",
    attrs: {
      "cols": "30",
      "disabled": _vm.disabled
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": function ($event) {
        return _vm.$emit('input', $event.target.value);
      }
    }
  }), _vm._v(" "), _vm.showImageUploadInvoker ? _c('button', {
    staticClass: "image-upload-invoker",
    on: {
      "click": function ($event) {
        $event.stopPropagation();
        return _vm.$emit('openImageUpload');
      }
    }
  }, [_c('svg', {
    staticClass: "h-6 w-6 fill-current text-grey",
    attrs: {
      "viewBox": "0 0 1024 1024",
      "xmlns": "http://www.w3.org/2000/svg"
    }
  }, [_c('path', {
    attrs: {
      "d": "M96 896a32 32 0 01-32-32V160a32 32 0 0132-32h832a32 32 0 0132 32v704a32 32 0 01-32 32H96zm315.52-228.48l-68.928-68.928a32 32 0 00-45.248 0L128 768.064h778.688l-242.112-290.56a32 32 0 00-49.216 0L458.752 665.408a32 32 0 01-47.232 2.112zM256 384a96 96 0 10192.064-.064A96 96 0 00256 384z"
    }
  })])]) : _vm._e(), _vm._v(" "), _c('emoji-picker', {
    attrs: {
      "search": _vm.search
    },
    on: {
      "emoji": _vm.insertEmoji
    },
    scopedSlots: _vm._u([{
      key: "emoji-invoker",
      fn: function (ref) {
        var clickEvent = ref.events.click;
        return [_c('button', {
          staticClass: "emoji-invoker",
          on: {
            "click": function ($event) {
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
      fn: function (ref) {
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
            "input": function ($event) {
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
                "click": function ($event) {
                  return insert(emoji);
                }
              }
            }, [_vm._v(_vm._s(emoji))]);
          }), 0)]);
        }), 0)])];
      }
    }])
  })], 1);
};
var __vue_staticRenderFns__$6 = [];

/* style */
const __vue_inject_styles__$6 = function (inject) {
  if (!inject) return;
  inject("data-v-8b173f24_0", {
    source: "textarea[data-v-8b173f24]{resize:none}.wrapper[data-v-8b173f24]{position:relative}.emoji-invoker[data-v-8b173f24],.image-upload-invoker[data-v-8b173f24]{position:absolute;top:.5rem;width:1.5rem;height:1.5rem;border-radius:50%;cursor:pointer;transition:all .2s;padding:0;background:0 0;border:0}.emoji-invoker[data-v-8b173f24]{right:.5rem}.image-upload-invoker[data-v-8b173f24]{right:2.5rem}.emoji-invoker[data-v-8b173f24]:hover,.image-upload-invoker[data-v-8b173f24]:hover{transform:scale(1.1)}.emoji-invoker>svg[data-v-8b173f24],.image-upload-invoker>svg[data-v-8b173f24]{fill:#b1c6d0}.emoji-picker[data-v-8b173f24]{position:absolute;z-index:1;border:1px solid #ccc;width:17rem;right:0;height:20rem;overflow:scroll;padding:1rem;box-sizing:border-box;border-radius:.5rem;background:#fff;box-shadow:1px 1px 8px #c7dbe6}.emoji-picker__search[data-v-8b173f24]{display:flex}.emoji-picker__search>input[data-v-8b173f24]{flex:1;border-radius:10rem;border:1px solid #ccc;padding:.5rem 1rem;outline:0}.emoji-picker h5[data-v-8b173f24]{margin-bottom:0;color:#b1b1b1;text-transform:uppercase;font-size:.8rem;cursor:default}.emoji-picker .emojis[data-v-8b173f24]{display:flex;flex-wrap:wrap;justify-content:space-between}.emoji-picker .emojis[data-v-8b173f24]:after{content:\"\";flex:auto}.emoji-picker .emojis span[data-v-8b173f24]{padding:.2rem;cursor:pointer;border-radius:5px}.emoji-picker .emojis span[data-v-8b173f24]:hover{background:#ececec;cursor:pointer}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
const __vue_scope_id__$6 = "data-v-8b173f24";
/* module identifier */
const __vue_module_identifier__$6 = undefined;
/* functional template */
const __vue_is_functional_template__$6 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$6 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, createInjector, undefined, undefined);
var InputArea = __vue_component__$6;

//
var script$5 = {
  name: "GalleryView",
  components: {
    LazyImage
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
};

/* script */
const __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', {
    staticClass: "container gallery-view"
  }, [_c('div', {
    staticClass: "row row-cols-2 row-cols-md-4"
  }, _vm._l(_vm.messagesWithImages, function (msg) {
    return _c('div', {
      key: msg.id,
      staticClass: "col mb-2"
    }, [_c('b-card', {
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
        fn: function () {
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
          "click": function ($event) {
            return _vm.$emit('openImageLightbox', msg.id, idx);
          }
        }
      })], 1);
    }), 0)], 1)], 1);
  }), 0), _vm._v(" "), _c('div', {
    staticClass: "text-center",
    class: {
      'invisible': !_vm.showLoadMore
    }
  }, [_c('b-spinner', {
    attrs: {
      "variant": "primary",
      "label": "Spinning"
    }
  })], 1)]);
};
var __vue_staticRenderFns__$5 = [];

/* style */
const __vue_inject_styles__$5 = function (inject) {
  if (!inject) return;
  inject("data-v-0b96e314_0", {
    source: ".gallery-view .col[data-v-0b96e314]{padding:0 5px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
const __vue_scope_id__$5 = "data-v-0b96e314";
/* module identifier */
const __vue_module_identifier__$5 = undefined;
/* functional template */
const __vue_is_functional_template__$5 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$5 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, createInjector, undefined, undefined);
var GalleryView = __vue_component__$5;

//
var script$4 = {
  name: "MessageView",
  components: {
    LazyImage
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
  data() {
    return {
      isJustEmoji
    };
  },
  methods: {
    selectMessage: function (event, msg) {
      if (this.showAiIcon && msg.direction === 'inbound') {
        var _this$$el;
        let previouslySelectedMessage = (_this$$el = this.$el) === null || _this$$el === void 0 ? void 0 : _this$$el.querySelector('.message-container.selected');
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
};

/* script */
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', [_vm.showLoadMore ? _c('div', {
    staticClass: "text-center"
  }, [_c('b-spinner', {
    attrs: {
      "variant": "primary",
      "label": "Spinning"
    }
  })], 1) : _vm._e(), _vm._v(" "), _vm._l(_vm.messagesByDate, function (msgs, date) {
    return _c('div', {
      key: date
    }, [_c('div', {
      staticClass: "date"
    }, [_vm._v("\n      " + _vm._s(_vm.inboxHelper.formatDate(date, false)) + "\n    ")]), _vm._v(" "), _vm._l(msgs, function (msg) {
      return _c('div', {
        key: msg.id
      }, [msg.sender ? _c('div', {
        staticClass: "sender"
      }, [_vm._v("\n        " + _vm._s(msg.sender) + "\n      ")]) : _vm._e(), _vm._v(" "), _c('div', {
        staticClass: "message-container",
        on: {
          "click": function ($event) {
            return _vm.selectMessage($event, msg);
          }
        }
      }, [_c('div', {
        staticClass: "message",
        class: _vm.inboxHelper.messageClasses(msg, _vm.showAiIcon)
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
      }, [_vm._v(_vm._s(_vm.inboxHelper.messageTime(msg)))]), _vm._v(" "), _c('span', {
        staticClass: "status-icon"
      }, [_c('b-icon', {
        attrs: {
          "id": "icon-" + msg.id,
          "icon": _vm.inboxHelper.getIconForStatus(_vm.inboxHelper.statusType(msg)).icon,
          "variant": _vm.inboxHelper.getIconForStatus(_vm.inboxHelper.statusType(msg)).variant,
          "font-scale": _vm.inboxHelper.getIconForStatus(_vm.inboxHelper.statusType(msg)).scale
        }
      })], 1), _vm._v(" "), _c('b-popover', {
        attrs: {
          "target": "icon-" + msg.id,
          "title": "Text Message Details",
          "triggers": "click blur",
          "placement": msg.direction === 'inbound' ? 'right' : 'left'
        },
        scopedSlots: _vm._u([{
          key: "title",
          fn: function () {
            return [_vm._v("\n              Text Message Details\n            ")];
          },
          proxy: true
        }], null, true)
      }, [_vm._v(" "), _c('strong', [_vm._v("From:")]), _vm._v(" " + _vm._s(_vm.inboxHelper.formatNumber(msg.from_number))), _c('br'), _vm._v(" "), _c('strong', [_vm._v("To:")]), _vm._v(" " + _vm._s(_vm.inboxHelper.formatNumber(msg.to_number))), _c('br'), _vm._v(" "), _c('strong', [_vm._v("Status:")]), _vm._v(" " + _vm._s(_vm.inboxHelper.messageStatus(msg))), _c('br'), _vm._v(" "), _c('strong', [_vm._v("Sent:")]), _vm._v(" " + _vm._s(_vm.inboxHelper.messageDetailTime(msg)) + "\n            "), msg.metadata ? _c('span', [_c('br'), _c('strong', [_vm._v("Metadata:")]), _vm._v(" " + _vm._s(_vm.inboxHelper.messageMetadata(msg)) + "\n            ")]) : _vm._e()]), _vm._v(" "), _c('span', {
        class: {
          'emojiOnly': _vm.isJustEmoji(msg.message_text)
        },
        staticStyle: {
          "white-space": "pre-wrap"
        }
      }, [_vm._v(_vm._s(msg.message_text))]), _vm._v(" "), msg.media.length > 0 ? _c('ul', {
        staticClass: "list-inline"
      }, _vm._l(msg.media, function (media, idx) {
        return _c('li', {
          key: media.sid,
          staticClass: "cursor-pointer"
        }, [_c('LazyImage', {
          attrs: {
            "context": "inbox",
            "store": _vm.store,
            "url": _vm.store.getImageUrl(msg.id, idx)
          },
          nativeOn: {
            "click": function ($event) {
              return _vm.$emit('openImageLightbox', msg.id, idx);
            }
          }
        })], 1);
      }), 0) : _vm._e(), _vm._v(" "), _vm.showAiIcon && msg.direction === 'inbound' && _vm.store.selectedMessage && _vm.store.selectedMessage.id === msg.id ? _c('div', {
        staticClass: "stars-container",
        on: {
          "click": function ($event) {
            $event.stopPropagation();
            !_vm.store.loading.suggestResponse && _vm.$emit('suggestResponse');
          }
        }
      }, [_c('b-icon', {
        staticClass: "selected-icon",
        class: {
          'text-muted': _vm.store.loading.suggestResponse
        },
        attrs: {
          "icon": "stars",
          "scale": "2"
        }
      })], 1) : _vm._e()], 1)])]);
    })], 2);
  })], 2);
};
var __vue_staticRenderFns__$4 = [];

/* style */
const __vue_inject_styles__$4 = function (inject) {
  if (!inject) return;
  inject("data-v-56bf67bc_0", {
    source: ".date[data-v-56bf67bc]{clear:both;font-size:1.1em;color:gray;text-align:center}.message[data-v-56bf67bc]{position:relative;display:inline-block;min-width:150px;max-width:450px;padding:10px 18px;clear:both;vertical-align:top;border-radius:5px;-webkit-box-shadow:0 0 6px #b2b2b2;box-shadow:0 0 6px #b2b2b2}.emojiOnly[data-v-56bf67bc]{font-size:1.8em}div.sender[data-v-56bf67bc]{float:right;margin:0 20px 0 0;clear:both;font-size:12px;color:#6c6f76}.inbound[data-v-56bf67bc]{float:left;margin:5px 45px 5px 20px;background-color:#bdf9bd}.inbound[data-v-56bf67bc]::before{left:-9px;background-color:#bdf9bd;-webkit-box-shadow:-2px 2px 2px 0 rgba(178,178,178,.4);box-shadow:-2px 2px 2px 0 rgba(178,178,178,.4)}.inbound.ai-suggestion-selectable[data-v-56bf67bc]:hover{box-shadow:0 0 2px 20px rgba(0,100,0,.4)}.message-container.selected .inbound[data-v-56bf67bc]{box-shadow:0 0 2px 20px rgba(190,205,175,.4)}.message-container.selected .message .stars-container[data-v-56bf67bc]{position:absolute;left:100%;top:50%;transform:translateY(-50%);margin-left:25px;background:linear-gradient(135deg,#6366f1 0,#8b5cf6 25%,#d1d5db 50%,#6366f1 75%,#8b5cf6 100%);padding:12px;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.1);width:40px;height:40px;display:flex;align-items:center;justify-content:center;background-size:400% 400%;cursor:pointer;transition:transform .2s ease}.message-container.selected .message .stars-container[data-v-56bf67bc]:hover:not(:has(.text-muted)){transform:translateY(-50%) scale(1.1);box-shadow:0 4px 8px rgba(0,0,0,.2)}.message-container.selected .message .stars-container[data-v-56bf67bc]:has(.text-muted){animation:gradientShift-data-v-56bf67bc 3s ease-in-out infinite}@keyframes gradientShift-data-v-56bf67bc{0%{background-position:0 50%}50%{background-position:100% 50%}100%{background-position:0 50%}}.message-container.selected .selected-icon[data-v-56bf67bc]{color:#fff;font-size:.875rem;margin:0;padding:0}.message[data-v-56bf67bc]::before{position:absolute;top:11px;display:block;width:20px;height:16px;content:\"\\00a0\";-webkit-transform:rotate(29deg) skew(-35deg);-moz-transform:rotate(29deg) skew(-35deg);-ms-transform:rotate(29deg) skew(-35deg);-o-transform:rotate(29deg) skew(-35deg);transform:rotate(29deg) skew(-35deg)}.outbound[data-v-56bf67bc]{float:right;margin:5px 20px 5px 45px;background-color:#badfff}.outbound[data-v-56bf67bc]::before{right:-9px;-webkit-box-shadow:2px -2px 2px 0 rgb(178 178 178 / 40%);box-shadow:2px -2px 2px 0 rgb(178 178 178 / 40%);background-color:#badfff}.outbound.automated[data-v-56bf67bc],.outbound.automated[data-v-56bf67bc]::before{background-color:#e0f1ff}.outbound.manual[data-v-56bf67bc],.outbound.manual[data-v-56bf67bc]::before{background-color:#badfff}.message-container[data-v-56bf67bc]{position:relative;display:inline-block;width:100%}.message-container .inbound[data-v-56bf67bc]{float:left}.message-container .outbound[data-v-56bf67bc]{float:right}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
const __vue_scope_id__$4 = "data-v-56bf67bc";
/* module identifier */
const __vue_module_identifier__$4 = undefined;
/* functional template */
const __vue_is_functional_template__$4 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, createInjector, undefined, undefined);
var MessageView = __vue_component__$4;

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
//

var script$3 = {
  name: "ManualModeWarningModal",
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  }
};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function () {
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
const __vue_inject_styles__$3 = undefined;
/* scoped */
const __vue_scope_id__$3 = undefined;
/* module identifier */
const __vue_module_identifier__$3 = undefined;
/* functional template */
const __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);
var ManualModeWarningModal = __vue_component__$3;

//
var script$2 = {
  name: "ManualModeToggle",
  components: {
    ManualModeWarningModal
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
  data() {
    return {
      showWarningModal: false
    };
  },
  mounted() {
    // force updating for the sake of the relative timer which isn't easy to make reactive
    setInterval(() => {
      this.$forceUpdate();
    }, 30 * 1000);
  },
  methods: {
    toggleManualMode(val) {
      const mode = val ? 'Automated' : 'Manual';
      if (mode === 'Manual') {
        this.showWarningModal = true;
      } else {
        this.store.disableManualMode();
      }
    }
  }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {
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
      "ok": function ($event) {
        return _vm.store.enableManualMode();
      }
    }
  }), _vm._v(" "), _vm.helper.session ? _c('b-form-checkbox', {
    attrs: {
      "checked": !_vm.helper.isManualModeActive,
      "switch": ""
    },
    on: {
      "change": _vm.toggleManualMode
    }
  }, [_vm._v("\n    Automated Messaging Mode\n  ")]) : _vm._e(), _vm._v(" "), _vm.helper.isManualModeActive ? _c('div', {
    staticClass: "alert alert-warning"
  }, [_c('strong', [_vm._v("All automated text message processing is temporarily disabled")]), _vm._v(", including conversations\n    (scheduled or ongoing), auto-responders, and incidents. Automated messaging mode will resume\n    in "), _c('abbr', {
    directives: [{
      name: "b-tooltip",
      rawName: "v-b-tooltip"
    }],
    attrs: {
      "title": _vm.helper.manualModeExpiration
    }
  }, [_vm._v(_vm._s(_vm.helper.sessionTimeRemaining))]), _vm._v(".\n  ")]) : _vm.helper.isConversationActive ? _c('div', {
    staticClass: "alert alert-warning"
  }, [_c('strong', [_vm._v(_vm._s(_vm.helper.conversationName))]), _vm._v(" conversation in progress until\n    "), _c('strong', [_vm._v(_vm._s(_vm.helper.conversationExpiration))]), _vm._v(". Disabling\n    \"Automated Messaging Mode\" will stop this conversation and any automated responses.\n  ")]) : _vm.helper.isAutomatedModeActive ? _c('div', {
    staticClass: "alert alert-success"
  }, [_vm._v("\n    Any incoming texts from this participant will be processed by the study's configured message handlers.\n  ")]) : _vm._e()], 1);
};
var __vue_staticRenderFns__$2 = [];

/* style */
const __vue_inject_styles__$2 = undefined;
/* scoped */
const __vue_scope_id__$2 = undefined;
/* module identifier */
const __vue_module_identifier__$2 = undefined;
/* functional template */
const __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);
var ManualModeToggle = __vue_component__$2;

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

var script$1 = {
  name: "AiResponseRequestRejectModal",
  props: {
    store: {
      type: Object,
      required: true
    }
  },
  data() {
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
    async onSubmit() {
      let rejectComment = this.rejectComment;
      if (rejectComment === 'other') {
        rejectComment = this.otherValue;
      }
      this.$emit('submit', rejectComment);
    }
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {
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
      fn: function (ref) {
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
            "click": function ($event) {
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
      callback: function ($$v) {
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
      callback: function ($$v) {
        _vm.otherValue = $$v;
      },
      expression: "otherValue"
    }
  }) : _vm._e()], 1);
};
var __vue_staticRenderFns__$1 = [];

/* style */
const __vue_inject_styles__$1 = undefined;
/* scoped */
const __vue_scope_id__$1 = undefined;
/* module identifier */
const __vue_module_identifier__$1 = undefined;
/* functional template */
const __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);
var AiResponseRequestRejectModal = __vue_component__$1;

//
var script = {
  name: "InboxComponent",
  components: {
    ManualModeToggle,
    GalleryView,
    InputArea,
    ImageLightbox,
    MessageView,
    AiResponseRequestRejectModal
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
      validator: function (value) {
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
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      scrolled: false,
      styleConfig: Object.assign(styles$2, this.styles),
      store: null,
      inboxHelper,
      manualModeHelper,
      textContent: "",
      imageUrl: "",
      imageName: "",
      showImageUploader: false,
      showImageLightbox: false,
      galleryView: false
    };
  },
  computed: {
    disableTextInput() {
      return !!this.store.loading.send || !!this.store.loading.suggestResponse || !!this.store.loading.refreshResponse;
    },
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
    },
    messagesWithImages() {
      return Object.values(this.store.messagesObj).filter(msg => msg.media.length > 0).reverse();
    },
    latestMessageId() {
      return Math.max(...Object.keys(this.store.messagesObj));
    }
  },
  watch: {
    latestMessageId() {
      this.$nextTick(() => {
        this.scrollToNewest('smooth');
      });
    },
    galleryView() {
      // scroll to newest when changing views
      this.$nextTick(() => {
        this.scrollToNewest();
      });
    }
  },
  async created() {
    this.store = new InboxStore$1(this.apiBaseUrl, this.participantId, this.resource, this.studyId, this.auth);
    this.store.loadMessages().then(() => {
      this.scrollToNewest();
    }).catch(e => {
      // TODO: proper error handling
      console.log(e);
    });
  },
  mounted() {
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
    attachImage(url) {
      let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Attachment";
      this.imageUrl = url;
      this.imageName = name;
    },
    removeAttachment() {
      this.imageUrl = '';
      this.imageName = '';
    },
    openImageUpload() {
      this.showImageUploader = true;
    },
    openImageLightbox(msgId, imageIndex) {
      this.showImageLightbox = true;
      this.$refs.imageLightbox.open(msgId, imageIndex, this.galleryView);
    },
    openRejectCommentModal() {
      this.$bvModal.show('reject-comment-modal');
    },
    scrollToNewest() {
      let behavior = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';
      const el = this.$el.querySelector('.inbox');
      const scrollToOffset = this.galleryView ? 0 : el.scrollHeight;
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
    handleLoadMore() {
      var _this$$el;
      let inboxDiv = (_this$$el = this.$el) === null || _this$$el === void 0 ? void 0 : _this$$el.querySelector('.inbox');
      inboxDiv.onscroll = () => {
        if (inboxDiv) {
          if (this.galleryView) {
            if (inboxDiv.scrollTop >= inboxDiv.scrollHeight - inboxDiv.clientHeight - 1) {
              this.store.loadOlder();
            }
          } else {
            if (inboxDiv.scrollTop === 0) {
              this.store.loadOlder();
            }
          }
        }
      };
    },
    async sendMessage() {
      if (this.textContent.length || this.imageUrl) {
        await this.store.sendMessage(this.textContent, this.imageUrl);
        this.scrollToNewest('smooth');
        this.textContent = "";
        this.imageUrl = '';
        this.imageName = '';
      }
    },
    async sendSuggestedResponse() {
      if (this.textContent.length && this.store.aiGeneratedResponse) {
        var _this$$el2;
        await this.store.sendSuggestedMessage(this.textContent, this.imageUrl);
        (_this$$el2 = this.$el) === null || _this$$el2 === void 0 ? void 0 : _this$$el2.querySelector('.message-container.selected').classList.remove('selected');
        this.scrollToNewest('smooth');
        this.textContent = "";
        this.imageUrl = '';
        this.imageName = '';
      }
    },
    async rejectSuggestedResponse(comment) {
      if (this.store.aiGeneratedResponse) {
        var _this$$el3;
        await this.store.rejectSuggestedMessage(comment);
        (_this$$el3 = this.$el) === null || _this$$el3 === void 0 ? void 0 : _this$$el3.querySelector('.message-container.selected').classList.remove('selected');
        this.textContent = "";
        this.imageUrl = '';
        this.imageName = '';
        this.$bvModal.hide('reject-comment-modal');
      }
    },
    async refreshSuggestedResponse() {
      await this.store.refreshSuggestedMessage();
      this.textContent = this.store.aiGeneratedResponse.response;
    },
    async suggestResponse() {
      await this.store.suggestResponse();
      this.textContent = this.store.aiGeneratedResponse.response;
    },
    poll() {
      setTimeout(() => {
        this.store.poll();
        this.poll();
      }, this.pollFrequencySeconds * 1000);
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
    staticClass: "inbox-component"
  }, [_c('div', {
    staticClass: "float-right"
  }, [_c('b-form-checkbox', {
    staticClass: "float-right mr-2",
    attrs: {
      "switch": ""
    },
    model: {
      value: _vm.galleryView,
      callback: function ($$v) {
        _vm.galleryView = $$v;
      },
      expression: "galleryView"
    }
  }, [_vm._v("\n      Media View\n    ")])], 1), _vm._v(" "), _c('p', [_vm._v("\n    All texts are displayed in the participant's current time zone: " + _vm._s(_vm.inboxHelper.getFriendlyTimezoneName()) + "\n  ")]), _vm._v(" "), _c('div', [_c('div', {
    staticClass: "inbox clearfix"
  }, [_vm.galleryView ? _c('GalleryView', {
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
  })], 1)]), _vm._v(" "), _c('ImageLightbox', {
    ref: "imageLightbox",
    attrs: {
      "store": _vm.store
    },
    model: {
      value: _vm.showImageLightbox,
      callback: function ($$v) {
        _vm.showImageLightbox = $$v;
      },
      expression: "showImageLightbox"
    }
  }), _vm._v(" "), _vm.manualModeEnabled ? _c('ManualModeToggle', {
    attrs: {
      "store": _vm.store,
      "helper": _vm.manualModeHelper
    }
  }) : _vm._e(), _vm._v(" "), _c('AiResponseRequestRejectModal', {
    attrs: {
      "store": _vm.store
    },
    on: {
      "submit": _vm.rejectSuggestedResponse
    }
  }), _vm._v(" "), !_vm.readOnly ? _c('div', [_vm._t("imagePicker", null, {
    "attachImage": _vm.attachImage,
    "onClose": function () {
      return _vm.showImageUploader = false;
    },
    "isOpen": _vm.showImageUploader
  }), _vm._v(" "), _c('InputArea', {
    attrs: {
      "disabled": _vm.disableTextInput,
      "show-image-upload-invoker": _vm.imageUploadEnabled && !_vm.imageUrl
    },
    on: {
      "openImageUpload": function ($event) {
        _vm.showImageUploader = true;
      }
    },
    model: {
      value: _vm.textContent,
      callback: function ($$v) {
        _vm.textContent = $$v;
      },
      expression: "textContent"
    }
  }), _vm._v(" "), !_vm.store.aiGeneratedResponse ? _c('div', {
    staticClass: "inbox-action-items"
  }, [_vm.imageUrl ? _c('div', [_c('h4', [_vm._v("Attachments")]), _vm._v(" "), _c('ul', {
    staticClass: "list-unstyled"
  }, [_c('li', [_c('span', {
    staticClass: "filename"
  }, [_vm._v(_vm._s(_vm.imageName))]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-link",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.removeAttachment
    }
  }, [_c('span', {
    staticClass: "fa fa-trash text-danger"
  }), _vm._v(" "), _c('span', {
    staticClass: "sr-only"
  }, [_vm._v("Remove")])])])])]) : _vm._e(), _vm._v(" "), !_vm.store.loading.send ? _c('input', {
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
  }, [_vm._v("\n        Send SMS Message\n        "), _c('b-spinner', {
    attrs: {
      "small": "",
      "variant": "light",
      "label": "Spinning"
    }
  })], 1), _vm._v(" "), _vm.aiSuggestionsEnabled && _vm.store.selectedMessage && !_vm.store.loading.suggestResponse ? _c('input', {
    class: [_vm.styleConfig.inboxSuggestResponse, 'suggest-response-button', {
      'selected': _vm.store.selectedMessage,
      'loading': _vm.store.loading.suggestResponse
    }],
    attrs: {
      "type": "submit",
      "value": "Suggest Response",
      "disabled": _vm.store.loading.suggestResponse && !_vm.store.selectedMessage
    },
    on: {
      "click": _vm.suggestResponse
    }
  }) : _vm.aiSuggestionsEnabled && !_vm.store.selectedMessage || _vm.store.loading.suggestResponse ? _c('div', {
    class: [_vm.styleConfig.inboxSuggestResponse, 'suggest-response-button', {
      'selected': _vm.store.selectedMessage,
      'loading': _vm.store.loading.suggestResponse
    }],
    attrs: {
      "id": "ai-response-info"
    }
  }, [_vm._v("\n        Suggest Response\n        "), _vm.store.loading.suggestResponse ? _c('b-spinner', {
    attrs: {
      "small": "",
      "variant": "light",
      "label": "Spinning"
    }
  }) : _vm._e(), _vm._v(" "), !_vm.store.selectedMessage ? _c('span', [_c('b-icon', {
    staticClass: "ml-1",
    attrs: {
      "id": "ai-response-info-icon",
      "icon": "info-circle-fill",
      "variant": "dark",
      "font-scale": "1"
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('b-popover', {
    attrs: {
      "target": "ai-response-info",
      "title": "AI generated responses are enabled",
      "triggers": "click blur",
      "placement": "right"
    }
  }, [_vm._v("\n          Select an inbound message above and click \"Suggest Response\" to generate a response.\n        ")])], 1) : _vm._e()]) : _c('div', {
    staticClass: "inbox-action-items mt-1"
  }, [_c('b-button', {
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
  }), _vm._v("\n        Send\n      ")], 1), _vm._v(" "), _c('b-button', {
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
  }), _vm._v("\n        Reject\n      ")], 1), _vm._v(" "), _c('b-button', {
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
  }) : _vm._e()], 1)], 1)], 2) : _vm._e()], 1);
};
var __vue_staticRenderFns__ = [];

/* style */
const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-38d8394c_0", {
    source: ".inbox[data-v-38d8394c]{max-height:60vh;min-height:60vh;overflow-x:hidden;overflow-y:scroll;border-bottom:2px solid rgba(0,0,0,.2)}@media print{.inbox[data-v-38d8394c]{max-height:none;height:auto}}[data-v-38d8394c] .time{float:right;margin:0 3px 0;color:gray}[data-v-38d8394c] .status-icon{float:left;cursor:pointer;margin:0 3px 0}[data-v-38d8394c] .cursor-pointer{cursor:pointer}[data-v-38d8394c] .suggest-response-button{border:none;padding:8px 16px;border-radius:4px;cursor:pointer;transition:all .3s ease}[data-v-38d8394c] .suggest-response-button.selected{background:linear-gradient(135deg,#6366f1 0,#8b5cf6 25%,#d1d5db 50%,#6366f1 75%,#8b5cf6 100%);background-size:400% 400%;color:#fff}[data-v-38d8394c] .suggest-response-button.selected.loading{animation:gradientShift-data-v-38d8394c 3s ease-in-out infinite}@keyframes gradientShift-data-v-38d8394c{0%{background-position:0 50%}50%{background-position:100% 50%}100%{background-position:0 50%}}[data-v-38d8394c] .refresh-button{border:none;padding:8px 16px;border-radius:4px;cursor:pointer;transition:all .3s ease}[data-v-38d8394c] .refresh-button.selected{background:linear-gradient(135deg,#6366f1 0,#8b5cf6 25%,#d1d5db 50%,#6366f1 75%,#8b5cf6 100%);background-size:400% 400%;color:#fff}[data-v-38d8394c] .refresh-button.selected.loading{animation:gradientShift-data-v-38d8394c 3s ease-in-out infinite}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
const __vue_scope_id__ = "data-v-38d8394c";
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
