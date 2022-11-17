const pizzaSizes = {
    "P": 1,
    "M": 2,
    "G": 3,
    "F": 4
}

async function createClientsSelect(){
    const clients = await fetch('/api/cliente').then(res => res.json());
    const select = document.getElementById('cliente');
    clients.forEach(client => {
        const option = document.createElement('option');
        option.value = client.cpf;
        option.innerText = `${client.nome}  ${client.sobrenome}`;
        select.appendChild(option);
    });
}

async function createSaboresSelects(){
    const sabores = await fetch('/api/sabores').then(res => res.json());
    const saboresSelects = document.getElementById("sabores");

    while(saboresSelects.firstChild){
        saboresSelects.removeChild(saboresSelects.firstChild);
    }

    const pizzaSize = document.getElementById("tamanho-pizza").value;
    const numberOfPizzas = pizzaSizes[pizzaSize];
    for(let i = 0; i < numberOfPizzas; i++){
        const select = document.createElement('select');
        select.name = `sabor${i + 1}`;
        sabores.forEach((sabor, index) => {
            if(index === 0) {
                const option = document.createElement('option');
                option.value = "";
                option.innerText = "Selecione um sabor";
                select.appendChild(option);
            }

            const option = document.createElement('option');
            option.value = sabor.id;
            option.innerText = sabor.nome;
            select.appendChild(option);
        });
        saboresSelects.appendChild(select);
    }
}

async function createProdutosCheckboxes(){
    const produtos = await fetch('/api/produto').then(res => res.json());
    const produtosCheckboxes = document.getElementById("produtos");

    while(produtosCheckboxes.firstChild){
        produtosCheckboxes.removeChild(produtosCheckboxes.firstChild);
    }

    produtos.forEach(produto => {
        const label = document.createElement('label');
        label.innerText = produto.nome;
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = produto.nome;
        label.appendChild(checkbox);
        produtosCheckboxes.appendChild(label);
    });
}

document.getElementById("tamanho-pizza").addEventListener("change", createSaboresSelects)
createClientsSelect();
createProdutosCheckboxes();