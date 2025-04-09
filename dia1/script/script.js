import { moduloTrainers } from "./modulo_trainers.js";
import { moduloCampers } from "./modulo_campers.js";
import { moduloCoordinador } from "./modulo_coordinador.js";

function main() {
  while (true) {
    alert("BIENVENIDO A CAMPUSLANDS");
    const opt = prompt("Selecciona el rol:\n1. Trainer\n2. Camper\n3. Coordinador\n(Escribe 'salir' para terminar)");

    if (opt === "salir") break;

    switch (opt) {
      case "1":
        alert("Entraste como Trainer");
        moduloTrainers();
        break;
      case "2":
        alert("Entraste como Camper");
        moduloCampers();
        break;
      case "3":
        alert("Entraste como Coordinador");
        moduloCoordinador();
        break;
      default:
        alert("Opción inválida");
    }
  }
}

main();