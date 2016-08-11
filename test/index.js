'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const Lib = require('../lib');
const Version = require('../lib/version');
const Hapi = require('hapi');

// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('index', () => {

    describe('.init()', { parallel: false }, () => {

        it('should properly handle an error if the plugin does not load correctly', (done) => {

            const register = Version.register;

            Version.register = function (server, options, next) {

                next('Error message');
            };

            Version.register.attributes = {

                name: 'Fake version register'
            };

            Lib.init(0, (err, server) => {

                expect(err).to.equal('Error message');
                Version.register = register;
                server.stop(done);
            });
        });

        it('should return a instance of server listening on given port', (done) => {

            Lib.init(3000,(err, server) => {

                expect(err).to.be.undefined();
                expect(server instanceof Hapi.Server).to.equal(true);
                expect(server.info.port).to.equal(3000);
                server.stop(done);
            });
        });

        it('should create a server on port 8000 when no port given', (done) => {

            Lib.init((err, server) => {

                expect(err).to.be.undefined();
                expect(server instanceof Hapi.Server).to.be.true();
                expect(server.info.port).to.equal(8000);
                server.stop(done);
            });
        });

        it('should return an error if invalid port provided', (done) => {

            Lib.init('invalid port',(err, server) => {

                expect(err instanceof Error).to.be.true();
                expect(server).to.be.undefined();
                done();
            });
        });
    });
});
