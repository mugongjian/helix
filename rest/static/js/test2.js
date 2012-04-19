KISSY.ready (function(S) {

    var API = 'http://api.flickr.com/services/rest/?';
    var params = {
	'method':'flickr.favorites.getPublicList',
	'api_key':'5d93c2e473e39e9307e86d4a01381266',
	'user_id':'26211501@N07',
	'per_page':10,
	'format':'json',
	'jsoncallback':'getFavorites'
    };
    var photoList = S.one('#photo-list');
    S.one('#fetch-btn').on('click',function(){
	S.one(this).attr('disabled',true);
	photoList.addClass('loading');
	S.getScript(API + S.param(params));

    });
    /* 图像数据回调*/
    window.getFavorites = function(data){
	var html = 'fetch photo failed,please try again';
	loading = true;
	if (data.stat = 'ok') {
	    html = '';
	    S.each(data.photos.photo,function(item,i){
		html += '<img src="http://farm'+item.farm+
		    '.static.flickr.com/'+item.server+'/'+item.id
		    +'_'+item.secret+'_t.jpg" />';
	    });
	    photoList.removeClass('loading');
	    photoList.hide().html(html).fadeIn(3);
	}
    }
});

