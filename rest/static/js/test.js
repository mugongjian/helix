KISSY.ready( function(S){
    var DOM = S.DOM,Event = S.Event;
    btn = DOM.get('#demo-btn');
    
    Event.on(btn,'click', 
	     function() {
		 DOM.attr(btn,'disabled',true);
		 var f = function(){
		     S.Anim('#demo-txt',
			    'left:0;opacity:1;fontSize:28px',2,'bounceOut')
			 .run();
		 };

		 S.Anim('#demo-img',
			'left:400px;opacity:0',2,'easeOut',
			f ).run();
		 
});

});