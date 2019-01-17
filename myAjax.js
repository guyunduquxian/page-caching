/*
    浏览器的同源策略
        同源： 指域名，端口，协议相同
            不同的客户端脚本（js、AS），在没有明确授权的情况下，不能读取对方的资源
        同源策略：保护用户的策略
        
        ajax只能访问同源接口

        解决同源方式：跨越操作


    ajax 的核心
        open("method", "url", true);
            method:  通过什么方式访问
            url:     访问服务器地址
            async:   是否异步 true false
        send(content);  向服务器发送请求
        
        常用属性
          向服务器请求状态的阶段
              onreadystatechange  请求状态改变的事件的触发器
                 0  未初始化
                 1  正在加载
                 2  已加载
                 3  交互中
                 4  完成

*/

/*
var xhr = new XMLHttpRequest();

xhr.open(get, 'http://test.wulv5.com/api/v1_0/movie?page=1&limit=10', false);

xhr.send();  //向服务器发送请求

xhr.onreadystatechange = function () { 
    if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log(xhr.responseText);
        } else {
            console.log("请求好像遇到了点问题，状态码：" + xhr.status);
        }
    }
}
*/

//ajax封装
/*
ajax({
    method: "post",
    url: "http://test.wulv5.com/api/v1_0/movie?page=1&limit=10",
    data: {
        page: 1,
        limit: 10
    },
    async: true,
    success: function (data) { },
    error: function (status) { }
});
*/

function myAjax(opt) {
    opt = opt || {};
    var method = opt.method || 'GET';
    var url = opt.url || '';
    var async = opt.async || true;
    var data = opt.data || null;

    var success = opt.success || function () { };
    var error = opt.error || function () { };
    
    var xhr = new XMLHttpRequest();
    
    var params = [];
    if (data) {
        for (var key in data) {
            params.push(key + '=' + data[key]);
        }
    }
    
    var postData = params.join('&');   // join  数组转换字符串

    if (data && method.toLowerCase() == 'get') {
        url += '?' + postData;
    }

    xhr.open(method, url, async);   
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(postData);
    
    xhr.onreadystatechange = function () {
        if ( xhr.readyState == 4 ) {
            if ( xhr.status >= 200 && xhr.status < 300 ) {
                success && success( xhr.responseText );
            } else {
                error && error( xhr.status );
            };
        }
    };
}
