const express = require('express');
const router = express.Router();
const db = require('../app/db');

router.get('/', function (req, res, next) {
    const id = req.query.id;

    console.log("id: " + id);

    if (isNaN(id)) {
        return res.status(400).send('Invalid id');
    }

    db.deletePokemon(id);

    res.redirect('/');
});

module.exports = router;
