'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const Server = require('../lib');

// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('/private', () => {

    it('should welcome page', (done) => {

        Server.init(0, (err, server) => {

            expect(err).to.not.exist();
            const request = {
                method: 'GET',
                url: '/private',
                headers: {
                    authorization: internals.header('danielo', 'putazo')
                }
            };

            server.inject(request, (res) => {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.equal('<html><body><h1>Hello danielo</h1></body></html>');
                server.stop(done);

            });

        });
    });
    it('should return 401 for incorrect user', (done) => {

        Server.init(0, (err, server) => {

            expect(err).to.not.exist();

            const request = {
                method: 'GET',
                url: '/private',
                headers: {
                    authorization: internals.header('darth', 'vader')
                }
            };

            server.inject(request, (res) => {

                expect(res.statusCode).to.equal(401);
                server.stop(done);
            });
        });
    });
});

internals.header = function (username, password) {

    return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
};
