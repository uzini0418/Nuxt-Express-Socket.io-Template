'use strict';

var _express = require('express');

var router = _express.Router();

// Mock Rooms
const rooms = [
  { id: '0001', title: 'room1' },
  { id: '0002', title: 'room2' },
  { id: '0003', title: 'room3' },
  { id: '0004', title: 'room4' },
];

/* GET chatting room listing. */
router.get('/rooms', function (req, res, next) {
  res.json(rooms)
});

module.exports = router;
