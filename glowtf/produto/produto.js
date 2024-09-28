const mostraProduto = document.getElementsByClassName('corpo')[0];

function pegarQueryParam(param) {
  let urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

let hatId = pegarQueryParam('hat_id');
console.log(hatId);

function favorita(element) {
  if (element.style.color === 'white') {
    element.style.color = '#282828';
  } else {
    element.style.color = 'white';
  }
}

function produto() {
  fetch(`produto.php?hat_id=${hatId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na conexão");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data[0]);
      const userId = pegarQueryParam('user'); // Captura o userId da URL
      const produto = `
        <div class="fundo-adiciona-produto">
          <span class="material-symbols-outlined estrela" onclick="favorita(this)">star</span>
          <div class="dados-produto">
            <div class="titulo">${data[0].hat_name}</div>
            <div class="tinta">
              <div class="cor-da-tinta" style="background-color: #${data[0].hex_color};"></div>
              <div class="nome-tinta">${data[0].paint_name}</div>
            </div>
            <div class="descricao-produto">${data[0].description}</div>
          </div>
          <div class="linha-vertical"></div>
          <div class="imagem-preco">
            <div class="imagens" onclick="window.location.href='${data[0].hat_wiki}';">
              <img class="imagem-produto" src="../dados/imagens/itens_do_jogo/${data[0].hat_promo_image}">
              <img class="splash" src="../dados/imagens/tintas/${data[0].paint_promo_image}">
            </div>
            <div class="preco-botao">
              <div class="preco">R$ ${(data[0].price / 100).toFixed(2).replace('.', ',')}</div>
              <button class="carrinho-btn" type="button" onclick="adicionaProduto(${data[0].hat_id}, '${userId}')">
                <span class="material-symbols-outlined">
                  add_shopping_cart
                </span>
                <div>Adicionar ao carrinho</div>
              </button>
            </div>
          </div>
        </div>`;
      mostraProduto.insertAdjacentHTML("beforeend", produto);
    })
    .catch((error) => console.error("Erro:", error));
}

document.addEventListener("DOMContentLoaded", produto);

function adicionaProduto(hatId, userId) {
  if (userId === 'null') {
    alert("Você precisa estar logado para realizar compras.");
    window.location.href = '../login/login.html';
  } else {
    let url = '../carrinho/adiciona_item_carrinho.php';
    let params = 'hat_id=' + encodeURIComponent(hatId) + '&id=' + encodeURIComponent(userId);

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    };

    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao adicionar produto');
        }
        return response.text();
      })
      .then(data => {
        console.log(data); 
        alert('Produto adicionado ao carrinho com sucesso.');
        MoverPagina('../carrinho/carrinho.html');
      })
      .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao adicionar produto.');
      });
  }
}
