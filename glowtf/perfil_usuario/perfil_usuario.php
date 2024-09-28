<?php
$host = "localhost";
$port = "3307";
$usuario = "root";
$senha = "";
$banco = "glowtfdb";

$conn = new mysqli($host, $usuario, $senha, $banco, $port);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
} else {

    $user = $_POST["id"];
    
    $sql = "SELECT sale.id as sale_id, sale.date as sale_date, sale.id_user, sale.id_coupon, sale.price as sale_price,
    sale_has_hat.id as sale_has_hat_id, sale_has_hat.id_hat, sale_has_hat.price as hat_price,
    hat.name as hat_name, hat.description as hat_description, hat.promo_image as hat_promo_image, hat.id as hat_id,
    paint.name as paint_name, paint.promo_image as paint_promo_image, paint.hex_color
    FROM sale 
    LEFT JOIN sale_has_hat ON sale_has_hat.id_sale = sale.id
    LEFT JOIN hat ON hat.id = sale_has_hat.id_hat
    LEFT JOIN paint ON paint.paint_id = hat.paint_id
    WHERE sale.id_user = $user
    ORDER BY sale.date DESC;";

    $result= $conn->query($sql);
   
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
