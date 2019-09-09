'use strict';

var _express = require('express');

var _users = require('./users');
var _chat = require('./chat');

var router = _express.Router();

// Add USERS Routes
router.use(_users);
router.use(_chat);

module.exports = router;