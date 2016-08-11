'use strict';

// Load modules

const Code = require('code');
const Lab = require('lab');
const Lib = require('../lib');
const Pkg = require('../package.json');


// Declare internals

const internals = {};


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('version', () => {

    it('should return expected data', (done) => {

        Lib.init((err, server) => {

            expect(err).to.be.undefined();
            expect(server.info.port).to.equal(8000);
            server.inject('/version', (response) => {

                expect(response.statusCode).to.equal(200);
                expect(response.result.version).to.equal(Pkg.version);
                server.stop(done);
            });
        });
    });
});

