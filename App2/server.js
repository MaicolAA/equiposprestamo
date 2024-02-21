const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

// Configuración de conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'usuario',
  password: 'contraseña',
  database: 'nombre_basedatos'
});

// Conectar a la base de datos
connection.connect();

// Middleware para analizar cuerpos de solicitud en formato JSON
app.use(bodyParser.json());

// Ruta para manejar la solicitud de validación de usuario
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Consulta a la base de datos para validar el usuario
  const query = `SELECT * FROM usuarios WHERE email = ? AND password = ?`;
  connection.query(query, [email, password], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    } else if (results.length > 0) {
      // Si el usuario existe en la base de datos, redirigir al index.html
      res.sendFile(path.join(__dirname, 'index.html'));
    } else {
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
