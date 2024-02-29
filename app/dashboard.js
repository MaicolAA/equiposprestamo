(() => {
  "use strict";

  // Graphs
  const ctx = document.getElementById("myChart");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      datasets: [
        {
          data: [15339, 21345, 18483, 24003, 23489, 24092, 12034],
          lineTension: 0,
          backgroundColor: "transparent",
          borderColor: "#007bff",
          borderWidth: 4,
          pointBackgroundColor: "#007bff",
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          boxPadding: 3,
        },
      },
    },
  });
})();

var logueado;

if (localStorage.getItem("logueado") === "true") {
  setLog(true);
} else {
  setLog(false);
}

function getLog() {
  return logueado;
}

function setLog(status) {
  logueado = status;
  localStorage.setItem("logueado", status);
}
function setUser(userData) {
  localStorage.setItem('userData', JSON.stringify(userData));
}

// Función para obtener los datos del usuario
function getUser() {
  const userDataString = localStorage.getItem('userData');
  if (userDataString) {
      return JSON.parse(userDataString);
  } else {
      return null; // Si no hay datos de usuario almacenados, retornamos null
  }
}
var typeUser;

function setTypeUser(typeuser) {
  typeUser = typeuser;
  localStorage.setItem("typeuser", typeuser);
}

function getTypeUser() {
  return typeUser;
}

function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var formData = {
    email: email,
    password: password,
  };

  fetch("http://localhost:3000/iniciarsesion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.ok) {
        setLog(true);
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        let usuario = data.data.data[0];
        setLog(true);
        setUser(usuario);
        setTypeUser(usuario.role);
        window.location.href = "index.html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      error
        .json()
        .then((errorBody) => {
          alert("Error en la autenticación: " + errorBody.message);
        })
        .catch(() => {
          alert("Error en la autenticación.");
        });
    });
}

function checkAuth() {
  if (getLog()) {
    document.getElementById("content").style.display = "block";
  } else {
    document.getElementById("content").style.display = "none";
    window.location.href = "/app/login.html";
  }
}

function crearSolicitudPrestamo(dispositivo, usuario, startdate, enddate) {
  console.log(dispositivo, usuario);

  var formData = {
    dispositivo: dispositivo,
    usuario: usuario,
    status: "pendiente",
    startdate: startdate,
    enddate: enddate,
  };

  fetch("http://localhost:3000/createrequest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.ok) {
        alert(
          "Su solicitud se genero con exito, puede validar el estado en: Mis Solicitudes"
        );
        window.location.href = "index.html";
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      error.json().then((errorBody) => {
        alert("Error al generar la solicitud: " + errorBody.message);
      });
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
    id: id,
  };

  return fetch("http://localhost:3000/getsolicitudes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then((data) => {
      setDataSolicitudes(data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      error.json().then((errorBody) => {
        alert("Error al cargar el contenido: " + errorBody.message);
      });
    });
}


var dataallsolicitudes;

function setDataAllSolicitudes(data) {
  dataallsolicitudes = data;
}

function getDataAllSolicitudes() {
  return dataallsolicitudes;
}

function getAllSolicitudes() {
  return fetch("http://localhost:3000/getallsolicitudes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then((data) => {
      setDataAllSolicitudes(data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      error.json().then((errorBody) => {
        alert("Error al cargar el contenido: " + errorBody.message);
      });
    });
}



var historico;

function setHistorico(data) {
  historico = data;
}

function getDataHistorico() {
  return historico;
}

function getHistorico() {
  return fetch("http://localhost:3000/gethistorico", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then((data) => {
      setHistorico(data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      error.json().then((errorBody) => {
        alert("Error al cargar el contenido: " + errorBody.message);
      });
    });
}



var dispositivos;

function setDispositivos(data) {
  dispositivos = data;
}

function getDataDispositivos() {
  return dispositivos;
}

function getDispositivos() {
  return fetch("http://localhost:3000/getdispositivos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },  
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then((data) => {
      setDispositivos(data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      error.json().then((errorBody) => {
        alert("Error al cargar el contenido: " + errorBody.message);
      });
    });
}


function crearPrestamo(fechainicio, fechafin, iduser, idequipment, id) {
  var formData = {
    fechainicio: fechainicio,
    fechafin: fechafin,
    iduser: iduser,
    idequipment: idequipment,
  };

  var formData2= {
    idsolicitud: id,
    estado: 'aprobado'
  };


  fetch("http://localhost:3000/crearprestamo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.ok) {
        alert(
          "Sé Aprobo el prestamo"
        );
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      error.json().then((errorBody) => {
        alert("Error al generar la solicitud: " + errorBody.message);
      });
    });

    fetch("http://localhost:3000/setearsolicitud", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData2),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "index.html";
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      error.json().then((errorBody) => {
        alert("Error al generar la solicitud: " + errorBody.message);
      });
    });

    
}




function rechazarPrestamo(id) {
  var formData = {
    idsolicitud: id,
  };

  fetch("http://localhost:3000/setearsolicitud", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.ok) {
        alert(
          "Sé Rechazo la solicitud correctamente"
        );
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      error.json().then((errorBody) => {
        alert("Error al generar la solicitud: " + errorBody.message);
      });
    });

}

