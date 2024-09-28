<?php

session_start();
date_default_timezone_set('America/Sao_Paulo');

if (!empty($_POST['meio_pagamento']) && !empty($_POST['hat_price']) && !empty($_POST['user_id']) && !empty($_POST['hat_id'])) {
    include_once('config.php');

    $meio_pagamento_full = $_POST['meio_pagamento'];
    $cart_has_hat_id = $_POST['cart_has_hat_id'];
    $preco_chapeu = $_POST['hat_price'];
    $usuario = $_POST['user_id'];
    $id_chapeu = $_POST['hat_id'];
    $dataAtual = date('Y-m-d');
    $cupom = isset($_POST['cupom']) ? $_POST['cupom'] : '';

    $meio_pagamento_map = [
        'Pix' => 'p',
        'Debito' => 'd',
        'Credito' => 'c',
        'Boleto' => 'b'
    ];

    if (array_key_exists($meio_pagamento_full, $meio_pagamento_map)) {
        $meio_pagamento = $meio_pagamento_map[$meio_pagamento_full];
    } else {
        echo "Meio de pagamento inválido.";
        exit;
    }

    $meio_pagamento = mysqli_real_escape_string($conn, $meio_pagamento);
    $preco_chapeu = mysqli_real_escape_string($conn, $preco_chapeu);
    $usuario = mysqli_real_escape_string($conn, $usuario);
    $id_chapeu = mysqli_real_escape_string($conn, $id_chapeu);
    $cupom = mysqli_real_escape_string($conn, $cupom);

    $cupom_id = "NULL"; 
    $discount = 0;

    if (!empty($cupom)) {
        $query_cupom = "SELECT * FROM coupons WHERE code_name = '$cupom' AND start_date <= '$dataAtual' AND expiration_date >= '$dataAtual' AND uses >= 0";
        $result_cupom = mysqli_query($conn, $query_cupom);

        if (mysqli_num_rows($result_cupom) > 0) {
            $cupom_data = mysqli_fetch_assoc($result_cupom);
            $discount = $cupom_data['discount'];
            $uses = $cupom_data['uses'];
            $cupom_id = $cupom_data['id'];

            $preco_chapeu = $preco_chapeu - ($preco_chapeu * ($discount / 100));

            $new_uses = $uses - 1;
            $query_update_cupom = "UPDATE coupons SET uses = '$new_uses' WHERE code_name = '$cupom'";
            mysqli_query($conn, $query_update_cupom);
        } else {
            $mensagem = "Cupom inválido.";
            echo "<script type='text/javascript'>
                    alert('$mensagem');
                    setTimeout(function() {
                        window.location.href = '../pagamento/pagamento.html?user=$usuario&cart_has_hat_id=$cart_has_hat_id';
                    }, 100); 
                  </script>";
            exit;
        }
    }

    $query = "INSERT INTO sale (date, id_user, id_coupon, price, payment_method) VALUES ('$dataAtual', '$usuario', $cupom_id, '$preco_chapeu', '$meio_pagamento')";

    $result = mysqli_query($conn, $query);

    if ($result) {
        $sale_id = mysqli_insert_id($conn); 

        $query_hat = "INSERT INTO sale_has_hat (id_sale, id_hat, price) VALUES ('$sale_id', '$id_chapeu', '$preco_chapeu')";
        $result_hat = mysqli_query($conn, $query_hat);

        if ($result_hat) {
            $query_delete = "DELETE FROM wishlist_has_hat WHERE id_wishlist = '$usuario' AND id_hat = '$id_chapeu'";
            $result_delete = mysqli_query($conn, $query_delete);

            if ($result_delete) {
                if ($meio_pagamento_full === 'Pix') {
                    header("Location: pix.html?user=$usuario");
                    exit();
                } else {
                    $mensagem = "Compra efetuada com sucesso!";
                    echo "<script type='text/javascript'>
                            alert('$mensagem');
                            setTimeout(function() {
                                window.location.href = '../home/home.html?user=$usuario';
                            }, 100); 
                          </script>";
                }
            } else {
                echo "Erro ao deletar dados da tabela wishlist_has_hat: " . mysqli_error($conn);
            }
        } else {
            echo "Erro ao inserir dados na tabela sale_has_hat: " . mysqli_error($conn);
        }
    } else {
        echo "Erro ao inserir dados na tabela sale: " . mysqli_error($conn);
    }

    mysqli_close($conn);
} else {
    echo "Preencha todos os campos obrigatórios.";
}

?>
