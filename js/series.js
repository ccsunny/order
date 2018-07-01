$(function(){
	var count = 0;
	var sum = 0;
	var orderData = {};
	var orderFile = [];
	//分享栏
	$(".mui-icon-settings").click(function(){
		$(".mask").css('display', 'block');
	})
	$(".mui-icon-closeempty").click(function(){
		$(".mask").css('display', 'none');
	})
	//左边栏点击
	$(".mui-col-xs-4>ol>.mui-table-view-cell").click(function(e){
		$(".mui-col-xs-4>ol>.mui-table-view-cell").each(function(){
			$(this).removeClass('current');
		});
		$(this).addClass('current');
		if($(this).html() == $(".mui-col-xs-8 .mui-table-view-cell").html()){
			$(".mui-col-xs-8").css('transform', 'translateY(200px)');
		}
	})
	swipe.iScroll({
		swipeDom:$(".mui-col-xs-4").get(0),
		swipeType:"y",
		swipeDistance: 100
	})
	//点菜
	//增加
	$(".mui-numbox-btn-plus").click(function(e){
		count++;
		$(this).css({
			border: 'none',
			borderLeft: '1px solid #B3ABAA'
		});
		$(this).parent().children().css({
			display: 'block',
		});
		$(".mui-footer").css('display', 'block');
		var price = parseInt(e.target.parentNode.previousElementSibling.textContent);
		sum += price;
		$(".mui-footer span").html("共"+ count +"份，"+sum+"元");
		var index = e.target.parentNode.children[1].value;
		var menu = e.target.parentNode.parentNode.children[0].innerHTML;

		orderData = {menu, index};
		orderFile.push(orderData);
	})
	$(".mui-footer>.mui-btn").click(function(){
			window.localStorage.setItem("orderData", orderData);
			console.log(orderFile);
		})
	//删减
	$(".mui-numbox-btn-minus").click(function(e){
		count--;
		if($(this).parent().children('input').val() === "0"){
			$(this).css('display', 'none');
			$(this).parent().children('input').css('display', 'none');
			$(this).parent().children('.mui-numbox-btn-plus').css('border', '1px solid #B3ABAA');
		}
		var price = parseInt(e.target.parentNode.previousElementSibling.textContent);
		sum -= price;
		$(".mui-footer span").html("共"+ count +"份，"+ sum +"元");
		if(count == 0){
			$(".mui-footer").css('display', 'none');
		}
		var index = e.target.parentNode.children[1].value;
		var menu = e.target.parentNode.parentNode.children[0].innerHTML;

		orderData = {menu, index};
		orderFile.push(orderData);
		$(".mui-footer>.mui-btn").click(function(){
			window.localStorage.setItem("orderData", orderData);
			console.log(orderFile);
		})
	})
	//传值
	
})