const express = require('express');
const router = express.Router();
const { getexecstaff } = require('../controllers/execstaffcontroller');


router.get('/execstaff', getexecstaff);

module.exports = router;