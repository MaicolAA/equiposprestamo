const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
const session = require('express-session');

const app = express();


// Configurar sesión
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));


app.get('/session', (req, res) => {
  if (req.session && req.session.user) {
    res.sendStatus(200); 
  } else {
    res.sendStatus(401);
  }
});


const pool = new Pool({
  user: 'mantum',
  host: 'localhost',
  database: 'pdo',
  password: 'gatostem123',
  port: 5432,
});

app.use(bodyParser.json());

app.use(cors());

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM "user" WHERE email = $1`;
  const query2 = `SELECT * FROM "user" WHERE email = $1 AND password = $2`;

  // Consulta para verificar si el usuario existe
  pool.query(query, [email], (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Error interno del servidor' });
    } else if (results.rows.length === 0) {
      res.status(401).json({ message: 'Usuario no encontrado' });
    } else {
      // Usuario encontrado, ahora verificamos la contraseña
      pool.query(query2, [email, password], (error, results) => {
        if (error) {
          res.status(500).json({ message: 'Error interno del servidor' });
        } else if (results.rows.length > 0) {
          res.json({ message: '¡Inicio de sesión exitoso!' });
          res.sendFile(path.join(__dirname, 'index.html'));
        } else {
          // Contraseña incorrecta
          res.status(401).json({ message: 'Contraseña incorrecta' });
        }
      });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
