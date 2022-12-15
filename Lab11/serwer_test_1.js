// Creation and running of the Server
var http = require('http');

function SerwisWWW(request, response) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.write("Hello Node.js");
  response.end();
}

var webserver = http.createServer(SerwisWWW).listen(8080, "127.0.0.1");

webserver.once('listening', function () {
  console.log('Server running at http://127.0.0.1:8080/');
});