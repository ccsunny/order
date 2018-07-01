window.onload=function(){
	   window.onresize=function(){
	   	  location.reload();
	   	// 获取html标签；
		var html=document.getElementsByTagName('html')[0];
		//640px  显示100*100    320px  200*200  
		//当前屏幕宽度；
		var width=window.innerWidth;
		var fontSize=100/720*width;
		html.style.fontSize=fontSize+"px";
	   }
}


$(function() {
	  //rem适配
//	$(window).resize(function(){
//	var width = window.innerWidth;
//	if(width<=720&&width>=320){
//		$("html").css({"fontSize":100*width/720 + "px"});
//	}else if(width>720){
//		$("html").css({"fontSize":100*720/720 + "px"});
//	}else if(width<320){
//		$("html").css({"fontSize":100*320/720 + "px"});
//	}	
//   }).trigger("resize");


      //var  name=document.getElementsByClassName('name')[0];
		//表单验证
		checkRegExp($('.name'),/^[\u4e00-\u9fa5]{2,5}$/);
		
		checkRegExp($('.tel'),/^(13[0-9]|14[57]|15[0-9]|17[1456789]|18[0-9])\d{8}$/);


	$('.btnSave').click(function() {
		//localstorage存储数据；
		//先获取用户输入的数据；

		localStorage.setItem('select', str);
		localStorage.setItem('mess', $('.search').val())

		alert("保存成功");
		location.reload();
	});
    
    
    	/*口味选择*/
	var arr = [];
	var str = null;
	$('.order_select ul li').eq(0).addClass('active');
	$('.order_select ul li').click(function() {
		$(this).toggleClass("active");
		if($(this).hasClass('active')) {
			var sel = $(this).text();
			arr.push(sel);
			str = arr.join();
		}
	});
	
	//口味选择页面   读取订单信息；
	  readerOrderInfo();
     
     
	//留言板
	setMess();
	
    //立即下单   点击按钮  跳转到目标页面；
   ToNewLocation();

	//点击提交按钮  页面跳转到订单支付页面
	$('.sure').on('click', function() {
		//客户端校验；
		isCheckEmpty();
		
	})

	//增加或减少商品数量
	addOrRemveNum();

	//计算下单的总金额；
	compuTotalMoney();

	//订单确认页面  条件选择；
	$('.order_disc_left a').click(function() {
		$(this).toggleClass('active');
	});

});

//表单验证；
  function checkRegExp(obj, regExp) {
            obj.blur(function () {
                if (regExp.test($(this).val().trim())) {
                    $(this).next().text("正确");
                    $(this).next().removeClass('wrong').addClass('right');
                } else {
                      $(this).next().text("错误");
                   
                     $(this).next().removeClass('right').addClass('wrong');
                }
            });

        }

//留言板设置；
function  setMess(){
	setInterval(function() {
		$('.search').change();
	}, 500);

	$('.search').change(function() {
		//获取用户输入的数据；
		var content = $(this).val().trim();
		if(content.length > 10) {
			alert("对不起，您输入的字数已超！！！");
			$(this).val($(this).val().substring(0, 10));
			$('.order_mes p>span').eq(0).text(10);
		} else if(content.length == 0) {
			$('.order_mes p>span').eq(0).text(0);
		} else {
			//		 	alert("请继续……");
			$('.order_mes p>span').eq(0).text(content.length).css({
				'color': 'red',
				'fontSize': '20px',
				'fontStyle': 'Italic'
			});
		}
	});
}
//立即下单   点击按钮  跳转到目标页面；
function ToNewLocation(){
	var num = 3;
	var timeId = null;
	$('.go').on('click', function() {

		mui.confirm('请您确认下单信息？', function(e) {
			if(e.index == 1) {

				timerId = setInterval(function() {
					num--;
					if(num <= 0) {
						clearInterval(timerId);
						location.href = "series.html";
					} else {
						$('.info').text("恭喜你，页面将在" + num + "秒后自动跳转");
					}
				}, 1000);

			} else {
				$('.info').text("订单已取消！！！");
			}
		})

	});
	
}
//判断文本框是否为空
function isCheckEmpty() {
	var name = $('.name').val().trim();
	if(!name) {
		alert("姓名不能为空！");
		$('.name').focus();
		return false;
	}
	var address = $('.address').val().trim();
	if(!address) {
		alert("地址不能为空！");
		$('.address').focus();
		return false;
	}
	return true;


}
//增加或减少商品数量
function addOrRemveNum() {
	$('.order_menu .add').click(function() {
		var num = parseInt($(this).siblings('.num').val()); //注意获取文本框的值是字符串形式
		num++;
		$(this).siblings('.num').val(num);
		if(num > 10) {
			alert("对不起，您输入的数量已超过最大数量");
			$(this).siblings('.num').val('1');
		}

	});

	$('.order_menu .remove').click(function() {
		var num = parseInt($(this).siblings('.num').val()); //注意获取文本框的值是字符串形式
		num--;
		$(this).siblings('.num').val(num);
		if(num < 0) {
			alert("对不起，您输入的数量已超过最小数量");
			$(this).siblings('.num').val('1');
		}

	});

	$('.numBox .num').keyup(function() {
		if($(this).val() > 10 || $(this).val() < 0) {
			alert("对不起，您输入的数量不正确，请重新输入……");
		}
	});

}
//根据下单数量计算订单总金额
function compuTotalMoney() {

	$('.order_menu .add').click(function() {

		$('.numBox .num').change();
	});
	
	$('.order_menu .remove').click(function() {

		$('.numBox .num').change();
	});

	$('.numBox .num').change(function() {
		var num = 0;
		var price = 0;
		var arr1 = []; //定义一个空数组用来存储数字数据；
		$('.numBox .num').each(function(index, ele) {
			arr1.push(parseInt($(this).val()));
		});

		var arr2 = [];
		$('.mui-media-body .price').each(function(index, obj) {
			arr2.push(parseInt($(this).text()));
		});

		var totalMoney = arr1[0] * arr2[0] + arr1[1] * arr2[1] + arr1[2] * arr2[2];
		$('.countMoney span').eq(0).text(arr1[0] + arr1[1] + arr1[2]);
		var v1 = $('.countMoney span').eq(1).text();
		$('.countMoney span').eq(2).html("<del>" + totalMoney + "</del>");
		var v2 = $('.countMoney span').eq(2).text();
		$('.countMoney span').eq(3).text(v2 - v1);
		
		//存储订单数量   订单金额  原价   折扣价
		localStorage.setItem('num',$('.countMoney span').eq(0).text());
		
		localStorage.setItem('orderMoney',v1);
		localStorage.setItem('price',v2);
		
		localStorage.setItem('discount',$('.countMoney span').eq(3).text());
        
        
	});

}
//口味选择页面   读取订单信息；
function  readerOrderInfo(){
	 var num= localStorage.getItem('num');//订单数量
     var orderMoney= localStorage.getItem('orderMoney');//订单金额
     var price= localStorage.getItem('price');//原价
     var discount= localStorage.getItem('discount');//折扣价
     
     $('.cMoney span').eq(0).text(num);
        $('.cMoney span').eq(1).text(orderMoney);
           $('.cMoney span').eq(2).html("<del>"+price+"</del>");
              $('.cMoney span').eq(3).text(discount);
              
}
