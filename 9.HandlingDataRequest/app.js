// module bawaan node s
var http = require("http");
var fs = require('fs');
var url = require('url')
var gString = require('querystring')

http.createServer(function (reg, res) {
    if (reg.url != "/favicon.ico") {
        var access = url.parse(reg.url);
        if (access.pathname == "/") {
            var data = gString.parse(access.query);
            res.writeHead(200, {
                "Content-Type": "text/plain"
            });
            res.end(JSON.stringify(data));
        } else if (access.pathname == "/form") {
            if (reg.method.toUpperCase() == "POST") {
                var data_post = "";
                reg.on('data', function (chunck) {
                    data_post += chunck;
                });

                reg.on('end', function () {
                    data_post = gString.parse(data_post);
                    res.writeHead(200, {
                        "Content-Type": "text/plain"
                    });
                    res.end(JSON.stringify(data_post));
                });
            } else { // get
                res.writeHead(200, {
                    "Content-Type": "text/html"
                });
                fs.createReadStream("./template/form.html").pipe(res);
            }
        } else {
            res.writeHead(200, {
                "Content-Type": "text/plain"
            });
            res.end("Page New Found");
        }
    }
}).listen(8888);

console.log("Server is running");