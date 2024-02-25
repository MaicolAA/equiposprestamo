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
  database: 'prestamos',
  password: 'gatostem123',
  port: 5432,
});

app.use(bodyParser.json());

app.use(cors());
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM "user" WHERE email = $1`;
  const query2 = `SELECT * FROM "user" WHERE email = $1 AND password = $2`;

  pool.query(query, [email], (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Error interno del servidor' });
    } else if (results.rows.length === 0) {
      res.status(401).json({ message: 'Usuario no encontrado' });
    } else {
      pool.query(query2, [email, password], (error, results) => {
        if (error) {
          res.status(500).json({ message: 'Error interno del servidor' });
        } else if (results.rows.length > 0) {
          getUsuario(req.body)
            .then(dataUser => {
              res.json({ message: '¡Inicio de sesión exitoso!', data: dataUser });
              res.sendFile(path.join(__dirname, 'index.html'));
            })
            .catch(error => {
              res.status(500).json({ message: 'Error al obtener usuario: ' + error });
            });
        } else {
          res.status(401).json({ message: 'Contraseña incorrecta' });
        }
      });
    }
  });
});

function getUsuario(userData) {
  const { email, password } = userData;

  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM "user" WHERE email = $1 and password = $2;';

    pool.query(query, [email, password], (error, results) => {
      if (error) {
        reject('Error interno del servidor' + error);
      } else {
        resolve({ message: '¡Se generó su solicitud!', data: results.rows });
      }
    });
  });
}


app.post('/createrequest', (req, res) => {
  const { dispositivo, usuario, status, startdate, enddate } = req.body;
  const query = 'insert into loanrequest (iduser, typeequipment, statusapproved, startdaterequired, enddaterequired) values ($1, $2, $3, $4, $5);';
  pool.query(query, [usuario, dispositivo, status, startdate, enddate], (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Error interno del servidor' + error });
    } else {
      res.json({ message: '¡Se genero su solicitud!' });
    } 
  });

})

app.post('/getsolicitudes', (req, res) => {
  const { id } = req.body;

  const query = 'SELECT * FROM loanrequest WHERE iduser = $1;';

  pool.query(query, [id], (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Error interno del servidor' + error });
    } else {
      res.json({ message: '¡Se generó su solicitud!', data: results.rows });
    } 
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
