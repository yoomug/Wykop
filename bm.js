// JavaScript Document




var ASHER =(function(){
  

	
var wid = $('article').eq(0).attr('data-id');
	
var commentsE = $('#comments-list-entry .comment');
	var wykop_elem = '<small class="small cac"> wykopał </small>';
	var zakop_elem = '<small class="small cac"> zakopał </small>';
	
	
	
	//wykopali
	$.ajax({
  url: "http://www.wykop.pl/ajax/link/dug/"+wid
}).done(function ( data ) {

var tab = $(data.html).find('li').find('.left45');
var wykopali = [];
for(var i=0;i<tab.length;i++){
	wykopali.push($(tab[i]).text());
	console.log($(tab[i]).text());
}
console.log('wykopali: '+wykopali.length);
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
  url: "http://www.wykop.pl/ajax/link/buried/"+wid
}).done(function ( data ) {

var tab = $(data.html).find('.hvline');
var zakopali = [];
for(var i=0;i<tab.length;i++){
	zakopali.push($(tab[i]).text());
}
console.log('zakopali: '+zakopali.length);
 //---------------------------------
	
	for(var j=0;j<commentsE.length;j++){
		var current = $(commentsE[j]);
		var name = current.find('a .fbold').text();
		
		if($.inArray(name, zakopali) !== -1){
			$(zakop_elem).insertBefore(current.find('.votes'));
		}
	}   
});



	
	
})();


