const express = require("express");
const app = new express();
const cors = require("cors");

const db = require('./config/config_db');

app.use(cors());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


app.use(express.urlencoded({ extended: true }));//Para poder recibir datos de un formulario

app.use(express.json());//Para poder recibir datos en formato JSON 

app.post('/login', async (req, res) => {
  const { user, pass } = req.body;

  if (!user || !pass) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  try {
    const query = `SELECT idUser, username, password, userTypeName FROM user, userType WHERE username = ? AND password = ? AND user.idUserType = userType.idUserType AND userStatus = 'ACTIVO'`;
    const [result] = await db.query(query, [user, pass]);

    if (result.length === 0) {
      return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
    }

    res.status(200).json(result[0]);

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error en la base de datos" });
  }
});