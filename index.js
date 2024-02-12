const express = require("express");
const app = new express();

const db = require('./config/config_db');


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


app.use(express.urlencoded({ extended: true }));//Para poder recibir datos de un formulario

app.get("/", (req, res) => {
    console.log(db);
//   res.send("<h1>Funciona</h1>");
});

app.get("/ver", (req, res) => {
  db.query('SELECT * FROM user').then(([rows, fields]) => {
    console.log(rows);
    res.send(rows);
  }).catch((err) => {
    console.log(err);
  });
});


app.post("/agregar", (req, res) => {
  const contact = {
    nombre : req.body.nombre,
    numero : req.body.numero,
    direccion : req.body.direccion,
    telefono : req.body.telefono,
  }
  res.redirect("/");
});