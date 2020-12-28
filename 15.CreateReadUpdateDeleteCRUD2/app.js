var http = require("http");
var url = require('url');
var qString = require('querystring');
var router = require('routes')();
var view = require('swig');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306, //port phpmyadmin
    database: "nodejs",
    user: "root",
    password: ""
});


router.addRoute('/', function (reg, res) {
    connection.query("select * from mahasiswa", function (err, rows, field) {
        if (err) throw err;
        var html = view.compileFile('./template/index.html')({
            title: "Data Mahasiswa",
            data: rows
        });

        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end(html);
    });

});

router.addRoute('/insert', function (reg, res) {

    if (reg.method.toUpperCase() == "POST") {
        var data_post = "";
        reg.on('data', function (chuncks) {
            data_post += chuncks;
        });

        reg.on('end', function () {
            data_post = qString.parse(data_post);
            // console.log(data_post);
            // res.end();
            connection.query("Insert into mahasiswa set ?", data_post, function (err, field) {
                if (err) throw err;
                res.writeHead(302, {
                    "Location": "/"
                });
                res.end();
            });
        });
    } else {
        var html = view.compileFile('./template/form.html')();
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end(html);
    }
});

router.addRoute('/update/:id', function (reg, res) {

    connection.query("select * from mahasiswa where ?", {
            no_induk: this.params.id
        },
        function (err, rows, field) {
            if (rows.length) {
                // mengambldata pertama
                var data = rows[0];
                if (reg.method.toUpperCase() == "POST") {
                    var data_post = "";
                    reg.on('data', function (chucks) {
                        data_post += chucks;
                    });

                    reg.on('end', function () {
                        data_post = qString.parse(data_post);
                        connection.query("update mahasiswa set ? where ?", [data_post,
                            {
                                no_induk: data.no_induk
                            }
                        ], function (err, fields) {
                            if (err) throw err;
                            res.writeHead(302, {
                                "Location": "/"
                            });
                            res.end();
                        });
                    });
                } else {
                    var html = view.compileFile('./template/form_update.html')({ //pakai json object
                        data: data
                    });
                    res.writeHead(200, {
                        "Content-Type": "text/html"
                    });
                    res.end(html);
                }
            } else {
                var html = view.compileFile('./template/404.html')();
                res.writeHead(200, {
                    "Content-Type": "text/html"
                });
                res.end(html);
            }
        }
    );


});

router.addRoute('/delete/:id', function (reg, res) {
    connection.query("delete from mahasiswa where ?", {
        no_induk: this.params.id
    }, function (err, fields) {
        if (err) throw err;
        res.writeHead(302, {
            "Location": "/"
        });
        res.end();
    });

});

http.createServer(function (reg, res) {
    var path = url.parse(reg.url).pathname;
    var match = router.match(path);
    if (match) {
        match.fn(reg, res);
    } else {
        var html = view.compileFile('./template/404.html')();
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end(html);
    }

}).listen(8080);

console.log("Server is running....");