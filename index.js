const express = require( "express" ),
  fs = require( "node:fs" ),
  readjson = require( "readjson" ),
  writejson = require( "writejson" ),
  url = require( "url" ),
  cors = require( "cors" )

function searchurl( u ){
   var search = {}
   for( let param of (url.parse( u ).query || "null=yes").split( "&" ) ){
      let [ key, value ] = param.split( "=" )
      search[ decodeURI( key ) ] = decodeURI( value )
   }
   return search
}

var app = express()
app.use( cors() )

app.use( "/static", express.static( "static" ) )
app.use( "/client", express.static( "client" ) )

app.get( "/", function( req, res ){
   res.send( fs.readFileSync( "./static/index.html" ).toString() )
})

app.get( "/number", function( req, res ){
   var search = searchurl( req.url )
   var dt = readjson.sync( "./public/number.json" )
   if( search[ "id" ] ){
      if( dt[ search[ "id" ] ] == null ){
         dt[ search[ "id" ] ] = 0
      }
      if( search[ "add" ] === "remove" ){
         dt[ search[ "id" ] ]  = undefined
      } else {
         if( !Number.isNaN( parseInt( search[ "add" ] ) ) ){
            dt[ search[ "id" ] ] += parseInt( search[ "add" ] )
         }
      }
   }
   writejson.sync( "./public/number.json", dt )
   res.send( JSON.stringify( dt ) )
})

app.listen( 8080, function(){
   console.log( "http://127.0.0.1:8080" )
})