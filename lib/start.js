'use strict';

const Server = require('./index.js');

Server.init(8000, next);

function next(err,server)
{
    console.log(server);  
};
