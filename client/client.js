class PublicServer {
   constructor( node = "https://publicserver.n-project.us.kg" ){
      this.server = node
      this.params = (function(){
         var url = new URL( window.location.href )
         var retv = {}
         if( url.search !== "" ){
            for( let param of url.search.slice( 1 ).split( "&" ) ){
               let [key,value] = param.split( "=" )
               retv[ decodeURIComponent( key ) ] = decodeURIComponent( value )
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
   async cat( url = "https://example.com", method = "GET" ){
      return await (await this.request( url, {method} )).text()
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