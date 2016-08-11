'use strict';

const internals = {
    pkg: require('../package.json')
};

module.exports.register = function (server, options, next){
    // Add the route
    server.route({
        method: 'GET',
        path: '/version',
        handler: function (request, reply){

            return reply({ version: internals.pkg.version });
        }
    });
    next();
};

module.exports.register.attributes = {
    name: 'version'
};
