<?php
  include('./conn.php');
  // 根据发送过来的 id来查询数据

  $id = $_REQUEST['id'];

  $sql = "select * from product where id='$id'";

  $res = $mysqli->query($sql);

  $mysqli->close();

// fetch_assoc() 函数从结果集中取得一行作为关联数组。
  $row = $res->fetch_assoc();

  // json_encode 将对象进行josn编码
  $json = json_encode($row);

  echo $json;
?>