<?php
$host = "localhost";
$port = "3307";
$user = "root"; 
$password = "";
$dbname = "glowtfdb";

$conn = new mysqli($host, $user, $password, $dbname, $port);

if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit;
}

$id = $_POST['id'];

$stmt = $conn->prepare("SELECT * FROM user WHERE id = ?");
if (!$stmt) {
    echo json_encode(["error" => "Prepare statement failed: " . $conn->error]);
    exit;
}

$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

$data = $result->fetch_all(MYSQLI_ASSOC);
echo json_encode($data);

$stmt->close();
$conn->close();
?>
