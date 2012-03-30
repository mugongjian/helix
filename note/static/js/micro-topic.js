$(function(){
	return ;
	var c =window.c= $("#micro-list")[0].getContext("2d");
/*
	c.fillStyle = "#000000";
	c.beginPath();
	c.moveTo(0,0);
	c.lineTo(0,300);
	c.lineTo(600,300);
	c.lineTo(600,0);
	c.closePath();
	c.fill();
	
	c.moveTo(0,280);
	c.lineTo(600,280);
	c.moveTo(0,250);
	c.lineTo(600,250);
	c.strokeStyle = "#0F0";
	c.lineWidth = 1;
	c.stroke();

	c.fillStyle = "#AA0000";
	c.fillRect(0,0,150,75);

	c.strokeStyle="rgba(0,255,0,0.5)";
	c.lineWidth = 1;
	var l = [[1,2],[10,20],[35,67],[88,100],[200,50],[178,56]];
	c.fillStyle = "#00AA00";
	//c.beginPath();
	for(var i =0; i<l.length; i++) {
		c.moveTo(l[i][0]+2,l[i][1]);
		c.arc(l[i][0],l[i][1],2,0,Math.PI*2,true);
		c.stroke();
	}*/
	var micro  = $("#micro-list")
	var offset = micro.offset();
	$("#micro-list").bind("click",function(e){
		
		c.fillStyle = "rgba(255,255,255,0.5)";
		c.beginPath();
		var x = e.clientX - offset.left;
		var y = e.clientY - offset.top;
		console.log(e.offsetX);
		console.log(x);
		c.moveTo(x+10,y);
		c.arc(x,y,5,0,Math.PI*2,true);
		c.closePath();
		c.fill();
		
	});

	
});
var microList = function(conf){
	var c = conf["c"];
	var offset = conf["offset"];
	var WIDTH_MAX = 600;
	var HEIGHT_MAX = 300;
	c.strokeStyle = "#3c5a9a";
	c.lineWidth = 2;
	c.moveTo(0,HEIGHT_MAX-30);
	c.lineTo(WIDTH_MAX,HEIGHT_MAX-30);
	c.stroke();
	var x,y;
	for(var i = 30 ; i<WIDTH_MAX; i+=30) {
		x = i; y = HEIGHT_MAX - 30;
		c.moveTo(x+3,y);
		c.arc(x,y,3,0,Math.PI*2,false);
		c.stroke();
	}
}
$(function(){
	var c = $("#micro-list")[0].getContext("2d");
	var micro  = $("#micro-list")
	var offset = micro.offset();
	microList({
		"c":c,
		"offset":null
	});
	$("#micro-list").click( function(){
			var noti = window.webkitNotifications;
	var perm = noti.checkPermission();
	if( perm== 1) {
		noti.requestPermission();
	} else if (perm == 0) {
		onemsg = noti.createNotification('http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/0c/sw_org.gif','msg',"msg content");
		onemsg.ondisplay = function(){
			setTimeout(function(){ noti.cancel();},5000);
		}
		onemsg.show();
	}else {
		alert("no perm");
	}
	});

});