
export function moduloCoordinador() {
    
    alert("Bienvenido Coordinador");
  
    while (true) {
      const opcion = prompt("Menú Coordinador:\n1. Ver trainers\n2. Ver campers\n3. Salir");
  
      if (opcion === "1") {
        alert("Trainers:\nPedro Gómez\nLaura Díaz");
      } else if (opcion === "2") {
        alert("Campers:\nJuan\nAna");
      } else if (opcion === "3") {
        break;
      } else {
        alert("Opción inválida");
      }
    }
  }