var http = require("http");
var url = require('url');
var routes = require('routes')();

routes.addRoute('/', function (reg, res) {
    res.writeHead(200, {
        "Content-Type": "text/plain"
    });
    res.end("Index Page ");
});

routes.addRoute('/profile/:nama/:kota', function (reg, res) {
    res.writeHead(200, {
        "Content-Type": "text/plain"
    });
    res.end("Profile Page " + this.params.nama + " dari " + this.params.kota);
});

routes.addRoute('/contact', function (reg, res) {
    res.writeHead(200, {
        "Content-Type": "text/plain"
    });
    res.end("Contact Page");
});

http.createServer(function (reg, res) {
    var path = url.parse(reg.url).pathname;
    var match = routes.match(path);
    if (match) {
        match.fn(reg, res);
    } else {
        res.writeHead(404, {
            "Content-Type": "text/plain"
        });
        res.end("Page Not Found");
    }
}).listen(8080);