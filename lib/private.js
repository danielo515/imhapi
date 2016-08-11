'use strict';

const internals = { users: require('./users.json') };

const validate = (request, usr, password, cb) => {

    const user = internals.users[usr];
    if (!user) {
        return cb(null,false);
    }

    return cb(null, user.password === password, { id: user.id, username: user.username });
};

module.exports.register = function Private(server, options, next) {

    server.auth.strategy('simple', 'basic', { validateFunc: validate });
    //add the route
    server.route({
        path: '/private',
        method: 'GET',
        config: {
            auth: 'simple',
            handler: (request, reply) => {

                return reply( '<html><body><h1>Hello ' + request.auth.credentials.username + '</h1></body></html>' );
            }
        }
    });
    next();
};

module.exports.register.attributes = {
    name: 'private'
};
