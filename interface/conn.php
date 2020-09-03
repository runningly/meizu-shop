<?php

header('content-type:text/html;charset=utf-8');

$mysql_conf = array(
    'host'=>'localhost:3306', // 地址  mysql默认端口3306
    'db_user'=>'root',  // 用户名
    'db_pass'=>'root', // 密码
    'db'=>'h5-2006' // 数据库名
);

// 链接数据库 
// mysqli  登录数据库
$mysqli = @new mysqli($mysql_conf['host'],$mysql_conf['db_user'],$mysql_conf['db_pass']);

// 判断是否链接成功 
// 没有链接成功则终止代码执行
if($mysqli->connect_errno){
    // die() 函数 终止代码执行
    die('链接错误'.$mysqli->connect_errno);
}

// 设置查询字符集
$mysqli->query('set names utf8');

// 选择数据库
$select_db = $mysqli->select_db($mysql_conf['db']);

if(!$select_db){
    die('数据库选择错误'.$mysqli->error);
}

?>