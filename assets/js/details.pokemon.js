const previousButton = document.getElementById('previous')
const nextButton = document.querySelector('#next')
const content = document.querySelector('.content-pokemon')
const navbar = document.querySelector('navbar')
const maxRecords = 151;






function convertPokemonToLi(pokemon) {
    return `
           <img src="${pokemon.photo}" alt="${pokemon.name}">
           <h1 class="name">${pokemon.name}  <span class="numPokemon">#${pokemon.number}</span></h1>
              
                  <ol class="types"> ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}</ol>
  
                  <div class="pokemon-detail-footer">
                  <ul class="stats-container">
                    <h2>Stats</h2>
                    ${Object.entries(pokemon.stats).map(([statName]) =>
                          `<li class='stats'>
                        <p>${statName}</p>
                        <p>${pokemon.stats[statName].base_stat}</p>
                        <span class='progress-bar dark'>
                        <span style="width: ${pokemon.stats[statName].base_stat > 100 ? 100 : pokemon.stats[statName].base_stat}%" 
                            class='progress ${pokemon.type}'/></span>
                      </li>`).join("")}
                  </ul>
                </div>
    
        `
}