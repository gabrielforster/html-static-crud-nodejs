import mysql from "mysql2"

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "guess_game"
})

const realConnection = connection.promise()

export default realConnection