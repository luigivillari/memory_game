<?php

include 'db.php';


$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'], '/'));
$table = preg_replace('/[^a-z0-9_]+/i', '', array_shift($request));

if ($method === "GET" && $table === "Partite"){

    $query = "SELECT u.user, p.vittoria, p.sconfitta FROM Username u,Partite p WHERE u.id = p.username_id ORDER BY p.vittoria DESC LIMIT 10";

    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $array=[];
    while($row = mysqli_fetch_assoc($result)){
        $array[] = $row;
    }
 
         
         
     }
 
    $json = json_encode($array);
    echo $json;
  

?>