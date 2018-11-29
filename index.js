var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// main page
app.get('/', function(req, res){
  res.sendFile(__dirname + '/login.html');
});

// linked page
app.get('/index.html', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// connect user
io.on('connection', function(socket){
	console.log('a user connected');
	
	socket.on('loginEvent', function(name){
		console.log(name + ' is connected');
	});
	
	socket.on('logoutEvent', function(name){
		console.log(name + ' is disconnected');
	});
	

// allow type function
	socket.on('chat message', function(msg, name){
		console.log(name + ': ' + msg);
		io.emit('chat message', name + ': ' + msg);
	});
});




http.listen(3000, function(){
  console.log('listening on *:3000');
});

