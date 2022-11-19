import mysql from "mysql2"

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Rocha1307###$",
    database: "atividade_04"
})

const realConnection = connection.promise()

export default realConnection