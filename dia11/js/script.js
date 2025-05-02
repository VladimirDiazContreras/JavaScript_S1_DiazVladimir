const API_URL = 'https://6813a6ea129f6313e211f47a.mockapi.io/api1/restaurante/menu';

const platoForm = document.getElementById("platoForm");
const nombreInput = document.getElementById("nombre");
const categoriaInput = document.getElementById("categoria");
const precioInput = document.getElementById("precio");
const descripcionInput = document.getElementById("descripcion");
const imagenInput = document.getElementById("imagen");
const tablaPlatos = document.getElementById("tablaPlatos");

let editando = false;
let idEditar = null;

function cargarDatos() {
  axios.get(API_URL)
    .then(response => renderizarTabla(response.data))
    .catch(error => console.error('Error al cargar los datos:', error));
}
function cargarDatos2() {
  axios.get(API_URL)
    .then(response => {
      console.log('Datos obtenidos de la API:', response.data); // <- aquí el log
      renderizarTabla(response.data);
    })
    .catch(error => console.error('Error al cargar los datos:', error));
}

function renderizarTabla(platos) {
  tablaPlatos.innerHTML = "";
  platos.forEach(plato => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><img src="${plato.imagen}" alt="${plato.nombre}" class="img-fluid" style="max-width: 100px;" /></td>
      <td>${plato.nombre}</td>
      <td>${plato.categoria}</td>
      <td>${parseFloat(plato.precio).toLocaleString("es-CO", { style: "currency", currency: "COP" })}</td>
      <td>${plato.descripcion}</td>
      <td>
        <button class="btn btn-sm btn-warning me-2" onclick="editarPlato('${plato.id}')">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarPlato('${plato.id}')">Eliminar</button>
      </td>
    `;
    tablaPlatos.appendChild(fila);
  });
}

platoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nuevoPlato = {
    nombre: nombreInput.value.trim(),
    categoria: categoriaInput.value.trim(),
    precio: parseFloat(precioInput.value),
    descripcion: descripcionInput.value.trim(),
    imagen: imagenInput.value.trim()
  };

  if (editando) {
    axios.put(`${API_URL}/${idEditar}`, nuevoPlato)
      .then(() => {
        cargarDatos();
        platoForm.reset();
        editando = false;
        idEditar = null;
      })
      .catch(error => console.error('Error al actualizar:', error));
  } else {
    axios.post(API_URL, nuevoPlato)
      .then(() => {
        cargarDatos();
        platoForm.reset();
      })
      .catch(error => console.error('Error al agregar:', error));
  }
});

function editarPlato(id) {
  axios.get(`${API_URL}/${id}`)
    .then(response => {
      const plato = response.data;
      nombreInput.value = plato.nombre;
      categoriaInput.value = plato.categoria;
      precioInput.value = plato.precio;
      descripcionInput.value = plato.descripcion;
      imagenInput.value = plato.imagen;
      editando = true;
      idEditar = id;
    })
    .catch(error => console.error('Error al obtener plato:', error));
}

function eliminarPlato(id) {
  if (confirm("¿Eliminar este plato?")) {
    axios.delete(`${API_URL}/${id}`)
      .then(() => cargarDatos())
      .catch(error => console.error('Error al eliminar:', error));
  }
}

cargarDatos();
cargarDatos2();