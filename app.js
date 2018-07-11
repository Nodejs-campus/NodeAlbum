
//引包
var express = require("express");
var router = require("./controller/router.js");


var app = express(); //启动express

//设置模版 ejs
app.set("view engine", "ejs");

//路由中间件
app.use( "/",express.static("./public") );  //先走静态服务,省略第一个参数写法：app.use( express.static("./public") );
app.use( "/",express.static("./uploads") );

app.get("/", router.showIndex); //首页
app.get("/:albumName", router.showAlbum); //相册
app.get("/up", router.showUp); //上传
app.post("/up", router.doPost);

//最后的中间件 404页面
app.use(function(req,res){
    res.render("err");
})

app.listen(8080);   //监听8080端口