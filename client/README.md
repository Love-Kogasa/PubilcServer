# PublicServer Client
[Chinese 简体中文](https://github.com/Love-Kogasa/PubilcServer/blob/main/client/README_ZH.md)  
↑I wrote it in my parent language, so translating it may actually be easier to understand.！  
The client of PublicServer API.  
My english is not well, i am sorry.
## what is PublicServer API
PublicServer is an free API for all front-end and localapp coder to do some thing that must have an server, like as send an truly http request or write a vote site.  
The all func of PublicServer isnt need an key or signup at now, so u don't need do anything. Just request it, that's no problem.  
PublicServer API is currently maintained by N-Project( it's formed by me ), but infact this project just has one coder that's my own(host use my vercel, I am no full money to buy an host server because I am a student), my friends provide that domain:(.  
If u like this project, u can sponsor me on WeChat with CNY:(
## Install
In the version 1.0.3, you can use this module on both browser and node runtime.  
There are two ways to install this module.  
Use npm cmd
```bash
npm install public-server-api
```
You can also manually download this module from CDN.  
Use on browser and use CDN to install:
```html
<script src="https://publicserver.n-project.us.kg/client/client.js"></script>
```
## Document
~~Do you think I talk too mach, I think so~~  
Let's go, my favorite func that is We can use API to send truly http request now.  
Here is an simple example
```js
(async function(){
  var myserver = new PublicServer()
  alert( await myserver.cat( "https://example.com" ))
  // a easy way to get site body as string
  
  // The another way for request site, it's same as H5 `fetch` API
  var response = await myserver.request( "https://example.com" )
  alert( await response.text() )
})()
```
In version 1.0.3, the `cat` method supports sending post requests with datas. For example
```js
var text = await myserver.cat( "https://example.com", "POST", {
  name : "114514"
} )
```

And I made a mail api (SMTP), that will help u send an email in front-end
```js
var myserver = new PublicServer()
myserver.mail( {
   host: "smtp.xxx.com",
   uname: "user@xxx.com",
   // from : "from@xxx.com",
   // ↑ If don't set this option, that will be samed as uname
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

If u want to get your page request params from url. u can use value `params`
```js
console.table( new PublicServer().params )
// If u use node runtime, This value will get params from cmd line arguments.
```

dns API and a simple socket api example
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

Ip API example
```js
var myserver = new PublicServer()
// If this way always return 127.0.0.1, please use `new PublicServer( "https://pubilc-server-guw1n1jm4-love-kogasas-projects.vercel.app" )`
myserver.ip().then( dt => console.log( dt.ipv4 ) )
// "dt" is an object contain ip and ipv4
```

Counter API example.  
This api can't run with default api server now, because I use vercel for API server, server will run on read-only filesystem
```js
var myserver = new PublicServer()
myserver.number( false ).then( console.table )
// get all counter
myserver.number( true, "test" ).then( console.log )
// get counter by id "test"
myserver.number( true, "xxx.xxx.com testnumber", 5 ).then( console.log )
// Register a counter(if this id isnt be registered) and increase 5
```
By the way, please use "xxx.com id" like format to register your counter id. Because emmm... u know.  

At present, there are only these contents, but I will gradually add more. awa
