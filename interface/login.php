<?php
    include('./conn.php');

    // 登录
    // 1.接受前端数据

    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];

    // sql 语句
    $sql = "select * from users where username='$username' and password='$password'";

    // 执行语句
    $result = $mysqli->query($sql);

    // 关闭数据库
    $mysqli->close();

    if($result->num_rows>0) { // 如果查询到的结果大于一行

      // 登录成功
      $row = $result->fetch_assoc(); // 获取一行数据，返回一个关联数组

      // setcookie(key,value,time,path)  php 的cookie设置
      // php 获得当前时间 time()
      setcookie('username', $row['username'],time()+3600*24,'/');
      setcookie('isLogined','true',time()+3600*24,'/');

     echo '{"has":true,"msg":"登录成功","username":"'.$username.'"}';
      // if($row['username'] === 'admin') {
      //   echo '<script>location.href="../admin.php"</script>';
      // }
      
    }else {
      // 登录失败
      echo '{"has":false,"msg":"登录失败,账号或密码错误","username":"'.$username.'"}';
      // echo '<script>location.href="../login.html"</script>';
    }

?>