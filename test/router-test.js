'use strict';
const fs = require('fs');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;


var Router = require( __dirname + '/../lib/router.js');
var router = new Router();
var simplee = require(__dirname + '/../module.js');

function testFunction(){
  return true;
}

describe('router.js', () => {
  describe('should allow you to add routes for each REST method', () => {
    it('should let you define GET routes', () => {
      router.setGET('/', testFunction);
      expect(router.routes.GET['/']).to.eql(testFunction);
      expect(router.routes.GET['/']()).to.equal(true);
    });
    it('should let you define POST routes', () => {
      router.setPOST('/', testFunction);
      expect(router.routes.POST['/']).to.eql(testFunction);
    });
    it('should let you define PUT routes', () => {
      router.setPUT('/', testFunction);
      expect(router.routes.PUT['/']).to.eql(testFunction);
    });
    it('should let you define DEL routes', () => {
      router.setDEL('/', testFunction);
      expect(router.routes.DELETE['/']).to.eql(testFunction);
    });
  });
});

describe('module.js', () => {
  before('should let you start a server on 3000', function(done){
    var app = simplee();
    app.setGET('/', (request, response) => {
      response.write('success');
      response.end();
    });
    app.setPOST('/notes', (request, response) => {
      var i = 1;
      request.on('data', (data) => {
        fs.writeFile(__dirname + '/notes/' + i++ + '.json', data, (err) => {
          response.end();
          console.log('file written');
          console.log(err);
        });
      });
    });
    app.setPUT('/notes', (request, response) => {
      request.on('data', (data) => {
        fs.writeFile(__dirname + '/notes/1.json', data, (err) => {
          response.end();
          console.log('file replaced');
          console.log(err);
        });
      });
    });
    app.setDEL('/notes', (request, response) => {
      response.end();
      fs.unlinkSync(__dirname + '/notes/1.json');
      console.log('file deleted');
    });
    
    app.listen(3000);
    done();
    
  });
  
  describe('should respond to GET requests', () => {
//     describe('should respond to GET requests to a specific resource', () => {
//       
//     });
    it('should respond to GET requests to a general resource', (done) => {
      request('localhost:3000').get('/').end((err, response) => {
        expect(err).to.equal(null);
        expect(response.status).to.equal(200);
        expect(response.text).to.equal('success');
        done();
      });
    });  
  });
  
  describe('should respond to POST requests', () => {
    it('should allow you to post a resource, save it, and give it a new unique name', function(done){
      request('localhost:3000').post('/notes').send({body: 'hello world'}).end((err, response) => {
        expect(err).to.equal(null);
        expect(response.status).to.equal(200);
        fs.readFile(__dirname + '/notes/1.json', 'utf8', (err, data) => {
          expect(data).to.equal(JSON.stringify({body: 'hello world'}));
          done();
        });
      });
    });
  });
   
   
  describe('should respond to PUT requests', () => {
    it('should allow you to overwrite a resource that was previously saved with new content', (done) => {
      request('localhost:3000').put('/notes').send({body: 'hello world 2'}).end((err, response) => {
        expect(err).to.equal(null);
        expect(response.status).to.equal(200);
        fs.readFile(__dirname + '/notes/1.json', 'utf8', (err, data) => {
          expect(data).to.equal(JSON.stringify({body: 'hello world 2'}));
          done();
        });
      });
    });
  }); 
   
  describe('should respond to DEL requests', () => {
    // it('should allow you to delete all saved filed');
    it('should allow you to delete a specific named file', (done) => {
      request('localhost:3000').del('/notes').end((err, response) => {
        expect(err).to.equal(null);
        done();
        // try{
        //   fs.readFileSync(__dirname + '/notes/1.json');
        // } catch (err){
        //   expect(err).to.not.equal(null);
        //   done();
        // }
      });
    });
  });

});
