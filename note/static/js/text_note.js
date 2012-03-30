var mode = {};
mode['common'] = {
	
	savedAlert:function() {
		$('#content').addClass("saved-label");
		$('#content').one('keypress',function(e) {
			$(this).removeClass('saved-label');
		});
	},
	/*  ['#form','click',function(){},'.heavy','hover',function(){}]*/
	initEvent:function(links) {
		var i;
		for(i=0; i<links.length; i +=3) {
			$(links[i]).on(links[i+1], links[i+2] );
		}
	},
	clearEvent:function(links) {
		var i;
		for(i=0; i<links.length; i +=3) {
			$(links[i]).off( links[i+1] );
		}
	}
};
mode['add'] = {
	init:function() { 
		var links = [
			".content-form",'submit',this.submitAction
		];
		this._links = links;
		mode.common.initEvent(links);
		this.isActive = true;
	},
	valid:function() {
		var msg = ['#topic','no toic','#content','no content'];
		var i ;
		for(i=0; i<msg.length; i+=2) {
			if( !$(msg[i]).val() ){
				return msg[i+1];
			}
		}
		return true;
	},
	submitAction:function(e) {
		console.log(e);
		var i; 
		var data = {};
		var valid = mode.add.valid();
		if ( valid !== true) {
			alert(valid);
			return false;
		}
		var dataArray = $(this).serializeArray();
		for( i=0; i<dataArray.length; i++) {
			data[ dataArray[i].name ] = dataArray[i].value;
		}
		delete data.id;
		$.ajax ( {
			url:this.action,
			type:this.method,
			data:data,
			success:mode['add'].onAddSuccess
		});
		return false;
	},
	onAddSuccess:function(msg) {
		try{
			msg = $.parseJSON(msg)
		} catch (e) {
			alert('wrong')
			return false;
		}
		console.log(this);
		mode['common'].savedAlert();
		$('#id').val(msg.id);
		mode['add'].clear();
		mode['update'].init();
	},
	clear:function(){
		mode.common.clearEvent(this._links);
		this.isActive = false;
	}
};
mode['update'] = {
	init:function() {
		var links = [
			'.content-form','submit',this.submitAction,
			'.content-form','change',function(){mode['update']._changed  = true;}
		];
		mode.common.initEvent(links);
		this._links = links;
		this.isActive = true;
	},
	valid:function() {
		return mode.update['_changed'] ===true;
	},
	submitAction:function(e) {
		console.log(e);
		var i,data = {};
		if ( mode.update.valid() === false) {
			alert('no need saved');
			return false;
		}
		var dataArray = $(this).serializeArray();
		for( i=0; i<dataArray.length; i++) {
			data[ dataArray[i].name ] = dataArray[i].value;
		}
		$.ajax ( {
			url:this.action,
			type:this.method,
			data:data,
			success:mode['update'].onUpdateOk
		});
		return false;
	},
	onUpdateOk:function(msg){
		console.log(this);
		if (msg == "{}") {
			mode['common'].savedAlert();
		}
		mode.update._changed = false;
	},
	clear:function() {
		mode.common.clearEvent(this._links);
		this.isActive = false;
	}
};
	
$(function() {
	mode[ $('#id').val() ? 'update':'add' ].init();
});

/* 初始化 label*/
$(function(){
function topicLabel(topicId){
	var topic = $("#"+topicId).hide(500)[0].value;
	var topics = $('.topics').eq(0).show(500);
	topic = topic.split(",");
	topic.push("编辑？");
	var colors=['span0','span1','span2','span3','span4'];
	var topicPiece='<span class="${sp}">${t}</span>';
	var i;
	var str = '';
	for( i=0; i<topic.length; i++) {
		str +=( topicPiece
				.replace(/\$\{t\}/g,topic[i])
				.replace(/\$\{sp\}/g,colors[i% (colors.length)] )
			  );
	}
	$('.topics').html(str);
}
	$('#topic').keypress(function(e){
		if(e.keyCode === 13){
			topicLabel(this.id);
			return false;
		};
	});
	topicLabel('topic');
	$('.topics>span:last-child').live("click",function() {
		/* hide color topic ,show real field */
		$('.topics').hide();
		$('#topic').show();
	});

});