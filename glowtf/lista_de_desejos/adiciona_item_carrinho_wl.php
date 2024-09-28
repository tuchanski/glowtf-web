<?php
$host = "localhost";
$port = "3307";
$usuario = "root";
$senha = "";
$banco = "glowtfdb";

$conn = new mysqli($host, $usuario, $senha, $banco, $port);

if ($conn->connect_error) {
    die("Erro na conexão com o banco de dados: " . $conn->connect_error);
}

$hatToBeInserted = $_POST['hat_id']; 
$cart_id = $_POST['id_user']; 

$sql = "INSERT INTO cart_has_hat (id_cart, id_hat) VALUES ('$cart_id', '$hatToBeInserted')";
if ($conn->query($sql) === TRUE) {
    echo "Registro inserido com sucesso.";
} else {
    echo "Erro ao inserir registro: " . $conn->error;
}

$conn->close();
?>