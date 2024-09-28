<?php
session_start();
date_default_timezone_set('America/Sao_Paulo');

if (isset($_POST['submit']) && !empty($_POST['nome']) && !empty($_POST['email']) && !empty($_POST['cpf']) && !empty($_POST['genero']) && !empty($_POST['estado']) && !empty($_POST['senha']) && !empty($_POST['steam']) && !empty($_POST['confirma-senha'])) {
    include_once('config.php');
    
    $nome = mysqli_real_escape_string($conn, $_POST['nome']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $cpf = mysqli_real_escape_string($conn, $_POST['cpf']);
    $genero = mysqli_real_escape_string($conn, $_POST['genero']);
    $estado = mysqli_real_escape_string($conn, $_POST['estado']);
    $senha = mysqli_real_escape_string($conn, $_POST['senha']);
    $confirma_senha = mysqli_real_escape_string($conn, $_POST['confirma-senha']);
    $steam = mysqli_real_escape_string($conn, $_POST['steam']);

    if ($senha !== $confirma_senha) {
        $_SESSION['cadastro_status'] = 'senha_diferente';
        header('Location: cadastro.html?cadastro_status=senha_diferente');
        exit();
    }

    if (!preg_match('/^\d{11}$/', $cpf)) {
        $_SESSION['cadastro_status'] = 'cpf_invalido';
        header('Location: cadastro.html?cadastro_status=cpf_invalido');
        exit();
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['cadastro_status'] = 'email_invalido';
        header('Location: cadastro.html?cadastro_status=email_invalido');
        exit();
    }

    if (!preg_match('/^\d{17}$/', $steam)) {
        $_SESSION['cadastro_status'] = 'steam_invalido';
        header('Location: cadastro.html?cadastro_status=steam_invalido');
        exit();
    }

    if (strlen($nome) < 3) {
        $_SESSION['cadastro_status'] = 'nome_curto';
        header('Location: cadastro.html?cadastro_status=nome_curto');
        exit();
    }

    $sql = "SELECT * FROM user WHERE email = '$email' OR cpf = '$cpf'";
    $result = $conn->query($sql);

    if (mysqli_num_rows($result) < 1) {
        $adicionaUsuario = mysqli_query($conn, "INSERT INTO user (name, gender, state, cpf, email, password, admin, id_steam) VALUES ('$nome', '$genero', '$estado', '$cpf', '$email', '$senha', 0, '$steam')");
        
        if ($adicionaUsuario) {
            $idUsuario = mysqli_insert_id($conn);

            $dataAtual = date('Y-m-d H:i:s');
            $adicionaCarrinho = mysqli_query($conn, "INSERT INTO cart (id_user, date) VALUES ('$idUsuario', '$dataAtual')");

            $adicionaWishlist = mysqli_query($conn, "INSERT INTO wishlist (id_user) VALUES ('$idUsuario')");

            $_SESSION['cadastro_status'] = 'sucesso';
            header('Location: ../login/login.html?cadastro_status=sucesso');
        } else {
            $_SESSION['cadastro_status'] = 'erro_insercao';
            header('Location: cadastro.html?cadastro_status=erro_insercao');
        }

        exit();
    } else {
        $_SESSION['cadastro_status'] = 'erro';
        header('Location: cadastro.html?cadastro_status=erro');
        exit();
    }
} else {
    header('Location: cadastro.html');
    exit();
}
?>
