import express from "express";
import * as url from "url"

import db from "./db.js";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/app"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/app/index.html")
})

app.get("/jogo", (req, res) => {
    res.sendFile(__dirname + "/app/jogo.html")
})

app.get("/placar", (req, res) => {
    res.sendFile(__dirname + "/app/placar.html")
})

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});