import mysql from "mysql2"

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Rocha1307###$",
    database: "node_04"
})

connection.query("desc cadastro;")

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
    uf,
    complemento,
    telefone,
    celular

}) {
    return realConnection.query(
        "INSERT INTO cadastro (cpf, nome, email, cep, rua, numero, bairro, cidade, uf, complemento, telefone, celular) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [cpf, nome, email, cep, rua, numero, bairro, cidade, uf, complemento, telefone, celular]
    )
}

function getUsers() {
    return realConnection.query("SELECT * FROM cadastro")
}

function getSingleUser(id) {
    return realConnection.query("SELECT * FROM cadastro WHERE id = ?", [id])
}

function deleteUser(id) {
    return realConnection.query("DELETE FROM cadastro WHERE id = ?", [id])
}

export { createCadastro, getUsers, getSingleUser, deleteUser }
