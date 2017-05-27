/**
 * Created by hugly on 27/05/2017.
 */
// var http = require('http');
// var path = require('path');
// //引入我们自己编写的server模块
// var server = require('./server.js');
// http.createServer(function (request, response) {
//     //以下的判断用来做简单的路由
//     if (request.url == "/") {
//         filePath = path.join(__dirname, '/html/main.html');
//     } else {
//         filePath = path.join(__dirname, '/html' + request.url);
//     }
//     server.serveStatic(response, filePath);
// }).listen(/*侦听4000端口*/8090, function () {
//     console.log("Server listening on port 8090");
// });

var http = require('http');
var express = require('express');
var app = express();
app.use("/html", express.static(__dirname + '/html'));
app.use("/font", express.static(__dirname + '/font'));
app.use("/images", express.static(__dirname + '/images'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/style", express.static(__dirname + '/style'));

// 创建服务端
http.createServer(app).listen('8090', function() {
    console.log('启动服务器完成');
});