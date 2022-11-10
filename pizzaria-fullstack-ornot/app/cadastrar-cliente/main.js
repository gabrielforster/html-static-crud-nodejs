async function fetchViaCEP(cep){
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    return data;
}

document.getElementById("cep").addEventListener("blur", async (e) => {
    const cep = e.target.value;
    const data = await fetchViaCEP(cep);
    if(data.erro){
        alert("CEP inválido");
        return;
    }
    document.getElementById("rua").value = data.logradouro;
    document.getElementById("bairro").value = data.bairro;
    document.getElementById("cidade").value = data.localidade;
    document.getElementById("estado").value = data.uf;
});