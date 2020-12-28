var http = require("http");
var url = require('url');
var router = require('routes')();
var view = require('swig');

router.addRoute('/', function (reg, res) {
    var html = view.compileFile('./template/index.html')({
        title: "Index Page from ade rahman"
    });
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    res.end(html);
});

router.addRoute('/contact', function (reg, res) {
    var html = view.compileFile('./template/contact.html')();
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    res.end(html);
});


http.createServer(function (reg, res) {
    var path = url.parse(reg.url).pathname;
    var match = router.match(path);
    if (match) {
        match.fn(reg, res);
    } else {
        res.writeHead(200, {
            "Content-Type": "text/plain"
        });
        res.end("Page not found !!!");
    }

}).listen(8080);

console.log("Server is running....");