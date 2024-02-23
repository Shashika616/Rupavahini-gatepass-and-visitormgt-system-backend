const express = require('express');
const router = express.Router();
const {
  createVehicleTracking,
  getAllVehicleTracking,
  deleteVehicleTracking,
  updateVehicleTracking,
} = require('../controllers/securitygatevehiclecontroller');

router.post('/', createVehicleTracking);
router.get('/', getAllVehicleTracking);
router.delete('/:id', deleteVehicleTracking);
router.put('/:id', updateVehicleTracking);

module.exports = router;