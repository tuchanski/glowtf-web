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

$user_id = $_POST['user_id'];
$hat_id = $_POST['hat_id'];
$action = $_POST['action'];
$sql = "";

if ($action == "a") {
    $sql = "INSERT INTO wishlist_has_hat (id_wishlist, id_hat) 
    VALUES ($user_id, $hat_id);";
}
else{
    $sql = "DELETE FROM wishlist_has_hat WHERE id_wishlist = $user_id AND id_hat = $hat_id;";
}

if ($conn->query($sql) === TRUE) {
    echo "Lista de desejos modificada com sucesso";
} else {
    echo "Erro ao modificar chapéu à lista de desejos: " . $conn->error;
}

$conn->close();
?>
