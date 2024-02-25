
(() => {
  'use strict'

  // Graphs
  const ctx = document.getElementById('myChart')
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      datasets: [{
        data: [
          15339,
          21345,
          18483,
          24003,
          23489,
          24092,
          12034
        ],
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        borderWidth: 4,
        pointBackgroundColor: '#007bff'
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          boxPadding: 3
        }
      }
    }
  })
})()

var logueado;

if (localStorage.getItem('logueado') === 'true') {
  setLog(true);
} else {
  setLog(false);
}

function getLog() {
  return logueado;
}

function setLog(status) {
  logueado = status;
  localStorage.setItem('logueado', status);
}


var user;

function setUser(user) {
  user = user;
}

function getUser() {
  return user;
}
function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var formData = {
    email: email,
    password: password
  };

  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      if (response.ok) {
        setLog(true);
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        setLog(true);
        setUser(data);
        window.location.href = 'index.html';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      error.json().then(errorBody => {
        alert('Error en la autenticación: ' + errorBody.message);
      }).catch(() => {
        alert('Error en la autenticación.');
      });
    });
}

function checkAuth() {
  if (getLog()) {
    document.getElementById('content').style.display = 'block';
  } else {
    document.getElementById('content').style.display = 'none';
    window.location.href = '/app/login.html';
  }
}


function crearSolicitudPrestamo(dispositivo, usuario, startdate,enddate )
{
  console.log(dispositivo, usuario)

  var formData = {
    dispositivo: dispositivo,
    usuario: usuario,
    status: 'pendiente',
    startdate: startdate,
    enddate: enddate
  };

  fetch('http://localhost:3000/createrequest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      if (response.ok) {
        alert('Su solicitud se genero con exito, puede validar el estado en: Mis Solicitudes');
        window.location.href = 'index.html';
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      error.json().then(errorBody => {
        alert('Error al generar la solicitud: ' + errorBody.message);
      })
    });
}

var datasolicitudes;

function setDataSolicitudes(data) {
  datasolicitudes = data;
}

function getDataSolicitudes() {
  return datasolicitudes;
}

function getSolicitudes(id) {
  var formData = {
    id: id
  };

  return fetch('http://localhost:3000/getsolicitudes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  })
  .then(data => {
    setDataSolicitudes(data);
    return data;
  })
  .catch(error => {
    console.error('Error:', error);
    error.json().then(errorBody => {
      alert('Error al cargar el contenido: ' + errorBody.message);
    });
  });
}

