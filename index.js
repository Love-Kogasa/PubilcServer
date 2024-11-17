const express = require( "express" ),
  fs = require( "node:fs" ),
  readjson = require( "readjson" ),
  writejson = require( "writejson" ),
  url = require( "url" ),
  cors = require( "cors" ),
  request = require( "sync-request" ),
  path = require( "path" ),
  bodyParser = require( "body-parser" ),
  mailer = require( "nodemailer" )

function searchurl( u ){
   var search = {}
   for( let param of (url.parse( u ).query || "null=yes").split( "&" ) ){
      let [ key, value ] = param.split( "=" )
      search[ decodeURIComponent( key ) ] = decodeURIComponent( value )
   }
   return search
}

var app = express()
app.use( cors() )
app.use( bodyParser.json() )

app.use( "/static", express.static( __dirname + "/static" ) )
app.use( "/client", express.static( __dirname + "/client" ) )

app.get( "/", function( req, res ){
   res.send( fs.readFileSync( path.join( __dirname, "./static/index.html" ) ).toString() )
})

app.get( "/number", function( req, res ){
   var search = searchurl( req.url )
   var dt = readjson.sync( path.join( __dirname, "/public/number.json" ) )
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
   writejson.sync( path.join( __dirname + "/public/number.json" ), dt )
   res.send( JSON.stringify( dt ) )
})

app.get( "/ip", function( req, res ){
   res.send( JSON.stringify( {
      ip: req.ip,
      ipv4: req.ip.match( /(\d{0,3}\.){3}\d{0,3}/ )[0]
   } ) )
})

app.get( "/request", function( req, res ){
   var search = searchurl( req.url )
   var reqip = search.host || "https://example.com"
   var result = request( "GET", reqip )
   res.set( result.headers )
   res.send( result.body )
})

app.get( "/mail", function( req, res ){
   res.send( "Please send post request to request this api" )
})

app.post( "/mail", function( req, res ){
   mailer.createTransport({
      host : req.body.host,
      auth : {
         user : req.body.uname,
         pass : req.body.pw
      }
   }).sendMail({
      from : req.body.from || req.body.uname,
      to : req.body.to,
      subject : req.body.subject,
      html : req.body.body
   }, ( e, info ) => {
      e ?
        res.send( JSON.stringofy({statu: "error", error: e}) ) :
        res.send( JSON.stringofy({statu: "success", info: info}) )
   })
})

app.post( "/request", function( req, res ){
   var search = searchurl( req.url )
   var reqip = search.host || "https://example.com"
   var result = request( "POST", reqip, {
      json: req.body
   } )
   res.set( result.headers )
   res.send( result.body )
})

app.listen( process.env.PORT || 3030, function(){
   console.log( "http://127.0.0.1:3030" )
})

module.exports = app