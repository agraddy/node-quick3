var fs = require('fs');
var http = require('http');
var io;
var server;


server = http.createServer(function(req, res) {
	var file = fs.createReadStream('views/index.htm');

	res.writeHead(200, {'Content-type': 'text/html'});
	file.pipe(res);
});

io = require('socket.io')(server);

io.on('connection', function(socket) {
	console.log('connected');

	function output() {
		console.log(new Date());
		socket.emit('message', new Date());

		setTimeout(output, 300);
	}

	output();
});

server.listen(80);
console.log('Server started');
