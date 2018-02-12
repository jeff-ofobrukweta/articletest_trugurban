
/** 
 * Test model: UserModel.test.js
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @sails docs  :: http://sailsjs.org/documentation/concepts/testing - 
 * @chai docs	:: http://chaijs.com/guide/styles/
 * @sinon docs	:: http://sinonjs.org/docs/
 * @supertest 	:: https://github.com/visionmedia/supertest
 */
"use strict";
var chai = require('chai');
var assert = chai.assert;
var sinon = require('sinon');
var request = require('supertest');
var expect =  chai.expect;
var baseUrl = 'http://localhost:1337';
// var User = require('../../../api/models/user');

//TODO: you must create the defining test
var data = {};
describe('Controller:User', () => { 
	describe('POST /User', () => {
        it('Should creat new User', done => {
            request(sails.hooks.http.app)
            .post(baseUrl + '/user')
            .send(data)
            .expect(201)
            .expect('Content-Type', /json/)
            .end((err, res) => {
            	if (err) {
                    return done(err);
                }
                //TODO: validate the response expected
                expect(res.body.code).to.equal('CREATED');
                done();
            });
        });
    });

	describe('GET /User', () => {
        it('Should get User', done => {
            request(sails.hooks.http.app)
            .get(baseUrl + '/user')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
            	if (err)
                    return done(err);
                
                //TODO: validate the response expected
                expect(res.body.code).to.equal('OK');
                data = res.body.data[0];
                done();
            });
        });
    });

    //TODO: you must create the defining logic to get by id
	var id = '5a7b2f306a998b2616976ccb';

	describe('GET /User/:id', () => {
        it('should respond with the requested User:id', done => {
            request(sails.hooks.http.app)
            .get(baseUrl + '/User/' + data.id)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err)
                    return done(err);

                //TODO: validate the response expected
                expect(res.body.code).to.equal('OK');
                done();
            });
        });
    });

    describe('PUT /User/:id', () => {
    	it('should respond updated User', done => {
            request(sails.hooks.http.app)
            .put(sails.config.blueprints.prefix + '/User/' + data.id)
            .send(data)            
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err)
                    return done(err);
            	//TODO: validate the response expected
                expect(res.body.code).to.equal('OK');
                done();
            });
        });
    });

    describe('DELETE /destroyUser/:id', () => {
    	it('should respond with 204 on successful removal', done => {
            request(sails.hooks.http.app)
                .delete(baseUrl + '/User/' + data.id)
            .expect(204)            
            .end((err, res) => {
                if (err)
                    return done(err);

                expect(res.statusCode).to.equal(204);
                done();
            });
        });
    });
    describe('POST /login', () => {

        describe('it respond with 302 and a redirect on successful login', function() {
          it('should redirect to /mypage', function (done) {
            request(sails.hooks.http.app)
              .post('/users/login')
              .send({ name: 'test', password: 'test' })
              .expect(302)
              .expect('location','/', done);
          });
        });
      
      });
    // //Clear User after testing
    //  after(function() {
    //     return User.destroy();
    // });
});

