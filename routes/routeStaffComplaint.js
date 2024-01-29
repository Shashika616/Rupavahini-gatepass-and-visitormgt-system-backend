const express = require('express');
const router = express.Router();

const staffRequestController = require('../controllers/staffcomplaintcontroller');

router.post('/createcomp',staffRequestController.createStaffComplaint);
router.get('/complaint/:empID',staffRequestController.getStaffComplaintByID);

module.exports = router;