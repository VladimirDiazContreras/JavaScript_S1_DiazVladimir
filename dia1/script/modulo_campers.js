
export function moduloCampers() {
    const campers = [
      { id: "1", nombre: "Juan", riesgo: "medio" },
      { id: "2", nombre: "Ana", riesgo: "alto" }
    ];
  
    const id = prompt("Ingresa tu número de identificación:");
    const camper = campers.find(c => c.id === id);
  
    if (!camper) {
      alert("Camper no encontrado");
      return;
    }
  
    alert(`Bienvenido/a ${camper.nombre}`);
  
    while (true) {
      const opcion = prompt("Menú Camper:\n1. Ver riesgo\n2. Modificar riesgo\n3. Salir");
  
      if (opcion === "1") {
        alert(`Tu nivel de riesgo es: ${camper.riesgo}`);
      } else if (opcion === "2") {
        camper.riesgo = prompt("Nuevo riesgo (alto/medio/bajo):");
        alert("Riesgo actualizado");
      } else if (opcion === "3") {
        break;
      } else {
        alert("Opción inválida");
      }
    }
  }