const Appointmentgate = require('../models/appointmentgateModel');

const creategateappointment = async (req,res) => {
    const visitorName = req.params.visitorName;
    const {
        currentDate,
        inOut,
        time,
      } = req.body;
    
      try {
        const gateappointment = await Appointmentgate.create({
            visitorName,
           currentDate,
           inOut,
           time,
        });
    
        res.status(201).json(gateappointment);
      } catch (error) {
        console.error("Error creating a request", error);
        res.status(500).json({ error: "Could not create a gate appointment Request" });
      }
};

const getAllAppointmentgates = async (req, res) => {
    try {
        const appointmentgates = await Appointmentgate.find();
        res.json(appointmentgates);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all appointmentgates filtered by visitorName and currentDate
const getAllappointmentgatesByVisitorNameAndCurrentDate = async (req, res) => {
    try {
        const visitorName =  req.params.visitorName;
        const currentDate = req.params.currentDate;

        const appointmentgates = await Appointmentgate.find({
            visitorName: visitorName,
            currentDate: currentDate,
        });
        res.json(appointmentgates);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    creategateappointment,
    getAllAppointmentgates,
    getAllappointmentgatesByVisitorNameAndCurrentDate,
};