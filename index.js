const express = require('express');
const bodyParser = require('body-parser');
const app = express()

const db = require('./db');

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(__dirname +  '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/cadastro', (req, res) => {
    res.sendFile(__dirname + '/public/cadastro.html');
});

app.post('/cadastro', (req, res) => {
    const { name, lastName, nasc } = req.body
    db.createUser(name, lastName, nasc)
    res.redirect('/cadastro');
})

app.get('/usuarios', (req, res) => {
    res.sendFile(__dirname + '/public/usuarios.html');
});

app.get('/api/users', async (req, res) => {
    const users = await db.getAllUsers()
    res.json(users)
})

app.delete('/api/users/:userId', async (req, res) => {
    await db.deleteUser(req.params.userId)
    res.redirect('/usuarios')
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
})