<?php
// Istruzione per includere il Database
include 'db.php';

// Ottieni il metodo della richiesta (GET, POST, ecc.)
$method = $_SERVER['REQUEST_METHOD'];

// Ottieni i segmenti della richiesta (dopo il nome dello script nella URL)
$request = explode('/', trim($_SERVER['PATH_INFO'], '/'));
// Estrai il nome della tabella dalla richiesta e rimuovi caratteri non consentiti
$table = preg_replace('/[^a-z0-9_]+/i', '', array_shift($request));

// Verifica se il metodo è GET e la tabella richiesta è "Username"
if ($method == "GET" && $table == "Username") {
    // Costruisci la query SQL per selezionare la colonna 'user' dalla tabella 'Username'
    $query = "SELECT user FROM Username";
    
    // Prepara la query
    $stmt = mysqli_prepare($conn, $query);
    
    // Esegui la query preparata
    mysqli_stmt_execute($stmt);
    
    // Ottieni il risultato della query
    $result = mysqli_stmt_get_result($stmt);

    // Inizializza un array per contenere i risultati della query
    $array = [];

    // Itera attraverso i risultati e aggiungi ciascuna riga all'array
    while ($row = mysqli_fetch_assoc($result)) {
        $array[] = $row;
    }

    // Converti l'array in formato JSON
    $json = json_encode($array);

    // Stampa il risultato JSON
    echo $json;
}
?>


