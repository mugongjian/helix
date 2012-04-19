window.topicSearch = function(conf) {
	var defaultRender=function( data ) {
		$(conf["label-root"]).text(
			tpls.render2html( conf["query-label-tpl"],[[data.length]] )
		);
		if( conf["dataProcessor"]) {
			data = conf["dataProcessor"](data);
		}
		$(conf["query-root"]).html (
			tpls.render2html( conf["note-item-tpl"],data )
		);
	};
	var render = conf["render"] || defaultRender;
	$('#searchForm').on('submit',function() {
		$.ajax(	{
			url:this.action+"?"+$(this).serialize(),
			type:this.method,
			success:render
		});
		return false;
	});
}