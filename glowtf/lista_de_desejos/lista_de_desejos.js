function carregaProdutos() {
    let urlParams2 = new URLSearchParams(window.location.search);
    const listaProdutos = document.getElementsByClassName("itens")[0];
    fetch("lista_de_desejos.php", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
          'id': urlParams2.get('user')
      })
  })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na conexão");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        data.forEach((data) => {
          const item = `
          <tr>
            <td class="imagens">
                <a href="../produto/produto.html?hat_id=${data.hat_id}" class="img">
                  <img class="imagem" src="../dados/imagens/itens_do_jogo/${data.hat_promo_image}">
                  <img class="splash" src="../dados/imagens/tintas/${data.paint_promo_image}">
                </a>
            </td>
            <td>
              <div class="dados-produto">
                <div class="titulo">${data.hat_name}</div>
                  <div class="tinta">
                    <div class="cor-da-tinta" style="background-color: #${data.hex_color};"></div>
                    <div class="nome-tinta">${data.paint_name}</div>
                  </div>
              </div>
            </td>
            <td class="preco">
                R$ ${(data.hat_price / 100).toFixed(2).replace('.', ',')}
            </td>
            <td class="botoes">
              <button class="carrinho-btn" type="button" onclick="insereProduto(${data.hat_id}, ${data.id_user})">
                <span class="material-symbols-outlined">
                  shopping_cart
                </span>
              </button>
            </td>
            <td>
              <button class="remover-carrinho-btn" type="button" onclick="deletaProduto(${data.wishlist_has_hat_id})">
                <span class="material-symbols-outlined">
                  delete
                </span>
              </button>
            </td>
          </tr>
          `
          listaProdutos.insertAdjacentHTML("beforeend", item);
        });
      })
      .catch((error) => console.error("Error:", error));
  }
  document.addEventListener("DOMContentLoaded", () => carregaProdutos(""));
  
  function identificaUsuario() {
      let urlParams2 = new URLSearchParams(window.location.search);
      fetch('../bibliotecas/get_user_data.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
              'id': urlParams2.get('user')
          })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
          document.getElementsByClassName("title")[0].innerText = "Sua lista de desejos, " + data[0].name;
      })
      .catch(error => {
          console.error('Erro:', error);
      });
  }
  document.addEventListener("DOMContentLoaded", () => identificaUsuario());


  function deletaProduto(wishlist_has_hat_id) {
    let url = 'deleta_item_lista_de_desejos.php';
    
    let options = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' 
        },
        body: 'wishlist_has_hat_id=' + encodeURIComponent(wishlist_has_hat_id) 
    };
  
    fetch(url, options)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao deletar produto');
        }
        return response.text();
    })
    .then(data => {
        console.log(data); 
        
        alert('Produto deletado com sucesso.');
  
        window.location.reload();
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao deletar produto.');
    });
  }

  function insereProduto(hat_id, id_user) {
    let url = 'adiciona_item_carrinho_wl.php';
    
    let options = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' 
        },
        body: 'hat_id=' + encodeURIComponent(hat_id) + '&id_user=' + encodeURIComponent(id_user)
    };
  
    fetch(url, options)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao inserir produto');
        }
        return response.text();
    })
    .then(data => {
        console.log(data); 
        alert('Produto inserido com sucesso.');
        window.location.reload();
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao inserir produto.');
    });
}

  