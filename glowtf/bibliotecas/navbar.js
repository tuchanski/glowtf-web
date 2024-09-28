const urlParams = new URLSearchParams(window.location.search);

function createNavbar(target_id) {
  const html = `<nav>
    <ul class="conjunto-nav">
      <li class="logo">
        <a onclick="MoverPagina('../home/home.html')">
          <span class="material-symbols-outlined">
            stylus_laser_pointer
          </span>
          GLOW.<b>TF</b>
        </a>
      </li>
      <li class="searchbar">
        <input class="searchbar" type="text" id="searchbar" placeholder="O que você está buscando hoje?">
        <button type="button" class="search-btn" onclick="buscaNavBar()">
          <span class="material-symbols-outlined">
            search
          </span>
        </button>
      </li>
      <li class="login">
        <!-- Login items will be dynamically added by criarLogin function -->
      </li>
    </ul>
  </nav>`;
  
  document.getElementById(target_id).insertAdjacentHTML("beforeend", html);
  criarLogin();
}

function criarLogin() {
  const classeLogin = document.querySelector('.login');
  let isLogged = urlParams.has('user');
  let result = '';

  if (isLogged) {
    fetch(fixPastaAdmin('../bibliotecas/get_user_data.php', '../../bibliotecas/get_user_data.php'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'id': urlParams.get('user')
      })
    })
    .then(response => response.json())
    .then(data => {
      let pathLista = !isAdminPage() ? '../lista_de_produtos/lista_de_produtos.html' : '../admin/lista_de_produtos/lista_de_produtos.html';
      let pathAdicionar = !isAdminPage() ? '../adicionar_produto/adicionar_produto.html' : '../admin/adicionar_produto/adicionar_produto.html';

      if (data[0].admin == 0) {
        result = `
          <div class="usuario-autenticado">
            <li>
              <a class="lista-desejos" onclick="MoverPagina('../lista_de_desejos/lista_de_desejos.html')">
                <span class="material-symbols-outlined" id="span-nav">bookmark</span>
              </a>
            </li>
            <li>
              <a class="lista-carrinho" onclick="MoverPagina('../carrinho/carrinho.html')">
                <span class="material-symbols-outlined" id="span-nav">shopping_cart</span>
              </a>
            </li>
            <li>
              <a class="usuario big">
                <span class="material-symbols-outlined">person</span>${data[0].name}
              </a>
              <ul class="dropdown big dropdown-big">
                <li><a class="drop-desejos" onclick="MoverPagina('../lista_de_desejos/lista_de_desejos.html')">Lista de Desejos</a></li>
                <li><a class="drop-carrinho" onclick="MoverPagina('../carrinho/carrinho.html')">Carrinho</a></li>
                <li><a onclick="MoverPagina('../perfil_usuario/perfil_usuario.html')">Perfil</a></li>
                <li><a onclick="deslogar()">Sair</a></li>
              </ul>
              <a class="usuario small">
                <span class="material-symbols-outlined">menu</span>
              </a>
              <ul class="dropdown small">
                <li><a class="drop-desejos" onclick="MoverPagina('../lista_de_desejos/lista_de_desejos.html')">Lista de Desejos</a></li>
                <li><a class="drop-carrinho" onclick="MoverPagina('../carrinho/carrinho.html')">Carrinho</a></li>
                <li><a onclick="MoverPagina('../perfil_usuario/perfil_usuario.html')">Perfil</a></li>
                <li><a onclick="deslogar()">Sair</a></li>
              </ul>
            </li>
          </div>
        `;
      } else {
        result = `
          <div class="usuario-autenticado">
            <li>
              <a class="usuario big">
                <span class="material-symbols-outlined">person</span>${data[0].name} | Admin
              </a>
              <ul class="dropdown big dropdown-big">
                <li><a onclick="MoverPagina('${pathLista}')">Lista de produtos</a></li>
                <li><a onclick="MoverPagina('${pathAdicionar}')">Adicionar produto</a></li>
                <li><a onclick="deslogar()">Sair</a></li>
              </ul>
              <a class="usuario small">
                <span class="material-symbols-outlined">menu</span>
              </a>
              <ul class="dropdown small">
                <li><a onclick="MoverPagina('${pathLista}')">Lista de produtos</a></li>
                <li><a onclick="MoverPagina('${pathAdicionar}')">Adicionar produto</a></li>
                <li><a onclick="deslogar()">Sair</a></li>
              </ul>
            </li>
          </div>
        `;
      }

      classeLogin.innerHTML = result; 
    })
    .catch(error => {
      console.error(error);
    });
  } else {
    result = `
      <a class="usuario" href="javascript:void(0)" onclick="MoverPagina('../login/login.html')">
        <span class="material-symbols-outlined">person</span>Entrar
      </a>
    `;
    
    classeLogin.innerHTML = result; 
  }
}

document.addEventListener("DOMContentLoaded", () => createNavbar("create-navbar"));

function deslogar() {
  window.location.replace(fixPastaAdmin("../bibliotecas/deslogar.html", "../../bibliotecas/deslogar.html"));
}

function isAdminPage() {
  return window.location.pathname.split('/').length < 7;
}

function fixPastaAdmin(root, subpasta) {
  return isAdminPage() ? root : subpasta;
}

function buscaNavBar() {
  let search = document.getElementById('searchbar').value;
  MoverPagina(fixPastaAdmin("../busca/busca.html", "../../busca/busca.html"), 'search', search);
}
