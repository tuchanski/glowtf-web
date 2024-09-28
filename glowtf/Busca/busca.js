const listaProdutos = document.getElementsByClassName('corpo')[0];
const titulo = document.getElementsByClassName('title')[0];

function comprar(){
  console.log("Compra inválida");
  if(!urlParams.has('user')){
    window.location.href = '../login/login.html';
    alert("Você precisa estar logado para realizar compras.");
  }
}

function corEstrela(element) {
  if (urlParams.has("user")) {
    if (element.style.color === 'white') {
      element.style.color = '#282828';
    } else {
      element.style.color = 'white';
    }
  }
  else{
    window.location.href = '../login/login.html';
    alert("Você precisa estar logado para ter uma lista de desejos.");
  }
}

function busca() {
  let inputBusca = urlParams.get('search');
  document.getElementById('searchbar').value = inputBusca;

  fetch('busca.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'searchbar': inputBusca
    })
  })
  .then(response => response.json())
  .then(data => {
    listaProdutos.innerHTML = '';
    titulo.textContent = '';

    let resultado = `Foram encontrados ${data.length} resultados da sua busca por: ${inputBusca}`;
    titulo.insertAdjacentHTML("beforeend", resultado);

    data.forEach((item) => {
      let card = `<h1>ERRO FATAL</h1>`;
      if(item.hex_color !== undefined){
        card = `
        <div class="card">
          <span class="material-symbols-outlined estrela" onclick="corEstrela(this)">star</span>
          <div class="card-titulo">${item.hat_name}</div>
          <div class="card-tinta">
            <div class="cor-da-tinta" style="background-color: #${item.hex_color};"></div>
            <div class="card-nome-tinta">${item.paint_name}</div>
          </div>
          <a href="../produto/produto.html?hat_id=${item.hat_id}" class="imagens">
            <img class="card-imagem-produto" src="../dados/imagens/itens_do_jogo/${item.hat_promo_image}">
            <img class="card-splash" src="../dados/imagens/tintas/${item.paint_promo_image}">
          </a>
          <div class="preco-botao">
            <div class="card-preco">R$ ${(item.price / 100).toFixed(2).replace('.', ',')}</div>
            <button class="carrinho-btn" type="button" onclick="comprar()">
              <span class="material-symbols-outlined">add_shopping_cart</span>
              <div>adicionar ao carrinho</div>
            </button>
          </div>
        </div>`;
      } else {
        card = `
        <div class="card">
          <span class="material-symbols-outlined estrela" onclick="corEstrela(this)">star</span>
          <div class="card-titulo">${item.hat_name}</div>
          <a href="../produto/produto.html?hat_id=${item.hat_id}" class="imagens">
            <img class="card-imagem-produto" src="../dados/imagens/itens_do_jogo/${item.hat_promo_image}">
          </a>
          <div class="preco-botao">
            <div class="card-preco">R$ ${(item.price / 100).toFixed(2).replace('.', ',')}</div>
            <button class="carrinho-btn" type="button" onclick="comprar()">
              <span class="material-symbols-outlined">add_shopping_cart</span>
              <div>adicionar ao carrinho</div>
            </button>
          </div>
        </div>`;
      }
      listaProdutos.insertAdjacentHTML("beforeend", card);
    });
  })
  .catch(error => {
    console.error('Erro:', error);
  });
}


document.addEventListener("DOMContentLoaded", () => busca());
