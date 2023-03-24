const express = require('express');
const router = express.Router();
const db = require('../app/db');

// GET /delete
router.get('/', function (req, res, next) {
    const id = req.query.id;

    if (undefined === id || isNaN(id)) { // Check if the id is a number
        return res.status(400).send('Invalid id');
    }

    // Delete the pokemon with the given id
    db.deletePokemon(id);

    // Redirect to the home page
    res.redirect('/');
});

// Export the router
module.exports = router;
