<?php

include 'db.php';


$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'], '/'));
$table = preg_replace('/[^a-z0-9_]+/i', '', array_shift($request));
$input = json_decode(file_get_contents('php://input'), true);


if ($method =="PUT" && $table = "Username" ){
    $query = "UPDATE Username SET user = ? WHERE user = ?";
    $stmt = mysqli_prepare($conn,$query);
    mysqli_stmt_bind_param($stmt, 'ss', $input['new'],$input['username']);
    if(mysqli_stmt_execute($stmt)){
        echo 'ok';
    }
    else{
        mysqli_error($conn);
        echo 'error';
    }

    
    

}



?>