'use strict';
// const fs = require('fs');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
// const router = (__dirname + '/../lib/router.js');
require(__dirname + '/test-server.js');

describe('router.js', () => {
  describe('should allow you to add routes for each REST method', () => {
    it('should let you define GET routes', () => {
      
    });
    it('should let you define POST routes', () => {

    });
    it('should let you define PUT routes', () => {
      
    });
    it('should let you define DEL routes', () => {
      
    });
  });
});

describe('server running using the router', () => {
  it('should let you start a server');
  describe('should respond to GET requests', () => {
    describe('should respond to GET requests to a general resource', () => {
      
    });
    describe('should respond to GET requests to a specific resource', () => {
      
    });  
  });
  
  describe('should respond to POST requests', () => {
    it('builds a directory if one doesnt exist');
    it('should allow you to post a resource, save it, and give it a new unique name');
    
  });
  
  describe('should respond to PUT requests', () => {
    it('should allow you to overwrite a resource that was previously saved with new content');
    
  });
  
  describe('should respond to DEL requests', () => {
    it('should allow you to delete all saved filed');
    it('should allow you to delete a specific named file');
  });
  
  describe('should 404 correctly', () => {
    it('should 404 on routes that arent defined');
    describe('should 404 on routes with invalid parameters', () => {
      
      
    });  
  });
});
