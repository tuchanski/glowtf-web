<?php
$host = "localhost:3307";
$usuario = "root";
$senha = "";
$banco = "glowtfdb";

$conn = new mysqli($host, $usuario, $senha, $banco);
$hat_id = $_GET['hat_id'];


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
    $sql = "SELECT
                hat.id AS hat_id,
                hat.name AS hat_name,
                hat.inventory,
                hat.price,
                hat.promo_image AS hat_promo_image,
                hat.description,
                hat.wiki,
                paint.paint_id,
                paint.name AS paint_name,
                paint.promo_image AS paint_promo_image,
                paint.hex_color,
                hat_has_class.class_id,
                class.class_name
            FROM
                hat
            LEFT JOIN
                paint ON hat.paint_id = paint.paint_id
            LEFT JOIN
                hat_has_class ON hat.id = hat_has_class.hat_id
            LEFT JOIN
                class ON hat_has_class.class_id = class.class_id
            WHERE
                hat.id = '$hat_id'
            LIMIT 1;";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        header('Content-Type: application/json');
        echo json_encode($result->fetch_object());
    } else {
        echo json_encode([]);
    }
}
$conn->close();
?>