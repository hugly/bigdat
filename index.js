/**
 * Created by hugly on 27/05/2017.
 */
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