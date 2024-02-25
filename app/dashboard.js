
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
        setLog(true)
        return response.json();

      } else {
        setLog(false);
        return Promise.reject(response);
      }
    })
    .then(data => {
      if (data.error) {
        alert(data.error);
        setLog(false);

      } else {
        window.location.href = 'index.html';
        setLog(true)
      }
    })
    .catch(error => {
      console.error('Error:', error);
      error.json().then(errorBody => {
        alert('Error en la autenticación: ' + errorBody.message);
        setLog(false);

      }).catch(() => {
        alert('Error en la autenticación.');
        setLog(false);

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

