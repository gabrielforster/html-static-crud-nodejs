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
    res.sendFile(__dirname + "/app/jogo/jogo.html")
})

app.get("/placar", (req, res) => {
    res.sendFile(__dirname + "/app/placar/resultados.html")
})

app.post("/score", (req, res) => {
    console.log(req.body)
    const { name, score } = req.body;
    db.query(`INSERT INTO guess_game (name, score) VALUES ('${name}', ${score})`)

    res.status(200).json({ message: "ok" })
})

app.get("/score", async (req, res) => {
    const [result] = await db.query("SELECT * FROM guess_game ORDER BY score DESC")
    res.status(200).json(result)
})


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});