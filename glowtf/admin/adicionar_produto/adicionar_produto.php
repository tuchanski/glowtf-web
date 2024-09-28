<?php
$host = "localhost:3307";
$usuario = "root"; 
$senha = "";
$banco = "glowtfdb";

$conn = new mysqli($host, $usuario, $senha, $banco);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}
function isInteger($input) {
    return ctype_digit(strval($input));
}

$productName = isset($_POST['nome-produto']) ? $_POST['nome-produto'] : '';
$productPrice = isset($_POST['preco-produto']) ? $_POST['preco-produto'] : '';
$inventory = isset($_POST['estoque']) ? $_POST['estoque'] : '';
$description = isset($_POST['descricao']) ? $_POST['descricao'] : '';
$productWiki = isset($_POST['wiki-produto']) ? $_POST['wiki-produto'] : '';
$hatClass = isset($_POST['classe']) ? $_POST['classe'] : '';
$paint = isset($_POST['tinta']) ? $_POST['tinta'] : '';
$productImage = isset($_FILES['upload-imagem']) ? $_FILES['upload-imagem'] : null;
$imageName = $productImage['name'];
$wikiRegex = "/^https:\/\/wiki\.teamfortress\.com\/.*$/";

if (empty($productName) || 
    empty($productPrice) || 
    empty($inventory) || 
    empty($description) || 
    empty($productWiki) || 
    empty($hatClass)) {

    echo "Preencha todos os campos!";
} elseif (!isInteger($inventory)) {
    echo "Insira apenas números inteiros no estoque do produto.";
} elseif (strlen($productName) < 3) {
    echo "O nome precisa ter no mínimo três caracteres.";
} elseif (strlen($description) < 20) {
    echo "A descrição precisa ter no mínimo 20 caracteres.";
} elseif (!preg_match($wikiRegex, $productWiki)) {
    echo "O link precisa ser da wiki do produto.";
} else {
    $pastaUpload = '../../dados/imagens/itens_do_jogo/';
    $uploadArquivo = $pastaUpload . basename($productImage['name']);

    if (move_uploaded_file($productImage['tmp_name'], $uploadArquivo)) {
        $sql = "INSERT INTO hat (inventory, price, promo_image, name, paint_id, description, wiki) VALUES ('$inventory', '$productPrice', '$imageName', '$productName', '$paint', '$description', '$productWiki')";

        if ($conn->query($sql) === TRUE) {
            echo "Produto inserido com sucesso!\n";
        } else {
            echo "Erro ao inserir novo produto." . $conn->error;
            
        }
    } else {
        echo "Falha no upload da imagem.";
    }

}
 
$conn->close();
?>
 