(function(href){
	if( !(document && document.createElement) ) {
		return;
	}
	var link =document.createElement('link');
	link.href=href;
	link.rel="stylesheet";
	link.type="text/css";
	document.getElementsByTagName('head')[0].appendChild(link);
})('/static/css/htmlTpl.css');

var HtmlTpl = {
	is:[
		'<div class="is"><span class="topic">${topic}</span> ${text}</div>',
		[]
	],
	not:[
		'<div class="not"><span class="topic">${topic}</span>${text}</div>'
		,[]
	],
	diff:[
		'<div class="diff"><div class="diff-item">${text}</div></div>'
		,[]
	],
	base:[
		'<div class="base"><span class="topic">${topic}</span>${text}</div>'
		,[]
	],
	topic:[
		'<div class="topic">${text}</div>'
		,[]
	],
	comfrom:[
		'<div class="comfrom">来自--><img src="${text}"></img></div>',
		[]
	]
};

