<?php
$host = "localhost:3307";
$usuario = "root";
$senha = "";
$banco = "glowtfdb";

$conn = new mysqli($host, $usuario, $senha, $banco);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}
function isInteger($input)
{
    return ctype_digit(strval($input));
}

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
} else {
    $class = "SELECT * from class";
    $result = $conn->query($class);

    if ($result->num_rows > 0) {
        $rows = array();
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        header('Content-Type: application/json');
        echo json_encode($rows);
    } else {
        echo json_encode([]);
    }
}
$conn->close();
?>