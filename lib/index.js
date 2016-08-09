'use strict';

const Hapi = require('hapi');

const internals = {
    pkg: require('../package.json')
};

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
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
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
