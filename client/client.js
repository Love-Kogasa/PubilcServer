class PublicServer {
   constructor( node = "https://publicserver.n-project.us.kg" ){
      this.server = node
      this.params = (function(){
         var retv = {}
         try {
            var url = new URL( window.location.href )
            if( url.search !== "" ){
               for( let param of url.search.slice( 1 ).split( "&" ) ){
                  let [key,value] = param.split( "=" )
                  retv[ decodeURIComponent( key ) ] = decodeURIComponent( value )
               }
            }
         } catch(err) {
            for( let param of process.argv.slice(2)){
               let [key, value] = param.split( "=" )
            }
         }
         return retv
      })()
   }
   async request( url = "https://example.com", setting ){
      return await fetch( this.server + "/request?host=" + encodeURIComponent( url ), setting )
   }
   async mail( setting ){
      return await (await fetch( this.server + "/mail", {
         method : "POST",
         headers : {
           'Content-Type': 'application/json'
         },
         body : JSON.stringify( setting )
      } )).json()
   }
   async cat( url = "https://example.com", method = "GET", data = {} ){
      var setting = {method, headers : {
         'Content-Type': 'application/json'
      }}
      if( method.toLowerCase() === "post" ){
         setting.body = JSON.stringify( data )
      }
      if( method.toLowerCase() === "post" ){
         return await (await this.request( url, setting )).text()
      } else {
         return await (await this.request( url )).text()
      }
   }
   async readSocket( ip, count = 0 ){
      return ((await fetch( this.server + "/ipc?ip=" + encodeURIComponent( ip ) + "&count=" + encodeURIComponent( count ) )).json())
   }
   async dnsParse( domain ){
      return ((await fetch( this.server + "/dns?domain=" + encodeURIComponent( domain ) )).json())
   }
   async number( single = true, id = "test", add = "none" ){
      var dt = (await fetch( this.server + "/number?id=" + encodeURIComponent( id ) + "&add=" + encodeURIComponent( add ) )).json()
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