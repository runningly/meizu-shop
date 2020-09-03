<?php
  include('./conn.php');

  $sql = "select * from product";

  $res = $mysqli->query($sql);

  $mysqli->close();

  $arr = array();
  
  // fetch_assoc() 函数从结果集中取得一行作为关联数组。
  while($row=$res->fetch_assoc()) {
    array_push($arr, $row);
  }

  // json_encode 将对象进行josn编码
  $json = json_encode($arr);

  echo $json;
?>