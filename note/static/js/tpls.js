/*
 前台模板
*/
window.tpls = function(conf) {
	var tepmlateMap = {};
	var wrapTpl=function(tpl) {
		var tplStr = $(tpl).html().trim();
		/* firefox href="str"  ,str will be auto encoded*/
		if( $.browser.mozilla && 
		   (
			   $.browser.version=="10.0.1" 	|| 
				   $.browser.version=="11.0a2" )
		  ) {
			tplStr = decodeURI(tplStr);
		}
		var keyList = tplStr.match(/\{\w+\}/g);
		var uniqeKeyList = [];
		var i ,p;
		var keys = {};
		var keyCorePart;
		for(i=0; i<keyList.length; i++) {
			/* {id} -> id*/
			keyCorePart = keyList[i].slice(1,-1);
			if ( !keys[keyCorePart]) {
				keys[ keyCorePart ] = new RegExp("\\{"+keyCorePart+"\\}","g");
			}
			
		}

		return {
			str:tplStr,
			keys:keys
		};
	}
	return {
		render2html:function(tpl,data) {
			var tpl = tepmlateMap[tpl] || ( tepmlateMap[tpl]= wrapTpl(tpl) );
			var p,i;
			var html = "" , str;
			for( i = 0; i<data.length; i++) {
				str = tpl.str;
				for( p in tpl.keys) {
					str  = str.replace(tpl.keys[p],data[i][p]);
				}

				html += str;
			}
			return html;
		}
	}
}();