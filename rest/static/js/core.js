/* sandbox  is guard and tools fro module 
   module consistent of html + css + js
   module's job is to create meaningful use experi
 web app is created as a result of all parts doint their job

*/
var SandBox = function (manager){
	
};
SandBox.prototype = {
	ajax:$.ajax
}
Core = function(){
	var moduleData = {};
	return {
		register:function(id,creator){
			moduleData[id] = {
				creator:creator,
				instance:null
			};
		},
		start:function(moduleId) {
			var moduleInstance = moduleData[moduleId].creator(
				new SandBox(this));
			moduleInstance.init();
			moduleData[moduleId].instance = moduleInstance;
		},
		stop:function(moduleId) {
			var data = moduleData[moduleId];
			if (data.instance) {
				data.instance.destroy();
				data.instance  = null;
			}
		},
		startAll:function(){},
		stopAll:function(){}
		
		
	};


};
/*
add console log for error 
*/