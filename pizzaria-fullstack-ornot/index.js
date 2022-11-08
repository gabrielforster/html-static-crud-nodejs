import express from "express";
import bodyParser from "body-parser";


import * as url from "url"
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express()
app.use(express.json())
app.use(express.static(__dirname + "/app"))
app.use(bodyParser.urlencoded({ extended: false }))

//api routes
import apiRoute from "./api/index.js"
app.use("/api", apiRoute)

//frontend routes
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/app/index.html")
})

app.get("/produtos", (req, res) => {
    res.sendFile(__dirname + "/app/produtos")
})

app.get("/cadastrar-produto", (req, res) => {
    res.sendFile(__dirname + "/app/cadastrar-produto")
})

app.get("/clientes", (req, res) => {
    res.sendFile(__dirname + "/app/clientes")
})

app.get("/cadastrar-cliente", (req, res) => {
    res.sendFile(__dirname + "/app/cadastrar-cliente")
})

app.get("/pedidos", (req, res) => {
    res.sendFile(__dirname + "/app/pedidos")
})

app.get("/fazer-pedido", (req, res) => {
    res.sendFile(__dirname + "/app/fazer-pedido")
})

app.get("/sabores", (req, res) => {
    res.sendFile(__dirname + "/app/sabores")
})

app.get("/cadastrar-sabor", (req, res) => {
    res.sendFile(__dirname + "/app/cadastrar-sabor")
})


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Server is running on port 3000")
})
