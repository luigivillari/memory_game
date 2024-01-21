<?php 
 $servername="172.17.0.2";
 $username="root";
 $password="root";
 $dbname="Memory";

 //Creazione connessione
 $conn= mysqli_connect($servername,$username,$password,$dbname) or die ("Couldn't connect");
 //Controllo connessione
 if($conn->connect_error){
     die("Connection error: " . $conn->connect_error);
 }
?>
