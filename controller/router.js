var file = require("../models/file.js");    //引入相册model
var formidable = require("formidable");
var path = require("path");
var fs = require("fs");
var sd = require("silly-datetime");

//暴露接口
//首页
exports.showIndex = function(req, res,next){

    // //同步写法不行的：
    // res.render("index",{    //index.ejs
    //     "albums":file.getAllAlbums()   //["aa","bb","cc"]  给ejs模版传数据
    // });
    
    //异步操作得数据，采用回调：
    file.getAllAlbums(function(err,allAlbums){
        if(err){
            // res.send(err);
            // res.render("err");
            next(); //交给后面的中间件处理
            return;
        }
        res.render("index",{    //index.ejs
            "albums":allAlbums
        });
    })
}

//相册
exports.showAlbum = function(req, res,next){
    // res.send("相册" + req.params.albumName);
    
    //遍历相册中的所有图片
    var albumName = req.params.albumName;
    //具体查询图片业务交给model
    file.getAllImagesByAlbumName(albumName,function(err,imagesArray){
        if(err){
            // res.send(err);
            // res.render("err");
            next();
            return;
        }
        res.render("album",{
            "albumname":albumName,
            "images":imagesArray  //"images":["1.jpg","2.jpg"]
        });
    });
}

//上传
exports.showUp = function(req,res){
    //命令file模块（我们自己写的函数）调用getAllAlbums函数
    //得到所有文件夹名字之后做的事情，写在回调函数里面
    file.getAllAlbums(function(err,albums){
        res.render("up",{
            albums : albums
        });
    });
};

//上传表单
exports.doPost = function(req,res){
    var form = new formidable.IncomingForm();

    form.uploadDir = path.normalize(__dirname + "/../tempup/");

    form.parse(req, function(err, fields, files,next) {
        console.log(fields);
        console.log(files);
        //改名
        if(err){
            next();     //这个中间件不受理这个请求了，往下走
            return;
        }
        //判断文件尺寸
        var size = parseInt(files.tupian.size);
        if(size > 2000000){
            res.send("图片尺寸应该小于100M");
            //删除图片
            fs.unlink(files.tupian.path);
            return;
        }

        var ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
        var ran = parseInt(Math.random() * 89999 + 10000);
        var extname = path.extname(files.tupian.name);

        var wenjianjia = fields.wenjianjia;
        var oldpath = files.tupian.path ;
        var newpath = path.normalize(__dirname + "/../uploads/" + wenjianjia + "/" + ttt + ran + extname);
        fs.rename(oldpath,newpath,function(err){
            if(err){
                res.send("改名失败");
                return;
            }
            res.send("成功");
        });
    });
    return;
}