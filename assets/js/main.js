const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const modalContent = document.querySelector('.modal-content');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close');


function openModal(pokemon) {
    const numberPokemon = document.getElementById('number-pokemon');
    const name = modal.querySelector('.name');
    const types = modal.querySelector('.types');
    // const modalImage = modal.querySelector('.modal-header img');
    
    numberPokemon.textContent = `#${pokemon.number}`;
    name.textContent = pokemon.name;
    types.innerHTML = pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('');
    // modalImage.src = pokemon.photo;
    // modalImage.alt = pokemon.name;
    
    modalContent.classList.remove('hidden');
}

function closeModal() {
    modalContent.classList.add('hidden');
}

const maxRecords = 151; // Limitar somente na 1ª geração dos pokemons
const limit = 10;
let offset = 0;
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => 
            `<li class="pokemon ${pokemon.type}" data-number="${pokemon.number}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>`
        ).join('');

        pokemonList.innerHTML += newHtml;

        const pokemonElements = pokemonList.querySelectorAll('.pokemon');
        pokemonElements.forEach((element, index) => {
            element.addEventListener('click', () => openModal(pokemons[index]));
        });
    });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtRecordNexPage = offset + limit;

    if (qtRecordNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});

closeButton.addEventListener('click', closeModal);
