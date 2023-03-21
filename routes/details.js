const express = require('express');
const router = express.Router();
const db = require('../app/db');

router.get('/:id', function (req, res, next) {
    const id = req.params.id;
    const previousPage = req.query.previousPage ?? 1;

    console.log("id: " + id);

    if (isNaN(id)) {
        return res.status(400).send('Invalid id');
    }

    const pokemon = db.getPokemonById(id);

    console.log(pokemon);

    res.render('pages/details', {
        pokemon: pokemon,
        previousPage: previousPage
    });
});

module.exports = router;
