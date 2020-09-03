<?php
  include('./conn.php');

  // 1.获取提交的数据
  $username = $_REQUEST['username'];
  $password = $_REQUEST['password'];
  // $email = $_REQUEST['email'];
  // $phone = $_REQUEST['phone'];
  // $address = $_REQUEST['address'];
  // $hobby = $_REQUEST['hobby'];

  // 2.判断添加的用户名是否存在
  // 2.1 查询的sql语句
  $sql1 = "select *from users where username='$username' ";
  // 2.2 执行查询语句
  $result1 = $mysqli->query($sql1);
  // 2.3 如果存在
  if($result1->num_rows>0) {
    echo '{"has":false,"msg":"用户名存在","username":"'.$username.'"}';
    // echo "<script>location.href='../reg.html'</script>";

    $mysqli->close();
    die();
  }

  // 3.插入的 sql语句
  $sql2 = "insert into users (username,password) values ('$username','$password')";

  // 3.1执行语句
  $result2 = $mysqli->query($sql2);
  // 3.2关闭数据库
  $mysqli->close();
  // 3.3如果成功
  if($result2) {
    // echo "<script>alert('添加成功')</script>";
    echo '{"has":true,"msg":"注册成功","username":"'.$username.'"}';
    // echo "<script>location.href='../admin.php'</script>";
  }
  else {
    echo '{"has":false,"msg":"注册失败","username":"'.$username.'"}';
  }
?>