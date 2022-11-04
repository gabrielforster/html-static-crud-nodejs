import mysql from "mysql2"

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "node04"
})

const realConnection = connection.promise()

function createCadastro({
    cpf,
    nome,
    email,
    cep,
    rua,
    numero,
    bairro,
    cidade,
    estado,
    complemento,
    telefone,
    celular

}) {
    return realConnection.query(
        "INSERT INTO cadastro (cpf, nome, email, cep, rua, numero, bairro, cidade, estado, complemento, telefone, celular) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [cpf, nome, email, cep, rua, numero, bairro, cidade, estado, complemento, telefone, celular]
    )
}

function getUsers() {
    return realConnection.query("SELECT * FROM cadastro")
}

function getSingleUser(id) {
    return realConnection.query("SELECT * FROM cadastro WHERE id = ?", [id])
}

export { createCadastro, getUsers, getSingleUser }
