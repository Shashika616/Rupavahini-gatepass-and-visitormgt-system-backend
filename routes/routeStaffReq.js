const express = require('express');
const router = express.Router();

const staffRequestController = require('../controllers/staffrequestcontroller');

router.post('/create', staffRequestController.createStaffRequest);
router.get('/get/:empID', staffRequestController.getStaffRequestByID);
router.get('/get/:empID/:currentDate', staffRequestController.getStaffRequestByIDAndDate);
router.get('/get/:empID/today', staffRequestController.getStaffRequestByIDAndToday);

// Route to get requests by year
router.get('/requests/:year', staffRequestController.getRequestsByYear);

// Route to get requests by year and month
router.get('/requests/:year/:month', staffRequestController.getRequestsByYearAndMonth);

// Route to get requests by year, month, and day
router.get('/requests/:year/:month/:day', staffRequestController.getRequestsByYearMonthAndDay);

module.exports = router;
