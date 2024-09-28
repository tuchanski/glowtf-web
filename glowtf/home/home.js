const listaProdutos = document.getElementsByClassName('corpo')[0];

function toggleWishlist(element, current, hat) {
  console.log("current: " + current + " | " + hat);
  let urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has("user")) {
    let userId = urlParams.get("user");

    let starColor = !current ? 'white' : '#282828';
    element.style.color = starColor;

    fetch('wishlist.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'user_id': userId,
        'hat_id': hat,
        'action': !current ? 'a' : 'r' 
      })
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error toggling wishlist status:', error);
      });

    element.onclick = function () {
      toggleWishlist(element, !current, hat);
    };
  } else {
    window.location.href = '../login/login.html';
    alert("Você precisa estar logado para ter uma lista de desejos.");
  }
}

function carregarProdutos(query) {
  let urlParams = new URLSearchParams(window.location.search);

  let wishlistItems = [];
  let cartItems = [];

  
    Promise.all([
      getWishlist(urlParams.get("user")),
      getCart(urlParams.get("user"))
    ])
      .then(([wishlistIds, cartIds]) => {
        wishlistItems = wishlistIds;
        cartItems = cartIds;

        fetch("home.php")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Erro na conexão");
            }
            return response.json();
          })
          .then((data) => {
            data.forEach((item) => {
              let inWishlist = wishlistItems.includes(String(item.hat_id));
              let inCart = cartItems.includes(String(item.hat_id));

              let starColor = inWishlist ? 'white' : '#282828';
              let botaoHTML = inCart ?
                `
                <button class="ver-carrinho-btn" type="button" onclick="MoverPagina('../carrinho/carrinho.html')">
        <div>Ver no carrinho</div>
    </button>
`
                :
                `
    <button class="carrinho-btn" type="button" onclick="adicionaProduto(${item.hat_id})">
        <span class="material-symbols-outlined">add_shopping_cart</span>
        <div>Adicionar ao carrinho</div>
    </button>
`
                ;

              let colorHex = "";
              let colorSplash = "";

              if (item.hex_color != undefined) {
                colorHex = `
                              <div class="cor-da-tinta" style="background-color: #${item.hex_color};"></div>
                              <div class="card-nome-tinta">${item.paint_name}</div>
                          `;
                colorSplash = `<img class="card-splash" src="../dados/imagens/tintas/${item.paint_promo_image}" />`;
              }

              let card = `
                          <div class="card">
                              <span class="material-symbols-outlined estrela" style="color: ${starColor}" onclick="toggleWishlist(this, ${inWishlist}, ${item.hat_id})">star</span>
                              <div class="card-titulo">${item.hat_name}</div>
                              <div class="card-tinta">
                                  ${colorHex}
                              </div>
                              <a onclick='MoverPagina("../produto/produto.html", "hat_id", "${item.hat_id}")' class="imagens">
                                  <img class="card-imagem-produto" src="../dados/imagens/itens_do_jogo/${item.hat_promo_image}">
                                  ${colorSplash}
                              </a>
                              <div class="preco-botao">
                                  <div class="card-preco">R$ ${(item.price / 100).toFixed(2).replace('.', ',')}</div>
                                  ${botaoHTML}
                              </div>
                          </div>
                      `;

              listaProdutos.insertAdjacentHTML("beforeend", card);
            });
          })
          .catch((error) => console.error("Error:", error));
      })
      .catch(error => {
        console.error('Failed to fetch wishlist or cart:', error);
      });
}


document.addEventListener("DOMContentLoaded", () => carregarProdutos(""));

function adicionaProduto(hatId) {
  let urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.has('user')) {
    alert("Você precisa estar logado para realizar compras.");
    window.location.href = '../login/login.html';
  } else {
    let userId = urlParams.get("user");
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


function getWishlist(userId) {
  return fetch('get_wishlist.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      user_id: userId
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching wishlist:', error);
      throw error;
    });
}


function getCart(userId) {
  return fetch('get_cart.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      user_id: userId
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching cart:', error);
      throw error;
    });
}
