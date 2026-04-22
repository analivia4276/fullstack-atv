const url = 'http://localhost:3000/produtos';
const flores = [];
let florAtual = null;

carregarFlores();

function carregarFlores() {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      flores.length = 0;
      flores.push(...data);
      listarCards();
    })
    .catch(() => alert('Erro ao conectar com a API'));
}

function listarCards() {
  const container = document.querySelector('main');
  container.innerHTML = '';

  flores.forEach(flor => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h3>${flor.nome}</h3>
      <img src="${flor.imagem}" alt="${flor.nome}">
      <p class="price">Preço: R$ ${flor.preco}</p>
      <p>${flor.categoria} | ${flor.marca}</p>
    `;
    card.onclick = () => abrirFlor(flor);
    container.appendChild(card);
  });
}

function abrirFlor(flor) {
  florAtual = flor;
  tituloFlor.innerHTML = flor.nome;
  nomeEdit.value = flor.nome;
  categoriaEdit.value = flor.categoria;
  marcaEdit.value = flor.marca;
  precoEdit.value = flor.preco;
  imagemEdit.value = flor.imagem;
  imgFlor.src = "http://localhost:3000" + flor.imagem;
  detalhes.classList.remove('oculto');
}

imagemEdit.addEventListener("input", () => {
  imgFlor.src = "http://localhost:3000" + imagemEdit.value;
});

document.querySelector('#formCad').addEventListener('submit', e => {
  e.preventDefault();
  const novaFlor = {
    nome: nome.value,
    categoria: categoria.value,
    marca: marca.value,
    preco: preco.value,
    imagem: imagem.value 
  };

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(novaFlor)
  })
    .then(() => {
      alert("Flor adicionada com sucesso!");
      cadastro.classList.add('oculto');
      carregarFlores();
    })
    .catch(() => alert("Erro ao salvar flor"));
});

function salvarEdicao() {
  const florEditada = {
    nome: nomeEdit.value,
    categoria: categoriaEdit.value,
    marca: marcaEdit.value,
    preco: precoEdit.value,
    imagem: imagemEdit.value
  };

  fetch(url + '/' + florAtual.id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(florEditada)
  })
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(() => {
      alert("Flor atualizada com sucesso!");
      detalhes.classList.add('oculto');
      carregarFlores();
    })
    .catch(() => alert("Erro ao editar flor"));
}

function excluirFlorAtual() {
  if (!confirm("Deseja excluir esta flor?")) return;
  fetch(url + '/' + florAtual.id, { method: 'DELETE' })
    .then(() => {
      alert("Flor excluída com sucesso!");
      detalhes.classList.add('oculto');
      carregarFlores();
    })
    .catch(() => alert("Erro ao excluir flor"));
}
