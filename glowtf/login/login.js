
function loginUsuario() {
  let name = document.getElementById("nome").value;
  let password = document.getElementById("senha").value;

  console.log(name);
  console.log(password);

  if (name.length == 0) {
    alert("Por favor insira um nome");
    return;
  }
  if (password.length == 0) {
    alert("Por favor insira uma senha");
    return;
  }

  fetch('login.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'nome': name,
      'senha': password
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if(data.length == 0){
        alert("Login Inexistente, Por favor confira se o seu Login/Senha estão corretos.")
      }
      else{
        window.location.href = '../home/home.html?user='+ data[0].id;
      }
    })
    .catch(error => {
      console.log(data);
      console.error('Error:', error);
    });
}