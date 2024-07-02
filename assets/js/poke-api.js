
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.description = infoSpecies?.flavor_text_entries[0]?.flavor_text
  
    pokemon.stats.hp = pokeDetail.stats.find((item) => item.stat.name === 'hp')
    pokemon.stats.atk = pokeDetail.stats.find((item) => item.stat.name === 'attack')

    pokemon.stats.def = pokeDetail.stats.find((item) => item.stat.name === 'defense')
    pokemon.stats.sAtk = pokeDetail.stats.find((item) => item.stat.name === 'special-attack')

    pokemon.stats.sDef = pokeDetail.stats.find((item) => item.stat.name === 'special-defense')
    pokemon.stats.spd = pokeDetail.stats.find((item) => item.stat.name === 'speed')

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonsDetails) => pokemonsDetails)
}