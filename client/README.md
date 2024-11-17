# PublicServer Client
The client of PublicServer API.  
My english is not well, i am sorry.
## what is PublicServer API
PublicServer is an free API for all front-end and localapp coder to do some thing that must have an server, like as send an truly http request or write a vote site.  
The all func of PublicServer isnt need an key or signup at now, so u don't need do anything. Just request it, that's no problem.  
PublicServer API is currently maintained by N-Project( it's formed by me ), but infact this project just has one coder that's my own(host use my vercel, I am no full money to buy an host server because I am a student), my friends provide that domain:(.  
If u like this project, u can sponsor me on WeChat with CNY:(
## Document
~~Do you think I talk too mach, I think so~~  
Let's go, my favorite func that is We can use API to send truly http request now.  
Here is an simple example
```js
(async function(){
  var myserver = new PublicServer()
  alert( await myserver.cat( "https://example.com" ))
  // a easy way to get site body as string
  
  // The another way
  var response = await myserver.request( "https://example.com" )
  // a response object same as fetch will be returned
  alert( await response.text() )
})()
```

And I made a mail api (SMTP), that will help u send an email in front-end
```js
var myserver = new PublicServer()
myserver.mail( {
   host: "smtp.xxx.com",
   uname: "user@xxx.com",
   pw: "password",
   subject: "TestEmailAPI",
   to: "friend@xxx.com",
   body: "<b>body of your mail with html support</b>"
}).then( ( data ) => {
   if( statu === "error" ){
      console.table( error )
   } else {
      console.log( statu )
   }
})
```

Ip API example
```js
var myserver = new PublicServer()
// If this way always return 127.0.0.1, please use `new PublicServer( "https://pubilc-server-guw1n1jm4-love-kogasas-projects.vercel.app" )`
myserver.ip().then( dt => console.log( dt.ipv4 ) )
// "dt" is an object contain ip and ipv4
```

Counter API example
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
