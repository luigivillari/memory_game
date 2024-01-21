<?php
                    
include 'db.php';// Istruzione per includere il Database


$method = $_SERVER['REQUEST_METHOD'];// Ottieni il metodo della richiesta (GET, POST, ecc.)
$request = explode('/', trim($_SERVER['PATH_INFO'], '/')); // Ottieni i segmenti della richiesta (dopo il nome dello script nella URL)
$table = preg_replace('/[^a-z0-9_]+/i', '', array_shift($request));// Estrai il nome della tabella dalla richiesta e rimuovi caratteri non consentiti
$input = json_decode(file_get_contents('php://input'), true); // Decodifica i dati JSON inviati tramite la richiesta HTTP POST e li assegna alla variabile $input

// Verifica se il metodo è PUT e la tabella richiesta è "Username"
if ($method =="PUT" && $table = "Username" ){
    $query = "UPDATE Username SET user = ? WHERE user = ?"; // Costruisci la query SQL per selezionare la colonna 'user' dalla tabella 'Username'
    $stmt = mysqli_prepare($conn,$query);    // Prepara la query
    mysqli_stmt_bind_param($stmt, 'ss', $input['new'],$input['username']);// Collega i parametri alla query preparata
    if(mysqli_stmt_execute($stmt)){//Effettua un controllo sulla query eseguita per stampare un messaggio di conferma o di errore
        echo 'ok';
    }
    else{
        mysqli_error($conn);
        echo 'error';
    }

    
    

}



?>