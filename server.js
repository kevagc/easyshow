var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

server.listen(process.env.PORT || 3589);
console.log('Server Started');

app.get('/', function(req, res){
	console.log('Index');
})

io.sockets.on('connection', function(socket){
	console.log('Socket Connected');

	socket.on('Send Message', function(data){
		io.sockets.emit('new message', {msg : data});
	})
})