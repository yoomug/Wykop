console.log('ASHER_LOADED');

if(typeof(ASHER) == "object"){
	ASHER.remove();
}

var ASHER =(function(){
var config = {
	
	elemClassName: "asher-wz",
	dug:"wykopał",
	buried:"zakopał",
	dugAjax: "http://www.wykop.pl/ajax/link/dug/",
	buriedAjax: "http://www.wykop.pl/ajax/link/buried/"
	
};	
var wid = $('article').eq(0).attr('data-id');	
var commentsE = $('#comments-list-entry .comment');
var dug_elem = '<small class="small cac '+config.elemClassName+'">'+config.dug+'</small>';
var buried_elem = '<small class="small cac '+config.elemClassName+'">'+config.buried+'</small>';
	
//whodug
	$.ajax({
		dataType: "json",
  url: config.dugAjax+wid
}).done(function ( data ) {

var tab = $(data.html).find('li').find('.left45');
var whodug = [];
for(var i=0;i<tab.length;i++){
	whodug.push($(tab[i]).text());
}
 //---------------------------------
	
	for(var j=0;j<commentsE.length;j++){
		var current = $(commentsE[j]);
		var name = current.find('a .fbold').text();
		if($.inArray(name, whodug) !== -1){
			$(dug_elem).insertBefore(current.find('.votes'));
		}
	}   
});
//whoburied
$.ajax({
  url: config.buriedAjax+wid,
  dataType: "json"
})
.done(function ( data ) {

var tab = $(data.html).find('.hvline');
var whoburied = [];
for(var i=0;i<tab.length;i++){
	whoburied.push($(tab[i]).text());
}
 //---------------------------------
	
	for(var j=0;j<commentsE.length;j++){
		var current = $(commentsE[j]);
		var name = current.find('a .fbold').text();
		
		if($.inArray(name, whoburied) !== -1){
			$(buried_elem).insertBefore(current.find('.votes'));
		}
	}   
});


return {

remove:function(){	
	$('.'+config.elemClassName).remove();	
}
	
};
	
	
})();


