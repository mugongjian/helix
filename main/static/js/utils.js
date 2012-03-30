function queue(array){
		var i; 
		for(i=0; i<array.length-1; i++) {
			array[i].todo = array[i+1];
		}
		return array[0];
}
function pipe(array) {
		return function(arg){
			var i;
			var result =arguments;
			for(i=0; i<array.length; i++){
				result = array[i].apply(null,result);
				if(result === false){
					return ;
				}
				result = [result];
			}
			return result[0];
		};

}

function makeTreeFromList(list) {
		var childMap = {};
		var i,p;
		var resParent,resParentId;
		var child,brother;
		var viewNode = {};
		var resId,res;
		var resViewNode,resParentViewNode;
		var childOfParent;
		for(i=0; i<list.length; i++){
			res = list[i];
			viewNode[res.RES_ID] = {ref:res};
		}
		var usedResId = {};
	/*  sorted list by level */
		for (i=0; i<list.length ;i++) {
				res = list[i];
				resId= res.RES_ID;
				var resname = res.RES_NAME;
				resParentViewNode = viewNode[res.RES_PARENT];
				resViewNode = viewNode[resId];
				if(resParentViewNode && resViewNode) {
					resParentViewNode.child = resParentViewNode.child || [];
					childOfParent = resParentViewNode.child  ;
					childOfParent.push(resViewNode);
					usedResId[resId] = true;
				}
		}
		var unUsedResId=[];
		for(p in viewNode) {
			if(	! usedResId[p] ){
				unUsedResId.push(p);
			}
		}
		return ( viewNode[unUsedResId[0]] );
}
