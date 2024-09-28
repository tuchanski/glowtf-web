<?php
$host = "localhost:3307";
$user = "root"; 
$password = "";
$dbname = "glowtfdb";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit;
}

$name = $_POST['nome'];
$pass = $_POST['senha'];

$stmt = $conn->prepare("SELECT * FROM user WHERE (name = ? OR email = ?) AND password = ?");
$stmt->bind_param("sss", $name, $name, $pass);
$stmt->execute();
$result = $stmt->get_result();

$data = $result->fetch_all(MYSQLI_ASSOC);
echo json_encode($data);

$stmt->close();
$conn->close();
?>
