const express = require('express');
const router = express.Router();
const feeds = require('../feeds');

router.use('/', feeds);

module.exports = router;