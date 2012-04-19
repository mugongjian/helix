/*
Copyright 2012, KISSY UI Library v1.30dev
MIT Licensed
build time: Apr 5 19:33
*/
KISSY.add("node/anim",function(c,j,g,e,l){function i(f,d,a){var b=[],h={};for(a=a||0;a<d;a++)b.push.apply(b,k[a]);for(a=0;a<b.length;a++)h[b[a]]=f;return h}var k=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];c.augment(e,{animate:function(){var f=c.makeArray(arguments);c.each(this,function(d){g.apply(l,[d].concat(f)).run()});return this},stop:function(f,d,a){c.each(this,function(b){g.stop(b,f,d,a)});
return this},isRunning:function(){for(var f=0;f<this.length;f++)if(g.isRunning(this[f]))return 1;return 0}});c.each({show:i("show",3),hide:i("hide",3),toggle:i("toggle",3),fadeIn:i("show",3,2),fadeOut:i("hide",3,2),fadeToggle:i("toggle",3,2),slideDown:i("show",1),slideUp:i("hide",1),slideToggle:i("toggle",1)},function(f,d){e.prototype[d]=function(a,b,h){j[d]&&!a?j[d](this):c.each(this,function(m){g(m,f,a,h||"easeOut",b).run()});return this}})},{requires:["dom","anim","./base"]});
KISSY.add("node/attach",function(c,j,g,e,l){function i(d,a,b){b.unshift(a);d=j[d].apply(j,b);if(d===l)return a;return d}var k=e.prototype,f=c.makeArray;c.each(["equals","contains","scrollTop","scrollLeft","height","width","innerHeight","innerWidth","outerHeight","outerWidth","addStyleSheet","appendTo","prependTo","insertBefore","before","after","insertAfter","test","hasClass","addClass","removeClass","replaceClass","toggleClass","removeAttr","hasAttr","hasProp","scrollIntoView","remove","empty","removeData",
"hasData","unselectable","wrap","wrapAll","replaceWith","wrapInner","unwrap"],function(d){k[d]=function(){var a=f(arguments);return i(d,this,a)}});c.each(["filter","first","last","parent","closest","next","prev","clone","siblings","contents","children"],function(d){k[d]=function(){var a=f(arguments);a.unshift(this);a=j[d].apply(j,a);a=a===l?this:a===null?null:new e(a);return a}});c.each({attr:1,text:0,css:1,style:1,val:0,prop:1,offset:0,html:0,data:1},function(d,a){k[a]=function(){var b=f(arguments);
if(b[d]===l&&!c.isObject(b[0])){b.unshift(this);b=j[a].apply(j,b)}else b=i(a,this,b);return b}});c.each(["on","detach","fire","fireHandler","delegate","undelegate"],function(d){k[d]=function(){var a=f(arguments);a.unshift(this);g[d].apply(g,a);return this}})},{requires:["dom","event","./base"]});
KISSY.add("node/base",function(c,j,g){function e(a,b,h){if(!(this instanceof e))return new e(a,b,h);if(a)if(c.isString(a)){a=j.create(a,b,h);if(a.nodeType===j.DOCUMENT_FRAGMENT_NODE){k.apply(this,f(a.childNodes));return g}}else if(c.isArray(a)||d(a)){k.apply(this,f(a));return g}else a=a;else return g;this[0]=a;this.length=1;return g}var l=Array.prototype,i=l.slice,k=l.push,f=c.makeArray,d=j._isNodeList;c.augment(e,{length:0,item:function(a){return c.isNumber(a)?a>=this.length?null:new e(this[a]):
new e(a)},add:function(a,b,h){if(c.isNumber(b)){h=b;b=g}a=e.all(a,b).getDOMNodes();b=new e(this);if(h===g)k.apply(b,a);else{h=[h,0];h.push.apply(h,a);l.splice.apply(b,h)}return b},slice:function(){return new e(i.apply(this,arguments))},getDOMNodes:function(){return i.call(this)},each:function(a,b){var h=this;c.each(h,function(m,n){m=new e(m);return a.call(b||m,m,n,h)});return h},getDOMNode:function(){return this[0]},end:function(){return this.__parent||this},all:function(a){a=this.length>0?e.all(a,
this):new e;a.__parent=this;return a},one:function(a){a=this.all(a);if(a=a.length?a.slice(0,1):null)a.__parent=this;return a}});c.mix(e,{all:function(a,b){if(c.isString(a)&&(a=c.trim(a))&&a.length>=3&&c.startsWith(a,"<")&&c.endsWith(a,">")){if(b){if(b.getDOMNode)b=b.getDOMNode();if(b.ownerDocument)b=b.ownerDocument}return new e(a,g,b)}return new e(j.query(a,b))},one:function(a,b){var h=e.all(a,b);return h.length?h.slice(0,1):null}});c.mix(e,j._NODE_TYPE);return e},{requires:["dom"]});
KISSY.add("node",function(c,j,g){g.KeyCodes=j.KeyCodes;c.mix(c,{Node:g,NodeList:g,one:g.one,all:g.all});return g},{requires:["event","node/base","node/attach","node/override","node/anim"]});
KISSY.add("node/override",function(c,j,g,e){var l=e.prototype;c.each(["append","prepend","before","after"],function(i){l[i]=function(k){k=k;if(c.isString(k))k=j.create(k);k&&j[i](k,this);return this}});c.each(["wrap","wrapAll","replaceWith","wrapInner"],function(i){var k=l[i];l[i]=function(f){if(c.isString(f))f=e.all(f,this[0].ownerDocument);return k.call(this,f)}})},{requires:["dom","event","./base","./attach"]});