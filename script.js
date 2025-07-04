const estudiantes = [];
let editIndex = -1;

document.getElementById('estudianteForm').addEventListener('submit', function (e) {
  e.preventDefault();
  limpiarErrores();

  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const edad = document.getElementById('edad').value.trim();
  const carrera = document.getElementById('carrera').value.trim();
  const correo = document.getElementById('correo').value.trim();

  if (!validarCampos(nombre, apellido, edad, carrera, correo)) return;

  const estudiante = { nombre, apellido, edad, carrera, correo };

  if (editIndex === -1) {
    estudiantes.push(estudiante);
  } else {
    estudiantes[editIndex] = estudiante;
    editIndex = -1;
  }

  mostrarEstudiantes();
  document.getElementById('estudianteForm').reset();
});

function validarCampos(nombre, apellido, edad, carrera, correo) {
  let valido = true;

  if (nombre === '') {
    mostrarError('errorNombre', 'El nombre es obligatorio');
    valido = false;
  }

  if (apellido === '') {
    mostrarError('errorApellido', 'El apellido es obligatorio');
    valido = false;
  }

  if (edad === '' || isNaN(edad) || edad <= 0) {
    mostrarError('errorEdad', 'Edad inválida');
    valido = false;
  }

  if (carrera === '') {
    mostrarError('errorCarrera', 'La carrera es obligatoria');
    valido = false;
  }

  if (correo === '' || !correo.includes('@')) {
    mostrarError('errorCorreo', 'Correo inválido');
    valido = false;
  }

  return valido;
}

function mostrarError(id, mensaje) {
  document.getElementById(id).textContent = mensaje;
}

function limpiarErrores() {
  const errores = document.querySelectorAll('.error');
  errores.forEach(e => e.textContent = '');
}

function mostrarEstudiantes() {
  const tbody = document.getElementById('tablaEstudiantes');
  tbody.innerHTML = '';

  estudiantes.forEach((est, index) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${est.nombre}</td>
      <td>${est.apellido}</td>
      <td>${est.edad}</td>
      <td>${est.carrera}</td>
      <td>${est.correo}</td>
      <td>
        <button class="action-btn" onclick="editarEstudiante(${index})">Editar</button>
        <button class="action-btn delete-btn" onclick="eliminarEstudiante(${index})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(fila);
  });
}

function editarEstudiante(index) {
  const est = estudiantes[index];
  document.getElementById('nombre').value = est.nombre;
  document.getElementById('apellido').value = est.apellido;
  document.getElementById('edad').value = est.edad;
  document.getElementById('carrera').value = est.carrera;
  document.getElementById('correo').value = est.correo;
  editIndex = index;
}

function eliminarEstudiante(index) {
  if (confirm("¿Seguro que deseas eliminar este estudiante?")) {
    estudiantes.splice(index, 1);
    mostrarEstudiantes();
  }
}