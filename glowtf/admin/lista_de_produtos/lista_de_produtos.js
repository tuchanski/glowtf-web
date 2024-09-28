function criarProdutos() {
    fetch("lista_de_produtos.php")
    .then(response => response.json())
    .then(data => {
        data.forEach((data) => {
            const card = `
            <div class="card-admin">
                <div class="card-titulo">${data.hat_name}</div>
                <div class="card-tinta">
                    <div class="cor-da-tinta" style="background-color: #${data.hex_color};"></div>
                    <div class="card-nome-tinta">${data.paint_name}</div>
                </div>
                <a onclick="MoverPagina("../../produto/produto.html", "hat_id", "${data.hat_id}")" class="imagens">
                    <img class="card-imagem-produto" src="../../dados/imagens/itens_do_jogo/${data.hat_promo_image}">
                    <img class="card-splash" src="../../dados/imagens/tintas/${data.paint_promo_image}">
                </a>
                <div class="preco-botao">
                    <div class="card-preco">R$${(data.price / 100).toFixed(2).replace('.', ',')}</div>
                    <div class="botoes">
                        <button class="editar-btn" type="button" onclick="MoverPagina('../editar_produto/editar_produto.html', 'hat_id', ${data.hat_id})">
                            <span class="material-symbols-outlined">edit</span>
                            Editar
                        </button>
                        <button class="deletar-btn" type="button" onclick="deletaProduto(${data.hat_id})">
                            <span class="material-symbols-outlined">delete</span>
                            Deletar
                        </button>
                    </div>
                </div>
            </div>
            `;
            document.getElementsByClassName("corpo")[0].insertAdjacentHTML("beforeend", card);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => criarProdutos());

function deletaProduto(hat_id) {
    let url = 'deleta_produto.php';
    
    let options = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' 
        },
        body: 'hat_id=' + encodeURIComponent(hat_id) 
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
  
  
