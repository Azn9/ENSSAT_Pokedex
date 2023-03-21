const fs = require("fs");

let pokemons = [];
let oldSize = 0;

function run() {
    fs.readFile('pokemondb.json', 'utf8', function(err, data) {
        console.log(err);
        console.log(data);

        if (err) {
            if (err.code === 'ENOENT') {
                console.log('Creating new pokemondb.json file');

                fs.writeFile('pokemondb.json', JSON.stringify([]), function (err) {
                    if (err) throw err;

                    console.log('pokemondb.json created');
                });

                return;
            }

            if (err) throw err;
        } else if (data) {
            console.log('Loading pokemons from pokemondb.json');

            pokemons = JSON.parse(data);

            console.log('Loaded pokemons: ', pokemons);
        }
    });

    setInterval(() => {
        let length = pokemons.length;

        if (length !== oldSize) {
            fs.writeFile('pokemondb.json', JSON.stringify(pokemons), function (err) {
                if (err) throw err;

                console.log('pokemondb.json saved');
            });
        }

        oldSize = length;
    }, 1000);
}

function getPokemons() {
    return pokemons;
}

function getPokemonById(id) {
    if (isNaN(id)) {
        throw new Error('Invalid id');
    }

    return pokemons.find(p => p.id === Number(id));
}

function addPokemon(name, description, type, ability) {
    const pokemon = {
        id: pokemons.length + 1,
        name,
        description,
        type,
        ability
    };

    pokemons.push(pokemon);

    console.log('Added pokemon: ', pokemon);
}

function updatePokemon(id, name, description, type, ability) {
    if (isNaN(id)) {
        throw new Error('Invalid id');
    }

    const pokemon = pokemons.find(p => p.id === Number(id));

    if (pokemon) {
        pokemon.name = name;
        pokemon.description = description;
        pokemon.type = type;
        pokemon.ability = ability;
    } else {
        throw new Error('Pokemon not found');
    }
}

function deletePokemon(id) {
    if (isNaN(id)) {
        throw new Error('Invalid id');
    }

    const index = pokemons.findIndex(p => p.id === Number(id));

    if (index !== -1) {
        pokemons.splice(index, 1);
    } else {
        throw new Error('Pokemon not found');
    }
}

module.exports = { run, getPokemons, getPokemonById, addPokemon, updatePokemon, deletePokemon };
