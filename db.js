const mysql = require("mysql2");


const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  port: 3306,
  database: "node03",
});

const connectionPromise = connection.promise();

function createUser(firstName, lastName, nasc) {
  connection.query(
    `INSERT INTO users (firstName, lastName, birthdate) VALUES ('${firstName}', '${lastName}', '${nasc}')`,
    (err, results) => {
      if (err) {
        console.error(err);
      } else {
        console.log("OK - User created");
      }
    }
  );
}

async function getAllUsers() {
  const [rows] = await connectionPromise.execute('SELECT * FROM users');
  return rows;
}

async function deleteUser(id) {
  try {
    await connectionPromise.execute(`DELETE FROM users WHERE id = ${id}`);
    return
  } catch (error) {
    return error
  }
  
}

module.exports = {
  createUser,
	getAllUsers,
  deleteUser
};
