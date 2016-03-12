# Simple Express
This is a node framework I am building as a learning exercise. I intend to eventually publish it on npm. 


To build an http server with this module, write
var simpleE = require('simple-express');
var app = simpleE();
app.setGET('/', function(request, response){
    //your functionality here
})
app.setPUT('/', function(request, response){
    //your functionality here
})
app.setPOST('/', function(request, response){
    //your functionality here
})
app.setDEL('/', function(request, response){
    //your functionality here
})


Alternatively, this supports chaining, so you can write the code above by instead writing:

app
  .setGET('/', function(request, response){
    //your functionality here
  }) 
  .setPUT('/', function(request, response){
      //your functionality here
  })
  .setPOST('/', function(request, response){
      //your functionality here
  })
  .setDEL('/', function(request, response){
      //your functionality here
  })

This app supports specific routes for PUT, GET, and DEL, but not for POST. 
All post routes save data as JSON files into a directory whose name is the same as the route--if you set a route for '/notes', it will build a notes directory--this doesn't currently support post routes to paths like '/notes/january'
