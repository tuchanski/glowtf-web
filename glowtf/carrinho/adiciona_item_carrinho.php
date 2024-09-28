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
$user = $_POST["id"];

$sql = "INSERT INTO cart_has_hat (id_cart, id_hat) VALUES ($user, $hatToBeInserted);";

if ($conn->query($sql) === TRUE) {
    echo "Registro atualizado com sucesso.";
} else {
    echo "Erro ao atualizar registro: " . $conn->error;
}

$conn->close();
?>
