var fs = require('fs');
var ss = require('socket.io-stream');
var io = require('socket.io')();

module.exports = function(server) {
  io.on('connection', function(socket){
    console.log("client connected");
    socket.on('disconnect', disconnectSocket);
    ss(socket).on('file', uploadFile);
  });
  io.listen(server);

  var disconnectSocket = function() {
    console.log("client disconnected");
  }

  var uploadFile = function(stream) {
    console.log("get stream upload");
    var path = './files/' + 'file.txt';
    stream.pipe(fs.createWriteStream(path));
    stream.on('data', function(data) {
      io.emit('uploaded-size', data.length);
    });
  }
}
