'use strict';

const Hapi = require('hapi');
const Hoek = require('hoek');
const Version = require('./version');


const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: parseInt(process.env.PORT || 8000)
});

server.register(Version, (err) =>
{
    Hoek.assert(!err, err);
    // Start the server
    server.start((err) =>
    {

        Hoek.assert(!err, err);
        console.log('Server running at:', server.info.uri);
    });
    
});


