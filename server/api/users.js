'use strict';

var _express = require('express');

var router = _express.Router();

// Mock Users
const users = [
    { name: 'Alexandre' },
    { name: 'Pooya' },
    { name: 'Sébastien' },
];

/* GET users listing. */
router.get('/users', function (req, res, next) {
    res.json(users)
});

/* GET user by ID. */
router.get('/users/:id', function (req, res, next) {
    const id = parseInt(req.params.id)
    if (id >= 0 && id < users.length) {
        res.json(users[id])
    } else {
        res.sendStatus(404)
    }
})

/* SET user. */
router.get('/set-user/:id', function (req, res) {
    const id = parseInt(req.params.id)
    console.log(id)

    res.json({id: id, data: users[id]})
})

module.exports = router;
