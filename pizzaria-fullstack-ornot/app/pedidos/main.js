const app = document.getElementById("app")

const tamanhoNome = {
  P: 'Pequena',
  M: 'Média',
  G: 'Grande',
  F: 'Família'
}

async function fetchPedidos(){
  const response = await fetch('/api/pedido')
  return await response.json()
}

async function mountTable(){
  const pedidos = await fetchPedidos()

  const table = document.createElement("table")
  table.innerHTML = `
    <thead>
      <tr>
        <th>Id</th>
        <th>Cliente</th>
        <th>Valor</th>
        <th>Data</th>
        <th>Tamanho Pizza</th>
        <th>Sabores Pizza</th>
        <th>Extras</th>
        <th>Endereço</th>
      </tr>
    </thead>
    <tbody>
      ${pedidos.map(pedido => `
        <tr>
          <td>${pedido.id}</td>
          <td>${pedido.cliente.nome + ' ' + pedido.cliente.sobrenome}</td>
          <td>${new Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(pedido.valor_total)}</td>
          <td>${new Date(pedido.data_hora).toLocaleDateString('pt-br')}</td>
          <td>${pedido.pizzas.map(pizza => tamanhoNome[pizza.tamanho])}</td>
          <td>${
            pedido.pizzas.map(pizza => `
              <div>
                <p>${pizza.sabor1 || ''}</p>
                <p>${pizza.sabor2 || ''}</p>
                <p>${pizza.sabor3 || ''}</p>
                <p>${pizza.sabor4 || ''}</p>
              </div>
            `).join('')
          }</td>
          <td>
            ${pedido.produtos.map(
              produto => `
                <span>${produto}</span><br>
              `
            ).join('')}
          </td>
          <td>
            <div>
            <p>${pedido.cliente.endereco.complemento}</p>
            <p>${pedido.cliente.endereco.numero}</p>
            <p>${pedido.cliente.endereco.bairro}</p>
            <p>${pedido.cliente.endereco.rua}</p>
              <p>${pedido.cliente.endereco.cidade}</p>
              <p>${pedido.cliente.endereco.estado}</p>
              <p>${pedido.cliente.endereco.cep}</p>
            </div>
          </td>
        </tr>
      `).join('')}
    </tbody>
  `

  app.appendChild(table)
}


mountTable()