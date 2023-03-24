const fs = require("fs");
const fetch = require("node-fetch");

/* Data arrays */
let pokemons = [];
let abilities = [];
let types = [];

/* Functions */
function run() {
    // Load the abilities
    fs.readFile('data/abilities.json', 'utf8', function (err, data) {
        if (err) throw err;

        if (data) {
            abilities = JSON.parse(data);
        } else {
            throw new Error('abilities.json is empty');
        }
    });

    // Load the types
    fs.readFile('data/types.json', 'utf8', function (err, data) {
        if (err) throw err;

        if (data) {
            types = JSON.parse(data);
        } else {
            throw new Error('types.json is empty');
        }
    });

    // Load the pokemons
    fs.readFile('data/pokemondb.json', 'utf8', function (err, data) {
        if (err) {

            // If file does not exist, create it
            if (err.code === 'ENOENT') {
                fs.writeFile('data/pokemondb.json', JSON.stringify([]), function (err) {
                    if (err) throw err;
                });

                return;
            }

            if (err) throw err;
        } else if (data) {
            pokemons = JSON.parse(data);
        }
    });
}

// Save the pokemons to the file
function savePokemons() {
    fs.writeFile('data/pokemondb.json', JSON.stringify(pokemons), function (err) {
        if (err) throw err;
    });
}

// Return the pokemons
function getPokemons() {
    return pokemons;
}

// Return the types
function getTypes() {
    return types;
}

// Return the abilities
function getAbilities() {
    return abilities;
}

// Return the pokemon with the given id
function getPokemonById(id) {
    if (isNaN(id)) { // Check if id is a number
        throw new Error('Invalid id');
    }

    return pokemons.find(p => p.id === Number(id));
}

// Create a new pokemon
async function addPokemon(name, description, type, ability) {
    let id;

    // Generate a random id
    do {
        id = Math.floor(Math.random() * 10263); // 10263 is the number of pokemons in the pokeapi

        // check if image exists - https://github.com/PokeAPI/sprites/tree/master/sprites/pokemon
        // test if fetch returns 404 or 200
        // We need to use await here, as we need to wait for the fetch to complete
        // We want a random id that has an image to display
        await fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`)
            .then(response => {
                console.log(response.status);
                const val = Number(response.status) === 200;
                console.log(val);

                return val;
            })
            .then(value => {
                if (!value)
                    id = -1; // if image does not exist, set id to -1, to loop again
            });
    } while (id === -1 || pokemons.find(p => p.id === id)); // loop until id is not -1 and id is not already in the pokemons array

    // Create the pokemon
    const pokemon = {
        id: id,
        name,
        description,
        type,
        ability
    };

    // Add the pokemon to the array
    pokemons.push(pokemon);

    // Save the pokemons to the file
    savePokemons();
}

// Update the pokemon with the given id
function updatePokemon(id, name, description, type, ability) {
    if (isNaN(id)) { // Check if id is a number
        throw new Error('Invalid id');
    }

    const pokemon = pokemons.find(p => p.id === Number(id)); // Find the pokemon with the given id

    if (pokemon) { // If pokemon exists, update it
        pokemon.name = name;
        pokemon.description = description;
        pokemon.type = type;
        pokemon.ability = ability;
    } else { // If pokemon does not exist, throw an error
        throw new Error('Pokemon not found');
    }

    // Save the pokemons to the file
    savePokemons();
}

// Delete the pokemon with the given id
function deletePokemon(id) {
    if (isNaN(id)) { // Check if id is a number
        throw new Error('Invalid id');
    }

    // Find the index of the pokemon with the given id
    const index = pokemons.findIndex(p => p.id === Number(id));

    if (index !== -1) { // If pokemon exists, delete it
        pokemons.splice(index, 1);
    } else { // If pokemon does not exist, throw an error
        throw new Error('Pokemon not found');
    }

    // Save the pokemons to the file
    savePokemons();
}

// Export the functions
module.exports = {
    run,
    getPokemons,
    getTypes,
    getAbilities,
    getPokemonById,
    addPokemon,
    updatePokemon,
    deletePokemon
};
