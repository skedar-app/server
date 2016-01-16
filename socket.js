var fs = require('fs');
var ss = require('socket.io-stream');
var io = require('socket.io')();

module.exports = function(server) {
  io.on('connection', function(socket){
    console.log("client connected");
    socket.on('disconnect', function() {
      disconnectSocket()
    });
    ss(socket).on('file', function(stream) {
      uploadFile(socket, stream)
    });
  });
  io.listen(server);
}

var disconnectSocket = function() {
  console.log("client disconnected");
}

var uploadFile = function(socket, stream) {
  console.log("get stream upload");
  var path = 'file.txt';
  var writeStream = fs.createWriteStream(path)
  stream.pipe(writeStream);
  stream.on('data', function(data) {
    console.log(data);
    io.emit('uploaded-size', data.length);
  });
  writeStream.on('finish', function(){
    console.log("upload over");
    socket.disconnect();
  });
}
