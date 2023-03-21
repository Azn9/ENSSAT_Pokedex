const express = require('express');
const router = express.Router();
const db = require('../app/db');

router.get('/', function (req, res, next) {
    res.render('pages/add');
});

router.post('/', function (req, res, next) {
    const name = req.body.name;
    const description = req.body.description;
    const type = req.body.type;
    const ability = req.body.ability;

    console.log(name);
    console.log(description);
    console.log(type);
    console.log(ability);

    db.addPokemon(name, description, type, ability);

    res.redirect('/');
});

module.exports = router;
