var cluster = require('cluster');
var sticky = require('socketio-sticky-session');
var socket = require('./socket');

var port = 9000;
var stickyOptions = {
  proxy: false
}

var createServer = function() {
  var http = require('http');

  var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World! From worker '
    + (cluster.isMaster ? 'master' : cluster.worker.id)
    + ' with pid: ' + process.pid + ' \n');
  });
  socket(server);
  return server;
}

var server = sticky(stickyOptions, createServer).listen(port, function() {
  console.log('Sticky cluster worker '
  + (cluster.worker ? cluster.worker.id : 'master')
  + ' server listening on port ' + port);
});
