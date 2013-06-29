console.log('ASHER_LOADED');

if(typeof(ASHER) == "object"){
	ASHER.remove();
}

var ASHER =(function(){
	
var config = {
	
	elemClassName: "asher-wz",
	dug:"wykopal",
	buried:"zakopal",
	dugAjax: "http://www.wykop.pl/ajax/link/dug/",
	buriedAjax: "http://www.wykop.pl/ajax/link/buried/"
	
};
	
var wid = $('article').eq(0).attr('data-id');
	
var commentsE = $('#comments-list-entry .comment');


	var wykop_elem = '<small class="small cac '+config.elemClassName+'"> '+config.dug+' </small>';
	var zakop_elem = '<small class="small cac '+config.elemClassName+'"> '+config.buried+' </small>';
	
	
	
	//wykopali
	$.ajax({
  url: config.dugAjax+wid
}).done(function ( data ) {

var tab = $(data.html).find('li').find('.left45');
var wykopali = [];
for(var i=0;i<tab.length;i++){
	wykopali.push($(tab[i]).text());
}
 //---------------------------------
	
	for(var j=0;j<commentsE.length;j++){
		var current = $(commentsE[j]);
		var name = current.find('a .fbold').text();

		if($.inArray(name, wykopali) !== -1){
			$(wykop_elem).insertBefore(current.find('.votes'));
		}
	}   
});
//zakopali
	$.ajax({
  url: config.buriedAjax+wid
}).done(function ( data ) {

var tab = $(data.html).find('.hvline');
var zakopali = [];
for(var i=0;i<tab.length;i++){
	zakopali.push($(tab[i]).text());
}
 //---------------------------------
	
	for(var j=0;j<commentsE.length;j++){
		var current = $(commentsE[j]);
		var name = current.find('a .fbold').text();
		
		if($.inArray(name, zakopali) !== -1){
			$(zakop_elem).insertBefore(current.find('.votes'));
		}
	}   
});


return {

remove:function(){	
	$('.'+config.elemClassName).remove();	
}
	
};
	
	
})();


