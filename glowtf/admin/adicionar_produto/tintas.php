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
    $paint = "SELECT * from paint";
    $paint_result = $conn->query($paint);

    if ($paint_result->num_rows > 0) {
        $rows = array();
        while ($row = $paint_result->fetch_assoc()) {
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