var express = require('express');
var app = express();
//var request = require('request');
var mysql = require('mysql');
var fs=require('fs');
var pool = mysql.createPool({
    host     : '110.40.194.38',
    user     : 'root',
    password : '123456',
    database : 'DBmosquitto'
});
//app.use('/','1.html')
app.use('/', express.static('./'));
var server = app.listen(8089,function () {
    console.log("应用实例，访问地址为 http://127.0.0.1:8087")
})
app.get('/cx', function (req, res) {
    res.header("Access-Control-Allow-Origin","*");
    pool.getConnection(function(err, connection){
        //let sqlstr="select * from bookoperation";
        let sqlstr="select * from mqtt_data";
        //let sqlval=[req.query.idcard,req.query.tel,req.query.pwd,req.query.banknum,req.query.name,req.query.name,req.query.money];
        connection.query(sqlstr,function(err,rows){
            if(err){
                throw err;
            }else{
                console.log(rows);
                res.send(rows);
            }
            connection.release();
        });
    });   
})
app.get('/cx1', function (req, res) {
    res.header("Access-Control-Allow-Origin","*");
    pool.getConnection(function(err, connection){
        //let sqlstr="select * from bookoperation";
        let sqlstr="show tables";
        //let sqlval=[req.query.idcard,req.query.tel,req.query.pwd,req.query.banknum,req.query.name,req.query.name,req.query.money];
        connection.query(sqlstr,function(err,rows){
            if(err){
                throw err;
            }else{
                console.log(rows);
                res.send(rows);
            }
            connection.release(); 
        });
    });   
})
app.get('/cx2', function (req, res) {
    res.header("Access-Control-Allow-Origin","*");
    pool.getConnection(function(err, connection){
        let sqlstr="select * from "+req.query.val;
        console.log(req.query.val);
        //let sqlval=[req.query.val];
        //let sqlval=[req.query.idcard,req.query.tel,req.query.pwd,req.query.banknum,req.query.name,req.query.name,req.query.money];
        connection.query(sqlstr,function(err,rows){
            if(err){
                throw err;
            }else{
                console.log(rows);
                res.send(rows);
            }
            connection.release(); 
        });
    });   
})