const express = require('express');
const router = express.Router();

const appointmentGateController = require('../controllers/gateappointmentcontroller');

// Get all visitrupavahinigates
router.get('/appointmentgate', appointmentGateController.getAllAppointmentgates);


// Create a new visitrupavahinigate
router.post('/creategateappointment', appointmentGateController.creategateappointment);

router.get('/:visitorName/:currentDate', appointmentGateController.getAllappointmentgatesByVisitorNameAndCurrentDate);


module.exports = router;