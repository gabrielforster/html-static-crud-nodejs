import db from "../../db.js"

export async function getAll(req, res) {
    const [rows] = await db.query("SELECT * FROM sabores")
    res.json(rows)
}

export async function getById(req, res) {
    const { rows } = await db.query("SELECT * FROM sabores WHERE id = $1", [req.params.id])
    res.json(rows[0])
}

export async function create(req, res) {
    const {nome, valor} = req.body

    try {
        const saborData = {nome, valor}
        const [rows] = await db.query("select * from sabores")
        saborData.id = rows.length + 1
        await db.query('INSERT INTO sabores SET ?', saborData, (err, result) => {
            if (err) throw err;
        });

        res.redirect("/cadastrar-sabor")
    } catch (error) {
        console.error(error)
    }
}

export async function deleteOne(req, res) {
    try {
        await db.query("DELETE FROM sabores WHERE id = $1", [req.params.id])
        res.status(200)
    } catch (error) {
        res.status(500).json(error)
    }
}