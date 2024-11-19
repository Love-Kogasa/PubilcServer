# PublicServer Client
PublicServer API客户端JS库
## what is PublicServer API
PublicServer 是一个完全开源免费公开使用的API，旨在为纯前端，本地APP提供一个公用的后端服务器，为前端提供一些后端才有的功能，帮助开发者节约开发成本，开发时间，学习成本等。举个栗子，现在你可以通过本API在前端发送真正的HTTP请求，或者利用MailAPI编写一个留言板页面！  
PublicServer 为了带给开发者更方便快速的使用本API，所以我没有做任何使用限制(vercel限制除外，后面有钱了会置办一台服务器)，不需要注册，登录，gh，gl又或是秘钥，开箱即用快且便捷！  
为了开发此Api以及完成我的很多梦想，我带几个朋友建立了N-Project，希望能找到更多志同道合的朋友一起开发(任何人，包括学生都可以来哦)，但目前参与此API的开发者只有我一人，我一个朋友管理域名:(  
~~如果你喜欢这个项目，可以通过微信赞赏码来为我赞助哦w~~
## Install
在1.0.3版本中，此模块增加了对Nodejs运行时的支持，这样可以方便跨运行时js库的开发，方便测试，也方便利用api做一些网络项目  
你可以使用npm下载安装awa
```bash
npm install public-server-api
```
浏览器当然也可以，而且有CDN哦(国内可裸连)
```html
<script src="https://publicserver.n-project.us.kg/client/client.js"></script>
```
## Document
Okk，接下来是介绍时刻，对于此API我最激动的事情便是可以在前端发送真正的http请求不收到跨域限制了！  
我们现在可以在前端编写爬虫等等了www, 废话少说，上栗子
```js
(async function(){
  var myserver = new PublicServer()
  alert( await myserver.cat( "https://example.com" ))
  // 我写了一个简化方法用来获取网页内容↑
  
  // 另一种相对复杂一些的方法，他和fetch一样，所以你并不需要单独学习它的返回格式
  var response = await myserver.request( "https://example.com" )
  alert( await response.text() )
})()
```
在1.0.3版本中，cat方法将可以携带数据发送post请求，比如说
```js
var text = await myserver.cat( "https://example.com", "POST", {
  name : "114514"
} )
```

我还写了一个Mail API用于在前端发送邮件w
```js
var myserver = new PublicServer()
myserver.mail( {
   host: "smtp.xxx.com",
   uname: "user@xxx.com",
   // from : "from@xxx.com",
   // ↑ 如果不设置则与uname相同
   pw: "password",
   subject: "TestEmailAPI",
   to: "friend@xxx.com",
   body: "<b>body of your mail with html support</b>"
}).then( ( data ) => {
   if( data.statu === "error" ){
      console.table( data.error )
   } else {
      console.log( data.statu )
   }
})
```

如果你想获取页面GET参数，则可以使用对象的params变量
```js
console.table( new PublicServer().params )
// 在node运行时里，此变量解析自命令行参数
```

这里还有一个关于Socket以及一个关于DNS解析的API  
可以用于读(只读)取基于(ip|tcp)协议的服务器返回的信息  
```js
var myserver = new PublicServer()
var readdt = await readSocket(
  (await dnsParse( "example.com" )
  /* 返回 domain(域名) 和 data */ ).data[0] + ":8080" /*,
  1 默认为1, 表示在第多少次的时候返回数据*/
)

if( readdt.statu == error ){
  console.table( readdt.error )
} else {
  console.table( readdt.data )
  // 返回data是一个数组，表示接听到的内容，数组每个成员都包含string与buffer(数组)两个对象
}
```

一个简单的ipAPI  
这里因为CNAME过去的可能有点问题
```js
var myserver = new PublicServer()
// If this way always return 127.0.0.1, please use `new PublicServer( "https://pubilc-server-guw1n1jm4-love-kogasas-projects.vercel.app" )`
myserver.ip().then( dt => console.log( dt.ipv4 ) )
// "dt" is an object contain ip and ipv4
```

计数器API  
受vercel限制，我就先不说了()

因为刚开始写没多久，功能不算多吧，我会继续开发的