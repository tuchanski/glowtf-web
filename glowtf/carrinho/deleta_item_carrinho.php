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

$hatToBeDeleted = $_POST['cart_has_hat_id']; 

$sql = "DELETE FROM cart_has_hat WHERE id = $hatToBeDeleted";
if ($conn->query($sql) === TRUE) {
    echo "Registro deletado com sucesso.";
} else {
    echo "Erro ao deletar registro: " . $conn->error;
}

$conn->close();
?>