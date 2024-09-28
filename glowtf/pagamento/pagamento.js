const mostraProduto = document.getElementsByClassName('corpo')[0];

function pegarQueryParam(param) {
  let urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

let hatId = pegarQueryParam('cart_has_hat_id');
console.log(hatId);

function produto() {
  fetch(`pagamento.php?cart_has_hat_id=${hatId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro na conexão");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data[0]);
      const userId = pegarQueryParam('user'); 
      const produto = `    
      <div class="fundo">
    <div class="produto">
        <div class="imagem-nome-produto">
            <div class="imagens">
                <img class="imagem-produto" src="../dados/imagens/itens_do_jogo/${data[0].hat_promo_image}">
                <img class="splash" src="../dados/imagens/tintas/${data[0].paint_promo_image}">
            </div>
            <div class="dados-produto">
                <div class="titulo">${data[0].hat_name}</div>
                <div class="tinta">
                    <div class="cor-da-tinta" style="background-color: #${data[0].hex_color};"></div>
                    <div class="nome-tinta">${data[0].paint_name}</div>
                </div>
            </div>
        </div>
        <div class="preco">
            R$ ${(data[0].hat_price / 100).toFixed(2).replace('.', ',')}
        </div>
    </div>
    <div class="linha-horizontal"></div>
    <div class="parte-pagamento">
        <div></div>
        <div class="pagamento">
            <form class="pagamento" id="form-pagamento" action="pagar.php" method="POST">
                <div class="botao-input">
                    <div class="titulo-pagamento">
                        <label for="meio-pagamento">Meio de pagamento:</label>
                        <div class="input-usuario">
                            <select id="meio-pagamento" name="meio_pagamento" required>
                                <option value="" disabled selected>Escolha um meio de pagamento</option>
                                <option value="Pix">Pix</option>
                                <option value="Boleto">Boleto</option>
                                <option value="Credito">Cartão de Crédito</option>
                                <option value="Debito">Cartão de Débito</option>
                            </select>
                        </div>
                    </div>
                </div>
                <!-- Novo campo para cupom -->
                <div class="botao-input">
                    <div class="titulo-pagamento">
                        <label for="cupom">Cupom de desconto:</label>
                        <div class="input-usuario">
                            <input type="text" id="cupom" name="cupom" placeholder="Digite seu cupom aqui">
                        </div>
                    </div>
                </div>
                <input type="hidden" name="cart_has_hat_id" value="${data[0].cart_has_hat_id}">
                <input type="hidden" name="hat_name" value="${data[0].hat_name}">
                <input type="hidden" name="hat_id" value="${data[0].hat_id}">
                <input type="hidden" name="hat_price" value="${(parseInt(data[0].hat_price))}">
                <input type="hidden" name="user_id" value="${userId}">
                <button id="pagar-btn" class="pagar-btn" type="submit" name="submit">
                    <div>Pagar</div>
                </button>
            </form>
        </div>
    </div>
</div>
      `;
      mostraProduto.insertAdjacentHTML("beforeend", produto);

      const formPagamento = document.getElementById('form-pagamento');
      formPagamento.addEventListener('submit', (event) => {
        const meioPagamento = document.getElementById('meio-pagamento').value;
        if (!meioPagamento) {
          event.preventDefault();
          alert('Por favor, selecione um meio de pagamento.');
        } else {
          console.log('Método de pagamento:', meioPagamento);
        }
      });
    })
    .catch((error) => console.error("Erro:", error));
}

document.addEventListener("DOMContentLoaded", produto);