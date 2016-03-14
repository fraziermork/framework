# Simple Express
This is a node framework I am building as a learning exercise. I intend to eventually publish it on npm. 

To build an http server with this module, write
var simplee = require('simplee');
var app = simplee();

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

app.listen(port) will tell the router to create a server listening at the specified port
