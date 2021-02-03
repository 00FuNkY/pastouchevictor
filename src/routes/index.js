const express = require('express');

const properties = require('./properties');
const royalfamily = require('./royalfamily');
const auth = require('./auth');

const router = express.Router();

router.use('/properties', properties);
router.use('/royalfamily', royalfamily);
router.use('/auth', auth);

module.exports = router;
