//purpose of this is to hold the router object and the functions to allow you to define routes
'use strict';
var Router = module.exports = exports = function(){
  this.routes = {};
  this.routes.GET = {};
  this.routes.POST = {};
  this.routes.PUT = {};
  this.routes.DELETE = {};
};

Router.prototype.route = function(){
  return (request, response) => {
    var routeFunction = this.routes[request.method][request.url];
    if (routeFunction instanceof Function){
      routeFunction(request, response);
    } else {
      response.writeHead(404, {'Content-Type': 'application/json'});
      response.end('404 Not found');
    }
  };
};

Router.prototype.setGET = function(route, callback){
  this.routes.GET[route] = callback;
  // return this;
};
Router.prototype.setPOST = function(route, callback){
  this.routes.POST[route] = callback;
  // return this;
};
Router.prototype.setPUT = function(route, callback){
  this.routes.PUT[route] = callback;
  // return this;
};
Router.prototype.setDEL = function(route, callback){
  this.routes.DELETE[route] = callback;
  // return this;
};
