'use strict';

const Hapi = require('hapi');
const Version = require('./version');
const Private = require('./private');
const Basic = require('hapi-auth-basic');



const internals = { port: 8000 };

internals.init = function initServer(port, next) {

    if (typeof port === 'function') {
        next = port;
        port = undefined;
    }

    port = parseInt( port || internals.port );
    if (isNaN(port)) {
        console.log('Invalid por provided', port);
        return next(new Error('Invalid port number provided'));
    }

    const server = new Hapi.Server();

    server.connection({
        host: 'localhost',
        port: port
    });
    server.register([Version, Basic, Private], (err) => {

        if (err){
            return next(err, server );
        }
        // Start the server
        server.start((err) => {

            console.log('Server running at:', server.info.uri);
            return next(err, server);
        });

    });
};

module.exports = internals;
