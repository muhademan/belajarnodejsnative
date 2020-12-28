// module bawaan node s
var http = require("http");

// http.createServer(function(reg,res){
//     if(reg.url != "/favicon.ico"){
//     console.log(reg.url);
//     }
//     // supaya tidak running berulang2
//     res.writeHead(200,{"Content-Type" : "text/plain"});
//     res.write("Hello from Node Js Server");
//     res.end();
// }).listen(8888);

http.createServer(function(reg,res){
    if(reg.url != "/favicon.ico"){
    // supaya tidak running berulang2
    res.writeHead(200,{"Content-Type" : "text/plain"});
    res.write("Hello from Node Js Server");
    res.write("You reg : "+reg.url);
    res.end();
    }
}).listen(8888);

console.log("Server is running");