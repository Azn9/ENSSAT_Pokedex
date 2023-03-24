const express = require('express');
const router = express.Router();
const db = require('../app/db');

// GET /
router.get('/', function (req, res, next) {
    let pageid = req.query.page;

    if (undefined === pageid || isNaN(pageid) || pageid < 1) { // Check if the page is a number
        return res.status(400).send('Invalid pageid');
    }

    pageid = Number(pageid); // Convert the pageid to a number

    // Get the pokemon array
    let pokemonArray = db.getPokemons();

    // Calculate the page count
    const maxPage = Math.ceil(pokemonArray.length / 10);
    if (pageid > maxPage) { // Check if the pageid is greater than the max page
        pageid = maxPage;
    }

    // Calculate the low and high index
    const lowIndex = (pageid - 1) * 10;
    const highIndex = Math.min(lowIndex + 10, pokemonArray.length);

    // Set the page title
    let pageTitle = "";
    if (pokemonArray.length > 10) {
        pageTitle = "Page #" + pageid;
    }

    // Show the index page
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

// Export the router
module.exports = router;
