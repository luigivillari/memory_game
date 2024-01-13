<?php
include "db.php";

$request = explode('/', trim($_SERVER['PATH_INFO'], '/'));
$input = json_decode(file_get_contents('php://input'), true);
$table = preg_replace('/[^a-z0-9_]+/i', '', array_shift($request));
$method = $_SERVER['REQUEST_METHOD'];

if ($method === "POST" && $table === "Username") {
    $query = "INSERT INTO Username (user) VALUES (?)";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, 's', $input['username']);
    mysqli_stmt_execute($stmt);

    // Verifica se l'inserimento in Username ha avuto successo
    if (mysqli_stmt_affected_rows($stmt) > 0) {
        // Esegui la query per ottenere l'ID appena inserito
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

        // Inserisci l'ID in Partite
        $query2 = "INSERT INTO Partite (username_id) VALUES (?)";
        $stmt2 = mysqli_prepare($conn, $query2);
        mysqli_stmt_bind_param($stmt2, 'i', $id);
        mysqli_stmt_execute($stmt2);

        // Verifica se l'inserimento in Partite ha avuto successo
        if (mysqli_stmt_affected_rows($stmt2) > 0) {
            echo "ok";
        } else {
            echo "error in Partite insertion";
        }
    } else {
        echo "error in Username insertion";
    }

    // Chiudi la query
    mysqli_stmt_close($stmt);
}
?>

