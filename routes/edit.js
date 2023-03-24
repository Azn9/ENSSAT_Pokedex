const express = require('express');
const router = express.Router();
const db = require('../app/db');

// GET /edit
router.get('/', function (req, res, next) {
    const id = req.query.id;
    let previousPage = req.query.previousPage;

    if (undefined === id || isNaN(id)) { // Check if the id is a number
        return res.status(400).send('Invalid id');
    }

    if (undefined === previousPage || isNaN(previousPage)) { // Check if the previous page is a number
        previousPage = 1;
    }

    // Get the pokemon with the given id
    const pokemon = db.getPokemonById(id);

    // Show the edit page
    res.render('pages/edit', {
        pokemon: pokemon,
        previousPage: previousPage,
        types: db.getTypes(),
        abilities: db.getAbilities()
    });
});

// POST /edit
router.post('/', function (req, res, next) {
    const id = req.body.id;
    let previousPage = req.body.previousPage;

    const name = req.body.name;
    const description = req.body.description;
    const type = req.body.type;
    const ability = req.body.ability;

    if (undefined === id || isNaN(id)) { // Check if the id is a number
        return res.status(400).send('Invalid id');
    }

    if (undefined === previousPage || isNaN(previousPage)) { // Check if the previous page is a number
        previousPage = 1;
    }

    // Update the pokemon with the given id
    db.updatePokemon(id, name, description, type, ability);

    // Redirect to the home page
    res.redirect('/?page=' + previousPage);
});

// Export the router
module.exports = router;
