import express from "express";
import bodyParser from "body-parser";


import * as url from "url"
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express()
app.use(express.json())
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({ extended: false }))

//api routes
import apiRoute from "./api/index.js"
app.use("/api", apiRoute)

//frontend routes
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Server is running on port 3000")
})
