import express from "express"
import bodyParser from "body-parser"

import * as url from "url"
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

import * as db from "./db.js"

const app = express()
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req, res) => { res.send("Hello World!")} )

app.get("/cadastro", (req, res) => res.sendFile(__dirname + "/public/cadastro.html"))

app.post("/cadastro", async (req, res) => {
    await db.createCadastr(req.body)
    res.redirect("/cadastro")
})

app.get("/usuarios", async (req, res) => res.sendFile(__dirname + "/public/usuarios.html"))

app.get("/api/users", async (req, res) => {
    const users = await db.getUsers()
    res.send(users)
})

app.get("/api/users/:id", async (req, res) => {
    const user = await db.getSingleUser(req.params.id)
    res.send(user)
})

app.listen(8080, () => {
    console.log("Server is running on port 8080")
})