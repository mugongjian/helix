/*
Copyright 2012, KISSY UI Library v1.30dev
MIT Licensed
build time: Apr 11 18:41
*/
KISSY.add("input-selection",function(h,e){function p(a){var b=j;b||(b=e.create(q));a.type=="textarea"?e.css(b,"width",e.css(a,"width")):e.css(b,"width",9999);h.each(r,function(d){e.css(b,d,e.css(a,d))});if(!j){var c=a.ownerDocument.body;c.insertBefore(b,c.firstChild)}return j=b}var k=e._propHooks;if(typeof h.Env.host.document.createElement("input").selectionEnd!="number"){k.selectionStart={set:function(a,b){var c=a.ownerDocument.selection.createRange();if(l(a).inRange(c)){var d=i(a,1)[1],f=m(a,b,
d);c.collapse(false);c.moveStart("character",-f);b>d&&c.collapse(true);c.select()}},get:function(a){return i(a)[0]}};k.selectionEnd={set:function(a,b){var c=a.ownerDocument.selection.createRange();if(l(a).inRange(c)){var d=i(a)[0],f=m(a,d,b);c.collapse(true);c.moveEnd("character",f);d>b&&c.collapse(false);c.select()}},get:function(a){return i(a,1)[1]}};var i=function(a,b){var c=0,d=0,f=a.ownerDocument.selection.createRange(),g=l(a);if(g.inRange(f)){g.setEndPoint("EndToStart",f);c=n(a,g).length;if(b)d=
c+n(a,f).length}return[c,d]},l=function(a){if(a.type=="textarea"){var b=a.document.body.createTextRange();b.moveToElementText(a);return b}else return a.createTextRange()},m=function(a,b,c){var d=Math.min(b,c),f=Math.max(b,c);if(d==f)return 0;if(a.type=="textarea"){a=a.value.substring(d,f).replace(/\r\n/g,"\n").length;if(b>c)a=-a;return a}else return c-b},n=function(a,b){if(a.type=="textarea"){var c=b.text,d=b.duplicate();if(d.compareEndPoints("StartToEnd",d)==0)return c;d.moveEnd("character",-1);
if(d.text==c)c+="\r\n";return c}else return b.text}}var q="<div style='z-index:-9999;overflow:hidden;position: fixed;left:-9999px;top:-9999px;opacity:0;white-space:pre-wrap;word-wrap:break-word;'></div>",j,r=["paddingLeft","paddingTop","paddingBottom","paddingRight","marginLeft","marginTop","marginBottom","marginRight","borderLeftStyle","borderTopStyle","borderBottomStyle","borderRightStyle","borderLeftWidth","borderTopWidth","borderBottomWidth","borderRightWidth","line-height","outline","height",
"fontFamily","fontSize","fontWeight","fontVariant","fontStyle"],o=true;h.ready(function(){var a=document,b=e.create("<input>");e.css(b,{width:1,position:"absolute",left:-9999,top:-9999});b.value="123456789";a.body.appendChild(b);b.focus();o=!!(b.scrollLeft>0);e.remove(b)});k.KsCursorOffset={get:function(a){var b=a.ownerDocument,c=a.scrollTop,d=a.scrollLeft;if(b.selection){b=b.selection.createRange();return{left:b.boundingLeft+d+e.scrollLeft(),top:b.boundingTop+c+b.boundingHeight+e.scrollTop()}}var f=
e.offset(a);if(!o&&a.type!="textarea"){f.top+=a.offsetHeight;return f}var g=p(a);b=a.selectionStart;g.innerHTML=h.escapeHTML(a.value.substring(0,b-1))+"<span>x</span>";a=f;e.offset(g,a);g=g.lastChild;a=e.offset(g);a.top+=e.height(g);if(b>0)a.left+=e.width(g);a.top-=c;a.left-=d;return a}}},{requires:["dom"]});
