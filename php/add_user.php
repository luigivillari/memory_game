 <?php
        include "db.php";
        $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
        $input = json_decode(file_get_contents('php://input'),true);
        $table = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
        $method =  $_SERVER['REQUEST_METHOD']; 
        

    if($method === "POST" && $table ===  "Username"){
        $query = "INSERT INTO Username (user) VALUES (?)";
        $stmt=mysqli_prepare($conn,$query);
        mysqli_stmt_bind_param($stmt,'s',$input['username']);
        mysqli_stmt_execute($stmt);
        if(mysqli_stmt_affected_rows($stmt) > 0){
                echo "ok";
             }

        else{
                echo "error";
            }
        }
    

    ?>



