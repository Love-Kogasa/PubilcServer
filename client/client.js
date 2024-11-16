class PublicServer {
   constructor( node = "https://publicserver.n-project.us.kg" ){
      this.server = node
      this.params = (function(){
         var url = new URL( window.location.href )
         var retv = {}
         if( url.search !== "" ){
            for( let param of url.search.slice( 1 ).split( "&" ) ){
               let [key,value] = param.split( "=" )
               retv[ decodeURI( key ) ] = decodeURI( value )
            }
         }
         return retv
      })()
   }
   async request( url = "https://example.com", setting ){
      return await fetch( this.server + "/request?host=" + encodeURI( url ), setting )
   }
   async cat( url = "https://example.com", method = "GET" ){
      return await (await this.request( url, {method} )).text()
   }
   async number( single = true, id = "test", add = "none" ){
      var dt = (await fetch( this.server + "/number?id=" + encodeURI( id ) + "&add=" + encodeURI( add ) )).json()
      if( single ){
         return dt[ id ]
      } else {
         return dt
      }
   }
   async ip(){
      return (await (await fetch( this.server + "/ip" )).json())
   }
}

if( typeof module === "object" ) module.exports = PublicServer
/*
var myserver = new PublicServer( "http://localhost:3030" )

// request
myserver.cat( "https://example.com" )
  .then( console.log )

// ip
myserver.ip().then( ip => console.log( ip.ipv4 ) )

// number
myserver.number( false ).then( dt => console.log( dt.test ) )
*/