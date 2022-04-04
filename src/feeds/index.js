const express = require('express');
const router = express.Router();
const feedsController = require('./feeds.controller');

router.use('/', feedsController);

module.exports = router;