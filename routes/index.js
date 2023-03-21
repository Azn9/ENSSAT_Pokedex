const express = require('express');
const router = express.Router();
const db = require('../app/db');

/* GET home page. */
router.get('/', function (req, res, next) {
    let pageid = req.query.page ?? 1;

    if (isNaN(pageid) || pageid < 1 || pageid > 10) {
        return res.status(400).send('Invalid pageid');
    }

    pageid = Number(pageid);

    let pokemonArray = db.getPokemons();

    const maxPage = Math.ceil(pokemonArray.length / 10);
    if (pageid > maxPage) {
        pageid = maxPage;
    }

    const lowIndex = (pageid - 1) * 10;
    const highIndex = Math.min(lowIndex + 10, pokemonArray.length);

    let pageTitle = "";
    if (pokemonArray.length > 10) {
        pageTitle = "Page #" + pageid;
    }

    res.render('pages/index', {
        pokemonArray: pokemonArray.slice(lowIndex, highIndex),
        lowIndex: lowIndex + 1,
        highIndex: highIndex,
        total: pokemonArray.length,
        nextPage: (pageid + 1),
        currentPage: pageid,
        previousPage: (pageid - 1),
        pageTitle: pageTitle
    });
});

module.exports = router;
