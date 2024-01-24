<?php

include 'db.php';// Includi il file di connessione al database


$method = $_SERVER['REQUEST_METHOD'];// Ottieni il metodo della richiesta (GET, DELETE, ecc.)


$request = explode('/', trim($_SERVER['PATH_INFO'], '/'));// Ottieni i segmenti della richiesta (dopo il nome dello script nella URL)


$table = preg_replace('/[^a-z0-9_]+/i', '', array_shift($request));// Estrai il nome della tabella dalla richiesta e rimuovi caratteri non consentiti


$input = json_decode(file_get_contents('php://input'), true);// Decodifica i dati JSON provenienti dal corpo della richiesta

// Se il metodo è GET e la tabella è "Username"
if ($method == "GET" && $table == "Username") {
    // Costruisci la query SQL per selezionare la colonna 'user' dalla tabella 'Username'
    $query = "SELECT user FROM Username";
    $stmt = mysqli_prepare($conn, $query);//Prepara la query
    mysqli_stmt_execute($stmt);//Esegui la query
    $result = mysqli_stmt_get_result($stmt); // Ottieni i risultati della query 

    // Inizializza un array per contenere i risultati della query
    $array = [];

    // Itera attraverso i risultati e aggiungi ciascuna riga all'array
    while ($row = mysqli_fetch_assoc($result)) {
        $array[] = $row;
    }

    
    $json = json_encode($array);// Converti l'array in formato JSON

   
    echo $json; // Stampa il risultato JSON
}

// Se il metodo è DELETE e la tabella è "Username"
if ($method == "DELETE" && $table == "Username") {
    // Query per selezionare l'id corrispondente all'username fornito
    $query1 = "SELECT id FROM Username WHERE user = ?";
    $stmt1 = mysqli_prepare($conn, $query1);//Prepara la query
    mysqli_stmt_bind_param($stmt1, 's', $input['username']);// Collega i parametri alla query preparata
    mysqli_stmt_execute($stmt1);//Esegui la query
    mysqli_stmt_bind_result($stmt1, $id); // Associa il risultato della query preparata ($stmt1) alla variabile $id

    mysqli_stmt_fetch($stmt1);// Recupera il risultato
    mysqli_stmt_close($stmt1);// Chiudi la query
    $id = intval($id); // Converti $id in un intero, se necessario
    // Query per eliminare le righe corrispondenti nella tabella 'Partite'
    $query2 = "DELETE FROM Partite WHERE username_id = ?";
    $stmt2 = mysqli_prepare($conn, $query2);//Prepara la query
    mysqli_stmt_bind_param($stmt2, 'i', $id);// Collega i parametri alla query preparata
    mysqli_stmt_execute($stmt2);//Esegui la query

    // Verifica se sono state eliminate righe da 'Partite'
    if (mysqli_stmt_affected_rows($stmt2) > 0) {
        // Query per eliminare l'utente dalla tabella 'Username'
        $query3 = "DELETE FROM Username WHERE id = ? ";
        $stmt3 = mysqli_prepare($conn, $query3);//Prepara la query
        mysqli_stmt_bind_param($stmt3, 'i', $id);// Collega i parametri alla query preparata

        // Esegui la query e verifica se l'eliminazione è avvenuta con successo
        if (mysqli_stmt_execute($stmt3)) {
            echo "ok";
        } else {
            echo "error";
        }
    } else {
        echo "error delete from partite";
    }
}
?>
