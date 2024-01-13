<?php 
 $servername="172.17.0.2";
 $username="root";
 $password="root";
 $dbname="Memory";

 //create connection
 $conn= mysqli_connect($servername,$username,$password,$dbname) or die ("Couldn't connect");
 //mysqli_select_db($conn,$dbname);
 //check connection
 if($conn->connect_error){
     die("Connection error: " . $conn->connect_error);
 }
?>
