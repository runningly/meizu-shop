<?php
  include('./conn.php');
  $username = $_REQUEST['username'];

  $sql = "select * from users where username='$username'";
  // 执行sql语句
  $result =  $mysqli->query($sql);

  $mysqli->close();

  if($result->num_rows>0){
    echo '{"has":true,"msg":"用户名已存在","username":"'.$username.'"}';
}else{
    echo '{"has":false,"msg":"用户名可以使用","username":"'.$username.'"}';
}

?>