
var fs = require("fs");

//获取相册文件夹列表
exports.getAllAlbums = function(callback){

    //获取文件夹列表
    fs.readdir( "./uploads",function(err,files){
        if(err){
            callback("没有找到 uploads 文件夹",null);
            return;
        }
        var allAlbums = [];

        //迭代器
        (function iterator(i){
            if( i == files.length ){
                //遍历结束
                console.log(allAlbums);
                // return allAlbums;
                callback(null,allAlbums);
                return;
            }
            fs.stat("./uploads/" + files[i], function(err,stats){
                if(err){
                    callback("找不到文件"+ files[i],null);
                    return;
                }
                if(stats.isDirectory()){
                    allAlbums.push(files[i]);
                }
                iterator(i+1);  //调用自身
            })
        })(0)
    });

    // return ["小猫","小狗","小鸭"];
}


//获取相册内的所有图片
exports.getAllImagesByAlbumName = function(albumName,callback){

    //获取图片列表
    fs.readdir( "./uploads/" + albumName,function(err,files){
        if(err){
            callback("没有找到 "+ albumName +" 文件夹",null);
            return;
        }
        var allImages = [];

        //迭代器
        (function iterator(i){
            if( i == files.length ){
                //遍历结束
                console.log(allImages);
                // return allAlbums;
                callback(null,allImages);
                return;
            }
            fs.stat("./uploads/" + albumName + "/" + files[i], function(err,stats){
                if(err){
                    callback("找不到文件"+ files[i],null);
                    return;
                }
                if(stats.isFile()){
                    allImages.push(files[i]);
                }
                iterator(i+1);  //调用自身
            })
        })(0)
    });


}