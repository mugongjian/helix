
window.onload = function(){
	var aes = document.getElementsByTagName('a');
	for(var i=0; i<aes.length; i++) {
		aes[i].onclick = function(){
			showPic(this);
			return false;
		}
	}
	var img = document.createElement('img');
	img.setAttribute('id','placeholder');
	var desc = document.createElement('p');
	desc.setAttribute('id','img-description');
	var tip = document.createTextNode('choose one image');
	desc.appendChild(tip);
	var mod = document.getElementsByClassName('mod')
	var end = mod[0];
	
	document.body.insertBefore(img,end);
	document.body.insertBefore(desc,end);
	console.log(end.nodeName);

};
function showPic(a){
	var img  = document.getElementById('placeholder');
	var desc = document.getElementById('img-description');
    img.setAttribute('src',a.getAttribute('href'));
	desc.firstChild.nodeValue=a.getAttribute('title');
	
}
