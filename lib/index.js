'use strict';

const Hapi = require('hapi');
const Version = require('./version');




const internals = {};

internals.init = function initServer(port, next)
{
    const server = new Hapi.Server();

    server.connection({
        host: 'localhost',
        port: parseInt(port || 8000)
    });
    server.register(Version, (err) =>
    {
        if (err){
            next(err);
        }
        // Start the server
        server.start((err) =>
        {

            if (err){
                next(err);
            }
            console.log('Server running at:', server.info.uri);
            return next(null, server);
        });
    
    });
};

module.exports = internals;