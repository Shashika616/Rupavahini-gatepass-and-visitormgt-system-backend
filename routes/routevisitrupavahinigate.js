const express = require('express');
const router = express.Router();

const visitrupavahinigateController = require('../controllers/gatevisitrupavahinicontroller');

// Get all visitrupavahinigates
router.get('/visitrupavahinigate', visitrupavahinigateController.getAllVisitrupavahinigates);


// Create a new visitrupavahinigate
router.post('/creategatevisitrupavahini', visitrupavahinigateController.creategatevisitrupavahini);

router.get('/:orgName/:currentDate', visitrupavahinigateController.getAllVisitrupavahinigatesByOrgNameAndCurrentDate);


module.exports = router;