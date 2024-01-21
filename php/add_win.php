<?php

include "db.php";// Includi il file di connessione al database


$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));// Ottieni i segmenti della richiesta (dopo il nome dello script nella URL)


$input = json_decode(file_get_contents('php://input'), true);// Decodifica i dati JSON provenienti dal corpo della richiesta


$table = preg_replace('/[^a-z0-9_]+/i', '', array_shift($request));// Estrai il nome della tabella dalla richiesta e rimuovi caratteri non consentiti


$method =  $_SERVER['REQUEST_METHOD'];// Ottieni il metodo della richiesta (GET, POST, ecc.)

// Se il metodo è POST e la tabella è "Partite"
if ($method === "POST" && $table === "Partite"){
    // Query per ottenere l'id del giocatore vincitore
    $query_id_w = "SELECT id FROM Username WHERE user = ?";
    $stmt_w = mysqli_prepare($conn, $query_id_w); //Prepara la query
    mysqli_stmt_bind_param($stmt_w, 's', $input['playerw']); //Collega i parametri alla query preparata
    mysqli_stmt_execute($stmt_w); //Esegui la query preparata
    mysqli_stmt_bind_result($stmt_w, $id); // Associa il risultato della query preparata ($stmt_w) alla variabile $id
    
   
    mysqli_stmt_fetch($stmt_w); // Recupera il risultato
   
    mysqli_stmt_close($stmt_w); // Chiudi la query
    
    $id = intval($id);// Converti $id in un intero, se necessario

   
    $query_up = "UPDATE Partite SET vittoria = vittoria + 1 WHERE username_id = ?"; // Query per aggiornare il numero di vittorie del giocatore
    $stmt_up = mysqli_prepare($conn, $query_up); //Prepara la query
    mysqli_stmt_bind_param($stmt_up, 'i', $id); //Collega i parametri alla query preparata
    
    // Esegui la query e gestisci l'esito
    if (mysqli_stmt_execute($stmt_up)) {
        echo "ok";
    } else {
        echo "Error" . mysqli_error($conn);
    }

    // Query per ottenere l'id del giocatore perdente
    $query_id_1 = "SELECT id FROM Username WHERE user = ?";
    $stmt_l = mysqli_prepare($conn, $query_id_1); // Prepara la query
    mysqli_stmt_bind_param($stmt_l, 's', $input['playerl']); //Collega i parametri alla query preparata
    mysqli_stmt_execute($stmt_l); // Esegui la query preparata
    mysqli_stmt_bind_result($stmt_l, $id_l); // Associa il risultato della query preparata ($stmt_1) alla variabile $id_1
    
    
    mysqli_stmt_fetch($stmt_l);// Recupera il risultato
    
    mysqli_stmt_close($stmt_l);// Chiudi la query
    
    $id_l = intval($id_l);// Converti $id_l in un intero, se necessario

    // Query per aggiornare il numero di sconfitte del giocatore
    $query_lose = "UPDATE Partite SET sconfitta = sconfitta + 1 WHERE username_id = ?";
    $stmt_lose = mysqli_prepare($conn, $query_lose); // Prepara la query
    mysqli_stmt_bind_param($stmt_lose, 'i', $id_l); //Collega i parametri alla query preparata
    
    // Esegui la query e gestisci l'esito
    if (mysqli_stmt_execute($stmt_lose)) {
        echo "ok";
    } else {
        echo "Error" . mysqli_error($conn);
    }
}
?>
