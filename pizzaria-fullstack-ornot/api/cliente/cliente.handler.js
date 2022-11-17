import db from "../../db.js";

export async function createUser(req, res) {
  const { cpf, nome, sobrenome, nascimento } = req.body;
  const userData = { cpf, nome, sobrenome, nascimento };

  userData.nascimento = new Date(userData.nascimento)
    .toISOString()
    .slice(0, 10);

  const { cep, numero, complemento, rua, bairro, cidade, estado } = req.body;
  const enderecoData = {
    cep,
    numero,
    complemento,
    rua,
    bairro,
    cidade,
    estado,
  };

  try {
    const [rows] = await db.query("select * from endereco");
    enderecoData.id_endereco = rows.length + 1;
    userData.id_endereco = rows.length + 1;
    await db.query(
      "INSERT INTO endereco SET ?",
      enderecoData,
      (err, result) => {
        if (err) throw err;
      }
    );

    db.query("INSERT INTO cliente SET ?", userData, (err, result) => {
      if (err) throw err;
    });

    res.redirect("/cadastrar-cliente");
  } catch (error) {
    console.errr(error);
  }
}


export async function getAllClients(req, res){
		const [rows] = await db.query("SELECT * FROM cliente")
		res.json(rows)
}