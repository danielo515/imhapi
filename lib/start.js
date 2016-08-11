'use strict';

const Server = require('./index.js');
const Hoek = require('Hoek');

const next = (err, server) => {

    Hoek(!err, err);
    console.log(server);
};

Server.init(8000, next);
