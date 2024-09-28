<?php
$host = "localhost";
$port = "3307";
$usuario = "root";
$senha = ""; 
$banco = "glowtfdb";

$conn = new mysqli($host, $usuario, $senha, $banco, $port);

$cart_has_hat_id = $_GET['cart_has_hat_id'];

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
} else {
    $sql = "SELECT cart_has_hat.id AS cart_has_hat_id,
    cart_has_hat.id_cart AS cart_id,
    hat.id AS hat_id, hat.inventory AS hat_inventory,
    hat.price AS hat_price, hat.promo_image AS hat_promo_image,
    hat.name AS hat_name, hat.description AS hat_description,
    paint.paint_id AS paint_id, paint.name AS paint_name, 
    paint.promo_image AS paint_promo_image, paint.hex_color AS hex_color
    FROM cart_has_hat
    LEFT JOIN hat ON cart_has_hat.id_hat = hat.id
    LEFT JOIN paint ON hat.paint_id = paint.paint_id
    WHERE cart_has_hat.id = $cart_has_hat_id;";

    $result = $conn->query($sql);
   
    if ($result->num_rows > 0) {
        $rows = array();
        while($row = $result->fetch_assoc()) {
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