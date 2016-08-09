'use strict';

const Hapi = require('hapi');
const Fs = require('fs');
const Path = require('path');

function startServer(version){// Create a server with a host and port
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

            return reply({ version: version });
        }
    });

    // Start the server
    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
}

function getVersion(callback)
{
    Fs.readFile(Path.join(__dirname,'../package.json'),'utf8',readHandler);
    function readHandler(err, data)
    {
        if (err)
        {
            console.log(err);
            callback(err);
        }
        const version = JSON.parse(data).version;
        callback(null,version);
    }
}

getVersion((err, version) => {

    if (err){
        return;
    }
    startServer(version);
});
