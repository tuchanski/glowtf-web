<?php
header('Content-Type: application/json');

$host = "localhost";
$port = "3307";
$usuario = "root";
$senha = "";
$banco = "glowtfdb";

$conn = new mysqli($host, $usuario, $senha, $banco, $port);

if ($conn->connect_error) {
    die("Erro na conexão com o banco de dados: " . $conn->connect_error);
}

$user_id = $conn->real_escape_string($_POST['user_id']);

$sql = "SELECT id_hat FROM cart_has_hat WHERE id_cart = '$user_id'";

$result = $conn->query($sql);

$hat_ids = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $hat_ids[] = $row['id_hat'];
    }
}

echo json_encode($hat_ids);

$conn->close();
?>