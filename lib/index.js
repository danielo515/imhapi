'use strict';

const Hapi = require('hapi');
const Hoek = require('hoek');

const internals = {
    pkg: require('../package.json')
};

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: parseInt(process.env.PORT || 8000)
});

// Add the route
server.route({
    method: 'GET',
    path:'/version',
    handler: function (request, reply) {

        return reply({ version: internals.pkg.version });
    }
});

// Start the server
server.start((err) =>
{
    Hoek.assert(!err, err);
    console.log('Server running at:', server.info.uri);
});
