<?php

include 'db.php'; // Includi il file di connessione al database


$method = $_SERVER['REQUEST_METHOD']; // Ottieni il metodo della richiesta (GET, POST, ecc.)


$request = explode('/', trim($_SERVER['PATH_INFO'], '/'));// Ottieni i segmenti della richiesta (dopo il nome dello script nella URL)


$table = preg_replace('/[^a-z0-9_]+/i', '', array_shift($request));// Estrai il nome della tabella dalla richiesta e rimuovi caratteri non consentiti

// Se il metodo è GET e la tabella è "Partite"
if ($method === "GET" && $table === "Partite") {
    // Query per ottenere le prime 10 righe dalla tabella 'Partite' con informazioni correlate da 'Username'
    $query = "SELECT u.user, p.vittoria, p.sconfitta FROM Username u, Partite p WHERE u.id = p.username_id ORDER BY p.vittoria DESC LIMIT 10";

    
    $stmt = mysqli_prepare($conn, $query);// Prepara la query
    
    mysqli_stmt_execute($stmt);// Esegui la query preparata
    
    $result = mysqli_stmt_get_result($stmt);// Ottieni il risultato della query

    
    $array = [];// Inizializza un array per contenere i risultati della query

    // Itera attraverso i risultati e aggiungi ciascuna riga all'array
    while ($row = mysqli_fetch_assoc($result)) {
        $array[] = $row;
    }

   
    $json = json_encode($array); // Converti l'array in formato JSON

    
    echo $json;// Stampa il risultato JSON
}
?>
