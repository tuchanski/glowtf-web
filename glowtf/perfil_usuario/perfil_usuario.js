function carregaProdutos() {
  let urlParams2 = new URLSearchParams(window.location.search);
  const listaProdutos = document.getElementsByClassName("itens")[0];
  fetch("perfil_usuario.php", {
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
        
        let saleDate = new Date(data.sale_date);
        let formattedDate = saleDate.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });

        const item = `
        <tr>
            <td class="imagens">
                <a href="../produto/produto.html?hat_id=${data.hat_id}&user=${urlParams2.get("user")}" class="img">
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
              ${formattedDate}
            </td>
            <td class="preco">
              R$ ${(data.sale_price / 100).toFixed(2).replace('.', ',')}
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
        document.getElementsByClassName("title")[0].innerText = "Suas compras passadas, " + data[0].name;
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

document.addEventListener("DOMContentLoaded", () => identificaUsuario());
