<?php

include 'db.php';


$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'], '/'));
$table = preg_replace('/[^a-z0-9_]+/i', '', array_shift($request));
$input = json_decode(file_get_contents('php://input'), true);


if($method =="GET" && $table=="Username"){
    $query = "SELECT user FROM Username";
    $stmt = mysqli_prepare($conn,$query);
    mysqli_stmt_execute($stmt);
    $result=mysqli_stmt_get_result($stmt);

    $array = [];

    while($row = mysqli_fetch_assoc($result)){
        $array[] = $row;
    }
    $json = json_encode($array);
    echo $json;
}
if($method =="DELETE" && $table=="Username"){

    $query1 = "SELECT id FROM Username WHERE user = ? ";
    $stmt1 = mysqli_prepare($conn, $query1);
    mysqli_stmt_bind_param($stmt1, 's', $input['username']);
    mysqli_stmt_execute($stmt1);
    mysqli_stmt_bind_result($stmt1, $id);
    // Recupera il risultato
    mysqli_stmt_fetch($stmt1);
    // Chiudi la query
    mysqli_stmt_close($stmt1);
    // Converti $id in un intero, se necessario
    $id = intval($id);


    $query2 = "DELETE FROM Partite WHERE username_id = ?";
    $stmt2 = mysqli_prepare($conn, $query2);
    mysqli_stmt_bind_param($stmt2, 'i', $id);
    mysqli_stmt_execute($stmt2);

    if (mysqli_stmt_affected_rows($stmt2) > 0) {

        $query3 = "DELETE FROM Username WHERE id = ? ";
        $stmt3 = mysqli_prepare($conn, $query3);
        mysqli_stmt_bind_param($stmt3, 'i', $id);

        if (mysqli_stmt_execute($stmt3)){
            echo "ok";
        }
        else{
            echo "error";
        }

    }
    else{
        echo "error delete from partite";
    }
}


?>