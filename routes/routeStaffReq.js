const express = require('express');
const router = express.Router();

const staffRequestController = require('../controllers/staffrequestcontroller');

router.post('/create', staffRequestController.createStaffRequest);
router.get('/get/:empID', staffRequestController.getStaffRequestByID);
router.get('/get/:empID/:currentDate', staffRequestController.getStaffRequestByIDAndDate);
router.get('/get/:empID/today', staffRequestController.getStaffRequestByIDAndToday);

module.exports = router;
