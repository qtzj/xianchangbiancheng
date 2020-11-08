<head>
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js">
  </script>
  </head>
//传回投票信息
function submit(){
  $.ajax({
    //提交数据的类型 POST GET
    type:"POST",
    //提交的网址
    url:"/vote/getVote",
    //提交的数据
    data:{"voted": [ ]},
    //返回数据的格式
    datatype: "json",
    //在请求之前调用的函数
    beforeSend:function(){$("#msg").html("logining");},
    //成功返回之后调用的函数
    success:function(data){
      $("#msg").html(decodeURI(data));
    }   ,
    //调用执行后调用的函数
    complete: function(XMLHttpRequest, textStatus){
      alert(XMLHttpRequest.responseText);
      alert(textStatus);
      //HideLoading();
    };
  });

}
