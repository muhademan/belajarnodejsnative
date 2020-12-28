var http = require("http");
var url = require('url');
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
        // console.log(rows);
        // res.end();
        // rows.forEach(function (item) {
        //     console.log(item.no_induk + " : " + item.nama);
        // });

        res.writeHead(200, {
            "Content-Type": "text/plain"
        });
        res.end(JSON.stringify(rows));
    });
});

router.addRoute('/insert', function (reg, res) {
    connection.query("Insert into mahasiswa set ?", {
        no_induk: "736553992",
        nama: "boboy",
        alamat: "plaju"
    }, function (err, field) {
        if (err) throw err;
        res.writeHead(200, {
            "Content-Type": "text/plain"
        });
        res.end(field.affectedRows + " Affected Rows");
        // console.log(field.affectedRows);
        // res.end();
    });
});

router.addRoute('/update', function (reg, res) {
    connection.query("update mahasiswa set ? where ?", [{
            nama: "tata"
        },
        {
            no_induk: "3866277728"
        }
    ], function (err, fields) {
        if (err) throw err;
        res.writeHead(200, {
            "Content-Type": "text/plain"
        });
        res.end(fields.changedRows + " Rows Updated");
    });

});

router.addRoute('/delete', function (reg, res) {
    connection.query("delete from mahasiswa where ?", {
        no_induk: "8268663"
    }, function (err, fields) {
        if (err) throw err;
        res.writeHead(200, {
            "Content-Type": "text/plain"
        });
        res.end(fields.affectedRows + " Rows Deleted");
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