const app = document.getElementById("app")

async function fetchProdutos(){
  const response = await fetch('/api/produto')
  return await response.json()
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
      </tr>
    </thead>
    <tbody>
      ${produtos.map(produto => `
        <tr>
          <td>${produto.nome}</td>
          <td>${produto.tipo}</td>
          <td>${produto.quantidade}</td>
          <td>${produto.valor}</td>
        </tr>
      `).join("")}
    </tbody>
  `

  app.appendChild(table)
}

mountTable()