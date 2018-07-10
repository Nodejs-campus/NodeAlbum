
//引包
var express = require("express");
var router = require("./controller/router.js");


var app = express();

//设置模版
app.set("view engine", "ejs");

//路由中间件
app.use( express.static("./public") );  //静态服务
app.get("/", router.showIndex);

app.listen(8080);