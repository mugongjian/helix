/*
Copyright 2012, KISSY UI Library v1.30dev
MIT Licensed
build time: Mar 23 12:19
*/
KISSY.add("datalazyload",function(e,f,l,n){function j(a,b){if(!(this instanceof j))return new j(a,b);if(b===n){b=a;a=[o]}e.isArray(a)||(a=[f.get(a)||o]);this.containers=a;this.config=e.merge(q,b);this.callbacks={els:[],fns:[]};this._init();return n}function p(a,b){var c=e.indexOf(a,b);c!=-1&&b.splice(c,1);return c}var k=e.Env.host,o=k.document,q={mod:"manual",diff:"default",placeholder:"none",execScript:true};e.augment(j,{_init:function(){this.threshold=this._getThreshold();this._filterItems();this._initLoadEvent()},
_filterItems:function(){var a=this.containers,b,c,d,h=[],g=[];b=0;for(c=a.length;b<c;++b){d=f.query("img",a[b]);h=h.concat(e.filter(d,this._filterImg,this));d=f.query("textarea",a[b]);g=g.concat(e.filter(d,this._filterArea,this))}this.images=h;this.areaes=g},_filterImg:function(a){var b=a.getAttribute("data-ks-lazyload"),c=this.threshold,d=this.config.placeholder;if(this.config.mod==="manual"){if(b){if(d!=="none")a.src=d;return true}}else if(f.offset(a).top>c&&!b){f.attr(a,"data-ks-lazyload",a.src);
if(d!=="none")a.src=d;else a.removeAttribute("src");return true}},_filterArea:function(a){return f.hasClass(a,"ks-datalazyload")},_initLoadEvent:function(){var a=this,b,c=function(){a._loadItems();if(a._getItemsLength()===0){l.remove(k,"scroll",d);l.remove(k,"resize",b)}},d=e.buffer(c,100,this);l.on(k,"scroll",d);l.on(k,"resize",b=function(){a.threshold=a._getThreshold();d()});a._getItemsLength()&&e.ready(c)},_loadItems:function(){this._loadImgs();this._loadAreas();this._fireCallbacks()},_loadImgs:function(){this.images=
e.filter(this.images,this._loadImg,this)},_loadImg:function(a){if(this.checkElemInViewport(a))this._loadImgSrc(a);else return true},_loadImgSrc:function(a,b){b=b||"data-ks-lazyload";var c=a.getAttribute(b);if(c&&a.src!=c){a.src=c;a.removeAttribute(b)}},_loadAreas:function(){this.areaes=e.filter(this.areaes,this._loadArea,this)},_loadArea:function(a){if(this.checkElemInViewport(a))this._loadAreaData(a.parentNode,a,this.config.execScript);else return true},_loadAreaData:function(a,b,c){b.style.display=
"none";b.className="";a=f.create("<div>");b.parentNode.insertBefore(a,b);f.html(a,b.value,c===n?true:c)},_fireCallbacks:function(){var a=this.callbacks,b=a.els,c=a.fns,d,h,g,i=[],m=[];for(d=0;(h=b[d])&&(g=c[d++]);)if(this.checkElemInViewport(h))g.call(h);else{i.push(h);m.push(g)}a.els=i;a.fns=m},addCallback:function(a,b){var c=this.callbacks;if((a=f.get(a))&&e.isFunction(b)){c.els.push(a);c.fns.push(b)}this._fireCallbacks()},removeElements:function(a){if(e.isArray(a))e.each(a,function(m){this.removeElements(m)});
else{for(var b=this.callbacks,c=b.fns,d=b.els,h=[],g=[],i=0;i<d.length;i++)if(d[i]!=a){h.push(d[i]);g.push(c[i])}b.els=h;b.fns=g;p(a,this.images);p(a,this.areaes)}},destroy:function(){this.callbacks.els=[];this.callbacks.fns=[];this.images=[];this.areaes=[]},_getThreshold:function(){var a=this.config.diff,b=f.viewportHeight();return a==="default"?2*b:b+ +a},_getItemsLength:function(){return this.images.length+this.areaes.length+this.callbacks.els.length},loadCustomLazyData:function(a,b,c){var d=this,
h;if(b==="img-src")b="img";e.isArray(a)||(a=[f.get(a)]);e.each(a,function(g){switch(b){case "img":h=g.nodeName==="IMG"?[g]:f.query("img",g);e.each(h,function(i){d._loadImgSrc(i,c||"data-ks-lazyload-custom")});break;default:f.query("textarea",g).each(function(i){if(f.hasClass(i,c||"ks-datalazyload-custom"))d._loadAreaData(g,i)})}})},checkElemInViewport:function(a){var b=f.css(a,"display")==="none",c=f.scrollTop();a=f.offset(b?a.parentNode:a).top;return a<this.threshold+c&&a>c}});e.mix(j,j.prototype,
true,["loadCustomLazyData","_loadImgSrc","_loadAreaData"]);return j},{requires:["dom","event"]});