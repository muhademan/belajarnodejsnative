// module bawaan node s
var http = require("http");
var fs = require('fs');

http.createServer(function(reg,res){
    var kode = 0;
    var file = "";

    if (reg.url == "/") {
        kode = 200;
        file = "index.html";
    }else if (reg.url == "/contact") {
        kode = 200;
        file = "contact.html";
    }else{
        kode = 404;
        file = "404.html";
    }
    res.writeHead(kode,{"Content-Type" : "text/html"});
    fs.createReadStream('./template/'+file).pipe(res);
}).listen(8888);

console.log("Server is running");