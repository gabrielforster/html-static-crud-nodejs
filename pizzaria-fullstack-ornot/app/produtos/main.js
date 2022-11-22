const app = document.getElementById("app")
let selected;

async function fetchProdutos(){
  const response = await fetch('/api/produto')
  return await response.json()
}

function setSelected(productId){
  selected = productId
}

async function fillForm(){
  const response = await fetch(`/api/produto/${selected}`)
  const produto = await response.json()

  const nomeInput = document.getElementById("nome")
  const quantidadeInput = document.getElementById("quantidade")
  const valorInput = document.getElementById("valor")
  const idInput = document.getElementById("id")

  nomeInput.value = produto.nome
  quantidadeInput.value = produto.quantidade
  valorInput.value = produto.valor
  idInput.value = produto.id
}

function createModalListeners(){
  const modals = document.querySelectorAll('[data-modal]');

  modals.forEach(trigger => {
    trigger.addEventListener('click', async event => {
      event.preventDefault();
      await fillForm();
      const modal = document.getElementById(trigger.dataset.modal);
      modal.classList.add('open');
      const exits = modal.querySelectorAll('.modal-exit');
      exits.forEach(exit => {
        exit.addEventListener('click', event => {
          event.preventDefault();
          modal.classList.remove('open');
        });
      });
    });
  });  
}

async function mountTable(){
  const produtos = await fetchProdutos()

  const table = document.createElement("table")
  table.innerHTML = `
    <thead>
      <tr>
        <th>Nome</th>
        <th>Tipo</th>
        <th>Quantidade</th>
        <th>Valor</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      ${produtos.map(produto => `
        <tr>
          <td>${produto.nome}</td>
          <td>${produto.tipo}</td>
          <td>${produto.quantidade}</td>
          <td>${produto.valor}</td>
          <td>
            <a
              onclick="setSelected(${produto.id})"
              data-modal="edit-modal"
            >
              Editar
            </a>
            <a>Excluir</a>
          </td>
        </tr>
      `).join("")}
    </tbody>
  `

  app.appendChild(table)
  createModalListeners()
}

mountTable()
