<?php

include "db.php";// Includi il file di connessione al database


$request = explode('/', trim($_SERVER['PATH_INFO'], '/'));// Ottieni i segmenti della richiesta (dopo il nome dello script nella URL)


$input = json_decode(file_get_contents('php://input'), true);// Decodifica i dati JSON provenienti dal corpo della richiesta


$table = preg_replace('/[^a-z0-9_]+/i', '', array_shift($request));// Estrai il nome della tabella dalla richiesta e rimuovi caratteri non consentiti


$method = $_SERVER['REQUEST_METHOD'];// Ottieni il metodo della richiesta (GET, POST, ecc.)

// Se il metodo è POST e la tabella è "Username"
if ($method === "POST" && $table === "Username") {
    // Query per inserire un nuovo utente nella tabella 'Username'
    $query = "INSERT INTO Username (user) VALUES (?)";
    $stmt = mysqli_prepare($conn, $query);// Prepara la query
    mysqli_stmt_bind_param($stmt, 's', $input['username']);// Collega i parametri alla query preparata
    mysqli_stmt_execute($stmt);// Esegui la query preparata

    // Verifica se l'inserimento in 'Username' ha avuto successo
    if (mysqli_stmt_affected_rows($stmt) > 0) {
        // Esegui la query per ottenere l'ID appena inserito
        $query1 = "SELECT id FROM Username WHERE user = ? ";
        $stmt1 = mysqli_prepare($conn, $query1);//Prepara la query
        mysqli_stmt_bind_param($stmt1, 's', $input['username']);// Collega i parametri alla query preparata
        mysqli_stmt_execute($stmt1);//Esegui la query preparata
        mysqli_stmt_bind_result($stmt1, $id);// Associa il risultato della query preparata ($stmt1) alla variabile $id

        
        mysqli_stmt_fetch($stmt1);// Recupera il risultato

        
        mysqli_stmt_close($stmt1);// Chiudi la query

        
        $id = intval($id);// Converti $id in un intero, se necessario

        
        $query2 = "INSERT INTO Partite (username_id) VALUES (?)";// Inserisci l'ID in 'Partite'
        $stmt2 = mysqli_prepare($conn, $query2);//Prepara la query
        mysqli_stmt_bind_param($stmt2, 'i', $id);// Collega i parametri alla query preparata
        mysqli_stmt_execute($stmt2);//Esegui la query preparata

        // Verifica se l'inserimento in 'Partite' ha avuto successo
        if (mysqli_stmt_affected_rows($stmt2) > 0) {
            echo "ok";
        } else {
            echo "error in Partite insertion";
        }
    } else {
        echo "error in Username insertion";
    }

    
    mysqli_stmt_close($stmt);// Chiudi la query
}
?>
