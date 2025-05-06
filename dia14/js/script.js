const API_URL = 'https://6813a6ea129f6313e211f47a.mockapi.io/api1/restaurante/superheroes';

const form = document.getElementById("heroeForm");
const nombrePersonajeInput = document.getElementById("nombrePersonaje");
const nombreActorInput = document.getElementById("nombreActor");
const edadActorInput = document.getElementById("edadActor");
const ubicacionInput = document.getElementById("ubicacion");
const posterInput = document.getElementById("poster");
const productoraInput = document.getElementById("productora");
const fechaInput = document.getElementById("fecha");

let editando = false;
let idEditar = null;

function cargarDatos() {
  axios.get(API_URL)
    .then(response => renderizarTabla(response.data))
    .catch(error => console.error('Error al cargar los datos:', error));
}

function renderizarTabla(heroes) {
  const tabla = document.getElementById("tablaPlatos");
  if (!tabla) return;

  tabla.innerHTML = "";
  heroes.forEach(heroe => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><img src="${heroe.poster}" alt="${heroe.nombrePersonaje}" class="img-fluid" style="max-width: 100px;" /></td>
      <td>${heroe.nombrePersonaje}</td>
      <td>${heroe.nombreActor}</td>
      <td>${heroe.edadActor}</td>
      <td>${heroe.ubicacion}</td>
      <td>${heroe.fecha}</td>
      <td>
        <button class="btn btn-sm btn-warning me-2" onclick="editarHeroe('${heroe.id}')">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarHeroe('${heroe.id}')">Eliminar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nuevoHeroe = {
    nombrePersonaje: nombrePersonajeInput.value.trim(),
    nombreActor: nombreActorInput.value.trim(),
    edadActor: parseInt(edadActorInput.value),
    ubicacion: ubicacionInput.value.trim(),
    poster: posterInput.value.trim(),
    productora: productoraInput.value.trim(),
    fecha: fechaInput.value.trim()
  };

  if (editando) {
    axios.put(`${API_URL}/${idEditar}`, nuevoHeroe)
      .then(() => {
        cargarDatos();
        form.reset();
        editando = false;
        idEditar = null;
      })
      .catch(error => console.error('Error al actualizar:', error));
  } else {
    axios.post(API_URL, nuevoHeroe)
      .then(() => {
        cargarDatos();
        form.reset();
      })
      .catch(error => console.error('Error al agregar:', error));
  }
});

function editarHeroe(id) {
  axios.get(`${API_URL}/${id}`)
    .then(response => {
      const heroe = response.data;
      nombrePersonajeInput.value = heroe.nombrePersonaje;
      nombreActorInput.value = heroe.nombreActor;
      edadActorInput.value = heroe.edadActor;
      ubicacionInput.value = heroe.ubicacion;
      posterInput.value = heroe.poster;
      productoraInput.value = heroe.productora;
      fechaInput.value = heroe.fecha;
      editando = true;
      idEditar = id;
    })
    .catch(error => console.error('Error al obtener héroe:', error));
}

function eliminarHeroe(id) {
  if (confirm("¿Eliminar este héroe?")) {
    axios.delete(`${API_URL}/${id}`)
      .then(() => cargarDatos())
      .catch(error => console.error('Error al eliminar:', error));
  }
}

// Crear tabla si no existe
if (!document.getElementById("tablaPlatos")) {
  const contenedor = document.querySelector(".container");
  const tablaHTML = `
    <div class="table-responsive mt-5">
      <table class="table table-bordered table-hover">
        <thead class="table-dark">
          <tr>
            <th>Poster</th>
            <th>Personaje</th>
            <th>Actor</th>
            <th>Edad</th>
            <th>Ubicación</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="tablaPlatos"></tbody>
      </table>
    </div>
  `;
  contenedor.insertAdjacentHTML("beforeend", tablaHTML);
}

cargarDatos();
