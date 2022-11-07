async function fecthCEP(cep){
    const data = await (await fetch(`https://viacep.com.br/ws/${cep}/json/`)).json()

    return data
}

document.getElementById("cep").addEventListener("blur", async (e) => {
    const cep = e.target.value
    const data = await fecthCEP(cep)
    document.getElementById("rua").value = data.logradouro
    document.getElementById("bairro").value = data.bairro
    document.getElementById("cidade").value = data.localidade
    document.getElementById("uf").value = data.uf
})