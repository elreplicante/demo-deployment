'use strict';

/**
 * A demo server.
 * (C) 2013 Alex Fernández.
 */


// requires
var http = require('http');
var url = require('url');
var Log = require('log');

// globals
var log = new Log('info');

// constants
var PORT = 12322;

/**
 * Start the server.
 */
exports.start = function(callback)
{
	var server = http.createServer(serve);
	server.on('error', function(error)
	{
		if (error.code == 'EADDRINUSE')
		{
			log.error('Port ' + PORT + ' in use, please free it and retry again', callback);
			return;
		}
		return createError('Could not start server on port ' + port + ': ' + error, callback);
	});
	server.listen(PORT, function()
	{
		log.info('Listening on port %s', PORT);
		if (callback)
		{
			callback();
		}
	});
	return server
}

/**
 * Serve a request.
 */
function serve(request, response)
{
	log.info('URL is: %s', request.url);
	var path = url.parse(request.url).path;
	response.end(path);
}

/**
 * Run all tests.
 */
exports.test = function(callback)
{
	testing.run({
	}, 4000, callback);
}

// start tests if invoked directly
if (__filename == process.argv[1])
{
	exports.test(testing.show);
}
