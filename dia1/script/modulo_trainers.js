export function moduloTrainers() {
    const trainers = [
      { id: "123", nombre: "Pedro", apellido: "Gómez", grupo: "S1" },
      { id: "456", nombre: "Laura", apellido: "Díaz", grupo: "M1" }
    ];
  
    const id = prompt("Ingresa tu número de identificación:");
    const trainer = trainers.find(t => t.id === id);
  
    if (!trainer) {
      alert("Trainer no encontrado");
      return;
    }
  
    alert(`Bienvenido/a ${trainer.nombre} ${trainer.apellido}`);
  
    while (true) {
      const opcion = prompt("Menú Trainer:\n1. Ver datos\n2. Modificar nombre\n3. Salir");
  
      if (opcion === "1") {
        alert(`Nombre: ${trainer.nombre}\nApellido: ${trainer.apellido}\nGrupo: ${trainer.grupo}`);
      } else if (opcion === "2") {
        trainer.nombre = prompt("Nuevo nombre:");
        alert("Nombre actualizado");
      } else if (opcion === "3") {
        break;
      } else {
        alert("Opción inválida");
      }
    }
  }