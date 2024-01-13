<?php
    include "db.php";
    $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
    $input = json_decode(file_get_contents('php://input'),true);
    $table = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
    $method =  $_SERVER['REQUEST_METHOD'];
    
    
    if ($method === "POST" && $table === "Partite"){

        $query_id_w = "SELECT id FROM Username WHERE user = ?";
        $stmt_w=mysqli_prepare($conn,$query_id_w);
        mysqli_stmt_bind_param($stmt_w,'s',$input['playerw']);
        mysqli_stmt_execute($stmt_w);
        mysqli_stmt_bind_result($stmt_w, $id);
        // Recupera il risultato
        mysqli_stmt_fetch($stmt_w);
        // Chiudi la query
        mysqli_stmt_close($stmt_w);
        // Converti $id in un intero, se necessario
        $id = intval($id);
        $query_up = "UPDATE Partite SET vittoria = vittoria + 1 WHERE username_id = ?";
        $stmt_up=mysqli_prepare($conn,$query_up);
        mysqli_stmt_bind_param($stmt_up,'i',$id);
        if (mysqli_stmt_execute($stmt_up)) {
            echo "ok";
        } else {
            echo "Error" . mysqli_error($conn);
        }


        $query_id_1 = "SELECT id FROM Username WHERE user = ?";
        $stmt_l=mysqli_prepare($conn,$query_id_1);
        mysqli_stmt_bind_param($stmt_l,'s',$input['playerl']);
        mysqli_stmt_execute($stmt_l);
        mysqli_stmt_bind_result($stmt_l, $id_l);
        // Recupera il risultato
        mysqli_stmt_fetch($stmt_l);
        // Chiudi la query
        mysqli_stmt_close($stmt_l);
        // Converti $id in un intero, se necessario
        $id_l= intval($id_l);
        $query_lose = "UPDATE Partite SET sconfitta = sconfitta + 1 WHERE username_id = ?";
        $stmt_lose=mysqli_prepare($conn,$query_lose);
        mysqli_stmt_bind_param($stmt_lose,'i',$id_l);
        if (mysqli_stmt_execute($stmt_lose)) {
            echo "ok";
        } else {
            echo "Error" . mysqli_error($conn);
        }
        
    }

?>