

$(window).resize(function(){
	var width = window.innerWidth;
	if(width<=720&&width>=320){
		$("html").css({"fontSize":100*width/720 + "px"});
	}else if(width>720){
		$("html").css({"fontSize":100*720/720 + "px"});
	}else if(width<320){
		$("html").css({"fontSize":100*320/720 + "px"});
	}
	
}).trigger("resize");