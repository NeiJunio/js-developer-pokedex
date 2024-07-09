const pokemonList = document.getElementById('pokemonList');
const modalContent = document.getElementById('modal-content');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151; // Limitar somente na 1ª geração dos pokemons
const limit = 10;
let offset = 0;
let pokemons = []; // Array para armazenar todos os Pokémon carregados

// Função para carregar os itens de Pokémon
function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((newPokemons) => {
        pokemons = [...pokemons, ...newPokemons]; // Adicionar novos Pokémon ao array

        const newHtml = newPokemons.map((pokemon) => 
            `<li class="pokemon ${pokemon.type}" data-number="${pokemon.number}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map(type => <li class="type ${type}">${type}</li>).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>`
        ).join('');

        pokemonList.innerHTML += newHtml;

        // Atualizar event listeners para todos os elementos de Pokémon
        updatePokemonEventListeners();
    });
}

// Função para atualizar event listeners de Pokémon
function updatePokemonEventListeners() {
    const pokemonElements = pokemonList.querySelectorAll('.pokemon');
    pokemonElements.forEach((element) => {
        element.addEventListener('click', () => {
            const pokemonNumber = element.getAttribute('data-number');
            const pokemon = pokemons.find(p => p.number === parseInt(pokemonNumber));
            if (pokemon) {
                openModal(pokemon);
            }
        });
    });
}

// Inicialmente carregar os primeiros Pokémon
loadPokemonItems(offset, limit);

// Event listener para o botão "Carregar Mais"
loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const remainingRecords = maxRecords - offset;
    const newLimit = remainingRecords > limit ? limit : remainingRecords;

    // Carregar mais Pokémon
    loadPokemonItems(offset, newLimit);

    // Remover o botão "Carregar Mais" se atingir o limite máximo
    if (offset >= maxRecords) {
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }
});

// Função para abrir o modal com as informações do Pokémon
function openModal(pokemon) {
    const htmlModal = `
        <div class="modal">
            <div class="modal-header">
                <img src="assets/icons/arrow-left.svg" alt="arrow-left" class="arrow-icon" onclick="closeModal()">
                <span class="number-pokemon">#${pokemon.number}</span>
                <img src="assets/icons/heart-favorite.svg" alt="heart-favorite">
            </div>

            <div class="modal-body">
                <div class="modal-info ${pokemon.type}">
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map(type => <li class="type ${type}">${type}</li>).join('')}
                        </ol>
                        <div class="detail-img">
                            <img src="${pokemon.photo}" alt="${pokemon.name}">
                        </div>
                    </div>
                </div>

                <div class="modal-statistic"></div>
            </div>
            <div class="modal-footer">
                <button class="close" onclick="closeModal()">Fechar</button>
            </div>
        </div>`;

    modalContent.innerHTML = htmlModal;
    modalContent.classList.remove('hidden');

    // Obter referência ao botão closeButton depois que o modal é aberto
    const closeButton = modalContent.querySelector('.close');
    closeButton.addEventListener('click', closeModal);
}

function closeModal() {
    modalContent.classList.add('hidden');
}