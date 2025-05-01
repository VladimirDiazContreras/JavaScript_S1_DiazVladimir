
const datosIniciales = [
    {
      id: 1,
      categoria: "Entradas",
      nombre: "Empanadas Colombianas",
      descripcion: "Deliciosas empanadas rellenas de carne o pollo, acompañadas de ají.",
      precio: 8000,
      imagen: "https://elmachetico.co/cdn/shop/products/Empanadas_El_Machetico_Empanada_de_papa_y_carne_x_10_unidades_2.jpg?v=1633958068",
    },
    {
      id: 2,
      categoria: "Platos Fuertes",
      nombre: "Bandeja Paisa",
      descripcion: "Arroz, frijoles, carne molida, chicharrón, huevo frito, plátano maduro, aguacate y arepa.",
      precio: 25000,
      imagen: "https://cdn.colombia.com/gastronomia/2011/08/02/bandeja-paisa-1616.gif",
    },
    {
      id: 3,
      categoria: "Platos Fuertes",
      nombre: "Ajiaco Santafereño",
      descripcion: "Sopa espesa de pollo, papas, maíz y guascas, servida con crema de leche, alcaparras y aguacate.",
      precio: 22000,
      imagen: "https://www.recetasnestle.com.co/sites/default/files/srh_recipes/f78cf6630b31638994b09b3b470b085c.jpg",
    },
    {
      id: 4,
      categoria: "Bebidas",
      nombre: "Jugo de Lulo",
      descripcion: "Refrescante jugo natural de lulo.",
      precio: 5000,
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTziM8BecWTSto9Kah2u_mwlsW2iEMWdoc3xA&s",
    },
    {
      id: 5,
      categoria: "Postres",
      nombre: "Arroz con Leche",
      descripcion: "Clásico postre de arroz con leche y canela.",
      precio: 6000,
      imagen: "https://i.blogs.es/3bdbe2/arroz-con-leche/1366_2000.jpg",
    },
    {
      id: 6,
      categoria: "Entradas",
      nombre: "Patacones con Hogao",
      descripcion: "Plátanos verdes fritos y aplastados, cubiertos con hogao (salsa de tomate y cebolla).",
      precio: 7000,
      imagen: "https://adnamerica.com/sites/default/files/styles/social_media/public/2023-05/Patacones%20con%20hogao.jpg?itok=tBVeOCrl",
    }
  ];
  
 
  const platoForm = document.getElementById("platoForm");
  const nombreInput = document.getElementById("nombre");
  const categoriaInput = document.getElementById("categoria");
  const precioInput = document.getElementById("precio");
  const descripcionInput = document.getElementById("descripcion");
  const imagenInput = document.getElementById("imagen");
  const tablaPlatos = document.getElementById("tablaPlatos");
  
  let platos = [];
  let editando = false;
  let idEditar = null;
  
 
  function cargarDatos() {
    const datosGuardados = localStorage.getItem("platos");
    if (datosGuardados) {
      platos = JSON.parse(datosGuardados);
    } else {
      platos = datosIniciales;
      localStorage.setItem("platos", JSON.stringify(platos));
    }
    renderizarTabla();
  }
  
  
  function guardarDatos() {
    localStorage.setItem("platos", JSON.stringify(platos));
  }
  
  
  function renderizarTabla() {
    tablaPlatos.innerHTML = "";
    platos.forEach((plato) => {
      const fila = document.createElement("tr");
  
      const celdaImagen = document.createElement("td");
      const img = document.createElement("img");
      img.src = plato.imagen;
      img.alt = plato.nombre;
      img.classList.add("img-fluid");
      celdaImagen.appendChild(img);
      fila.appendChild(celdaImagen);
  
      fila.innerHTML += `
        <td>${plato.nombre}</td>
        <td>${plato.categoria}</td>
        <td>${plato.precio.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</td>
        <td>${plato.descripcion}</td>
        <td>
          <button class="btn btn-sm btn-warning me-2" onclick="editarPlato(${plato.id})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarPlato(${plato.id})">Eliminar</button>
        </td>
      `;
      tablaPlatos.appendChild(fila);
    });
  }
  

  platoForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const nombre = nombreInput.value.trim();
    const categoria = categoriaInput.value.trim();
    const precio = parseFloat(precioInput.value);
    const descripcion = descripcionInput.value.trim();
    const imagen = imagenInput.value.trim();
  
    if (!nombre || !categoria || !precio || !descripcion || !imagen) {
      alert("Por favor, completa todos los campos.");
      return;
    }
  
    if (editando) {
      
      platos = platos.map((plato) =>
        plato.id === idEditar
          ? { id: idEditar, nombre, categoria, precio, descripcion, imagen }
          : plato
      );
      editando = false;
      idEditar = null;
    } else {
      
      const nuevoPlato = {
        id: Date.now(),
        nombre,
        categoria,
        precio,
        descripcion,
        imagen,
      };
      platos.push(nuevoPlato);
    }
  
    guardarDatos();
    renderizarTabla();
    platoForm.reset();
  });
  

  function editarPlato(id) {
    const plato = platos.find((p) => p.id === id);
    if (!plato) return;
  
    nombreInput.value = plato.nombre;
    categoriaInput.value = plato.categoria;
    precioInput.value = plato.precio;
    descripcionInput.value = plato.descripcion;
    imagenInput.value = plato.imagen;
  
    editando = true;
    idEditar = id;
  }
  

  function eliminarPlato(id) {
    if (confirm("¿Estás seguro de eliminar este plato?")) {
      platos = platos.filter((p) => p.id !== id);
      guardarDatos();
      renderizarTabla();
    }
  }
  
  
  cargarDatos();
  