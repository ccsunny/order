// 原生js方法
// function getTime() {
//     //1：获取时间
//     var date=new Date();
//     var year = date.getFullYear();
//     var month = date.getMonth()+1;
//     var day = date.getDay()+17;
//     var time = year+"-"+month+"-"+day;
//     //把时间通过通过innerHTML写到div中
//     var div1=document.getElementById("times");
//     div1.innerHTML=time;
// }
// // //让页面每一秒执行一次 定时器(setInterval)
// setInterval("getTime();",1000);//两个参数（函数名，时间间隔(毫秒)
// jquery方法
$(function(){
    function show(){
     var mydate = new Date();
     var str = "" + mydate.getFullYear()+"-";
     str += (mydate.getMonth()+1)+"-";
     str += mydate.getDate();
     return str;
    }
    $(".times").html(show());
});