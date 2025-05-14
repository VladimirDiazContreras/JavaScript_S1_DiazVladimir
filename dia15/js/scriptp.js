const CLIENT_ID = 'j2ARpxUnKYEAAe2bt7BAYFiibVhvCSOTIzXuSGVJxWYTGrbZjp';
const CLIENT_SECRET = 'tsZaTk6akNOpN4ggRfWjPDveRD0Zvns5LrdkxHzH';

let token = '';
const petList = document.getElementById('pet-list');
const favoriteList = document.getElementById('favorite-list');
const loader = document.getElementById('loader');

// Autenticación
async function getToken() {
  const res = await fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    })
  });
  const data = await res.json();
  token = data.access_token;
  fetchInitialPets();
}

// Mostrar mascotas populares
async function fetchInitialPets() {
  loader.classList.remove('hidden');
  const res = await fetch('https://api.petfinder.com/v2/animals?limit=12', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  renderPets(data.animals, petList);
  loader.classList.add('hidden');
}

// Renderizar lista de mascotas
function renderPets(pets, container) {
  container.innerHTML = '';
  pets.forEach(pet => {
    const photoUrl = pet.photos[0]?.medium || 'https://www.diariodenavarra.es/uploads/2021/02/18/60ae5c9db9f42.jpeg';

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${photoUrl}" alt="${pet.name}" />
      <div class="card-body">
        <h3>${pet.name}</h3>
        <p>${pet.type} - ${pet.breeds.primary}</p>
        <p>${pet.age} - ${pet.contact.address.city || 'Ubicación desconocida'}</p>
        <button class="favorite-btn" onclick="toggleFavorite(
          ${pet.id},
          '${pet.name.replace(/'/g, "\\'")}',
          '${pet.type}',
          '${photoUrl}',
          '${pet.age}'
        )">
          ${isFavorite(pet.id) ? '💖' : '🤍'}
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Favoritos en localStorage
function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
}

function isFavorite(id) {
  return getFavorites().some(pet => pet.id === id);
}

function toggleFavorite(id, name, type, photoUrl, age) {
  const favorites = getFavorites();
  const index = favorites.findIndex(pet => pet.id === id);

  if (index > -1) {
    favorites.splice(index, 1);
    alert(`Quitado de favoritos: ${name}`);
  } else {
    favorites.push({ id, name, type, photoUrl, age });
    alert(`Agregado a favoritos: ${name}`);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
  fetchInitialPets();
  renderFavoriteList();
}

// Renderizar favoritos
function renderFavoriteList() {
  const favorites = getFavorites();
  favoriteList.innerHTML = '';

  if (favorites.length === 0) {
    favoriteList.innerHTML = '<p>No tienes favoritos aún.</p>';
    return;
  }

  favorites.forEach(pet => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${pet.photoUrl}" alt="${pet.name}" />
      <div class="card-body">
        <h3>${pet.name}</h3>
        <p>${pet.type}</p>
        <p>age: ${pet.age}</p>
        <button class="favorite-btn" onclick="toggleFavorite(
          ${pet.id},
          '${pet.name.replace(/'/g, "\\'")}',
          '${pet.type}',
          '${pet.photoUrl}',
          '${pet.age}'
        )">❌ Quitar</button>
      </div>
    `;
    favoriteList.appendChild(div);
  });
}

// Búsqueda
document.getElementById('search').addEventListener('input', async function () {
  const query = this.value.toLowerCase();
  if (query.length < 3) return;
  loader.classList.remove('hidden');
  const res = await fetch(`https://api.petfinder.com/v2/animals?limit=12&location=${query}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  renderPets(data.animals, petList);
  loader.classList.add('hidden');
});

getToken();
renderFavoriteList();
