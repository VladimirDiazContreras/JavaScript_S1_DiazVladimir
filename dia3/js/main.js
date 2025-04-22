import datos from "../data/datos.json" assert { type: "json" };

let indice = 0;

function mostrarPokemon() {
  const p = datos[indice];
  document.getElementById("pokemon-img").src = p.imagen;
  document.getElementById("info").innerHTML = `
    <strong>${p.nombre}</strong><br>
    Tipo: ${p.tipo}
  `;
}

document.getElementById("btn").addEventListener("click", () => {
  indice = (indice + 1) % datos.length;
  mostrarPokemon();
});

mostrarPokemon();
