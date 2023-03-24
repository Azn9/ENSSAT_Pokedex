const express = require('express');
const router = express.Router();
const db = require('../app/db');

// GET /add
router.get('/', function (req, res, next) {
    // Show the add page
    res.render('pages/add', {
        types: db.getTypes(),
        abilities: db.getAbilities()
    });
});

// POST /add
router.post('/', function (req, res, next) {
    // Get the data from the form
    const name = req.body.name;
    const description = req.body.description;
    const type = req.body.type;
    const ability = req.body.ability;

    // Add the pokemon to the database
    // This function is asynchronous, as we need to wait for fetches to complete
    db.addPokemon(name, description, type, ability).then(() => {
        // Redirect to the home page
        res.redirect('/');
    });
});

// Export the router
module.exports = router;
