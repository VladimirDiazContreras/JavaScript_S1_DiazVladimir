let Nombrepoke = document.querySelector('.Nombre');
let Numeropoke = document.querySelector('.Numero');
let Pokemon = document.querySelector('.Pokemon');
let form = document.querySelector('.formulario');
let prev = document.getElementById("previo");
let next = document.getElementById("siguiente");
let id_pokemon = 1;

const fetchPokemon = async function(pokemon){
    const estado = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(estado.status == 200){
        const data = await estado.json();
        return data;
    }
}

const pokemoname= async (pokemon) => {
    Nombrepoke.innerHTML = 'Loading...';


    const data = await fetchPokemon(pokemon);

    if (data){
      
        Nombrepoke.innerHTML=data.name;
        Numeropoke.innerHTML = data.id;
        Pokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        respuesta.value='';
        id_pokemon=data.id;
    }else{
        Pokemon.style.display='none';
        Nombrepoke.innerHTML="Not Found";
     
    }
}
form.addEventListener('submit', function(event){
    
    let respuesta = document.getElementById("busqueda");
    event.preventDefault();
    pokemoname(respuesta.value.toLowerCase());
})


prev.addEventListener('click',function(){
    
    if (id_pokemon >1){
        id_pokemon -= 1;
        pokemoname(id_pokemon);
    }
});

next.addEventListener('click',()=>{

    
        id_pokemon += 1;
        pokemoname(id_pokemon);
    
});

pokemoname(id_pokemon);