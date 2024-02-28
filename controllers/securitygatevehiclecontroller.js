const vehicleTrackingModel = require('../models/vehiclegateModel');

const createVehicleTracking = async (req, res) => {
  try {
    const { vehicleNo, time, inOut } = req.body;
    const currentDate = new Date();

    const newVehicleTracking = new vehicleTrackingModel({
      currentDate,
      vehicleNo,
      time,
      inOut,
    });
    await newVehicleTracking.save();
    res.status(201).json({ message: 'Vehicle tracking created', data: newVehicleTracking });
  } catch (error) {
    res.status(500).json({ message: 'Error creating vehicle tracking', error });
  }
};

const getAllVehicleTracking = async (req, res) => {
  try {
    const currentDate = new Date();
    const isoCurrentDate = currentDate.toISOString().split('T')[0];

    const vehicleTrackings = await vehicleTrackingModel.find({
      currentDate: isoCurrentDate,
    });

    res.status(200).json({ data: vehicleTrackings });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicle trackings', error });
  }
};

const deleteVehicleTracking = async (req, res) => {
  try {
    const { id } = req.params;
    await vehicleTrackingModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Vehicle tracking deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vehicle tracking', error });
  }
};

const updateVehicleTracking = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedVehicleTracking = await vehicleTrackingModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: 'Vehicle tracking updated', data: updatedVehicleTracking });
  } catch (error) {
    res.status(500).json({ message: 'Error updating vehicle tracking', error });
  }
};

module.exports = {
    createVehicleTracking,
    getAllVehicleTracking,
    deleteVehicleTracking,
    updateVehicleTracking,
};