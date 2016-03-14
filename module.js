//purpose of this is to bring in the router and construct the actual server that will be running
//when you say require this, you need to set it equal to a variable like express
//then, when you run it, you do app = express(); -> express needs to be a function, needs to return an object that has the routes attached to it
//then, you write app.setGET 

'use strict';
var Router = require(__dirname + '/lib/router.js');
var http = require('http');
var fs = require('fs');


var buildDirectories = () => {
  Object.keys(this.routes).forEach(function(method){
    Object.keys(this.routes[method]).forEach(function(route){
      var routeArray = route.split('/');
      for (var i = 2; i < routeArray.length + 1; i++) {
        var path = routeArray.slice(0, i).join('/');  //path to the directory
        if (routeArray[i].indexOf(':') !== -1){
          break;
        }
        fs.accessSync('.' + path, (err) => {
          if(err){
            fs.mkdirSync('.' + path);
          }
        });
      }
    });
  });
};

module.exports = function(){
  var router = new Router();
  router.listen = function(port, callback){
    //need to add a function here that will build all the appropriate directories?
    // (() => {
    //   console.dir(this);
    //   console.dir(this.routes);
    // })();
    console.dir(this.routes);
    var routes = this.routes;
    // Object.keys(routes).forEach(function(method){
    //   console.dir(routes[method]);
    // });
    Object.keys(routes).forEach(function(method){
      Object.keys(routes[method]).forEach(function(route){
        var routeArray = route.split('/');
        console.log('routeArray is', routeArray);
        for (var i = 2; i < routeArray.length + 1; i++) {
          var path = routeArray.slice(0, i).join('/');  //path to the directory
          console.log('path is', path);
          if (path.indexOf(':') !== -1){
            break;
          }
          fs.accessSync('.' + path, (err) => {
            if(err){
              fs.mkdirSync('.' + path);
            }
          });
        }
      });
    });
    
    // buildDirectories(); //.bind(router);
    http.createServer(router.route()).listen(port, callback);
  };
  return router;
};


var testDirectories = () => {
  var self = this;
  Object.keys(self.routes).forEach(function(method){
    Object.keys(self.routes[method]).forEach(function(route){
      var routeArray = route.split('/');
      for (var i = 2; i < routeArray.length + 1; i++) {
        var path = routeArray.slice(0, i).join('/');  //path to the directory
        console.log(path);
        if (routeArray[i].indexOf(':') !== -1){
          break;
        }
      }
    });
  });
};
var testObj = {
  routes: {
    GET: {
      '/notes/january/week1/:note': function(){console.log('get1');},
      '/hotels/employees/seattle/:test': function(){console.log('hotelsGet');}
    },
    POST: {
      '/hotels/events/january/:test' : function(){console.log('post1');}
    }
    
  }
};
