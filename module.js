//purpose of this is to bring in the router and construct the actual server that will be running
//when you say require this, you need to set it equal to a variable like express
//then, when you run it, you do app = express(); -> express needs to be a function, needs to return an object that has the routes attached to it
//then, you write app.setGET 

'use strict';
var Router = require(__dirname + '/lib/router.js');
var http = require('http');

module.exports = function(){
  var router = new Router();
  router.listen = function(port){
    http.createServer(router.route()).listen(port);
  };
  
  return router;
};
