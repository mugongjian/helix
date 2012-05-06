/*
 微笔记接口定义
*/
window.micro = function(conf) {
	var renderMicro = function(data) {
		var i;
		var rainbow =conf["rainbowCls"] ;
		var root = $( conf["root"] );
		var form = $( conf["form"] );
		for(i=0; i<data.length; i++) {
			if( rainbow ) {
				data[i][3]  = rainbow[i%7];
			}
		}
		root.html(
			tpls.render2html(conf["micro-item-tpl"],data)
		);
	};
	return {
		conf:["root","form","rainbowCls","url-a","url-q"],
		add:function() {
			var micro = this;
			var form = $(conf["form"]);
			var data = form.serializeArray();
			var i;
			var formData = {};
			for(i=0; i<data.length; i++) {
				if( ! data[i].value ) {
					return data[i].name+'不能为空';
				}
				formData[ data[i].name ] = data[i].value;
				
			}
			
			$.ajax( {
				url:conf["url-a"],
				type:form[0].method,
				data:formData,
				success:function(data) {
					if(data == "{}") {
						micro.query();
					}
				}
			});
		},
		query:function() {
			$.ajax({
				url:conf["url-q"],
				success:function(data,a,b){
					renderMicro(data);
				}
			});
		}
	}
};
/* 笔记接口定义*/
window.note = function(conf) {
	var lineBackground =function(data) {
		var i;
		var classkey = 2;
		var className= conf["className"];
		for( i=0; i<data.length; i++) {
			data[i][classkey]=  className[i%2];
		}
		return data;
	};
	return {
		query:function(data){
			var listRoot = $(conf["list-root"]);
			if (data ) {
				data = lineBackground(data);
				listRoot.html(
					tpls.render2html( conf["tpl"] ,data)
				);
				return;
			}
			$.ajax({
				url:conf["url-q"],
				success:function(data) {
					data = lineBackground(data);
					listRoot.html(
						tpls.render2html( conf["tpl"] ,data)
					);
				}
			});
			
		}
	}
};
$(function(){
	/* 初始化接口和页面相关的设置 */
	topicSearch({
		"label-root":("#note-has-topic .note-area-head-label"),
		"query-label-tpl":("#query-label-tpl"),
		"query-root":("#note-has-topic ul"),
		"note-item-tpl":("#note-item-tpl"),
		"dataProcessor":function(data){
			var i;
			var classkey = 2;
			var className= this["className"];
			for( i=0; i<data.length; i++) {
				data[i][classkey]=  className[i%2];
			}
			return data;
		},
		"className":["gridLine1","gridLine2"]
	});
	micro = micro({
		"url-q":"/note-micro/q/",
		"url-a":"/note-micro/a/",
		"form": ('.microNote-form>form'),
		"root":('.microNote>ul'),
		"micro-item-tpl":"#micro-item-tpl",
		"rainbowCls":["rainbow-red","rainbow-orange","rainbow-yellow","rainbow-green","rainbow-blue","rainbow-indigo","rainbow-puple"]
	});
	note = note({
		"url-q":"/note/json/",
		"list-root":("#late-10-note>ul"),
		"tpl":("#note-item-tpl"),
		"className":["gridLine1","gridLine2"]
	});
	$('.microNote-label-addIcon').click(function(){
		var p = $(this).position();
		$('.microNote-form').css({
			display:'relitave',
			left:"10px",
			top: "10px"
		}).show();
		$('.microNote ul').addClass('hidden');
		return false;
	});
	/* 微笔记 事件注册*/
	$('.microNote-form>form').submit(function(){
		var msg = micro.add()
		if( msg ) {
			alert(msg);
			return false;
		}
		$(this).parent().hide();
		$('.microNote ul').removeClass('hidden');
		return false;
	});
	$('.microNote-form-closeIcon span').click(function() {
		$('.microNote-form').hide();
		$('.microNote ul').removeClass('hidden');
	});
	micro.query();
});

