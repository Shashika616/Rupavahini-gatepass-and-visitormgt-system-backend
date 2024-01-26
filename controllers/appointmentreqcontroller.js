const Appointment = require("../models/appoinmentModel");

const createappointmentrequest = async (req, res) => {
  const {
    username,
    requesterName,
    requesteremail,
    requesterNIC,
    requesterPhoneno,
    officerName,
    appoinmentDate,
    appoinmentTime,
    appoinmentReason,
  } = req.body;

  try {
    const appointment = await Appointment.create({
        username,
        requesterName,
        requesteremail,
        requesterNIC,
        requesterPhoneno,
        officerName,
        appoinmentDate,
        appoinmentTime,
        appoinmentReason,
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.error("Error creating a request", error);
    res.status(500).json({ error: "Could not create a appointment Request" });
  }
};

const getAppRequestByUsername = async (req, res) => {
    const username = req.params.username;
  
    try {
      const request = await Appointment.findOne({ username: username });
  
      if (!request) {
        return res
          .status(404)
          .json({ message: "Request not found", username: username });
      }
  
      res.status(200).json(request);
  
    } catch (error) {
      console.error("Error retrieving request by username", error);
      res.status(500).json({ error: "Could not retrieve request by username" });
    }
  };

  const deleteAppRequest = async (req, res) => {
    try {
      const requestId = req.params.id;
      const deletedRequest = await Request.findByIdAndDelete(requestId);
  
      if (!deletedRequest) {
        return res
          .status(404)
          .json({ message: "Request not found", deletedRequestId: requestId });
      }
  
      return res.status(200).json({ message: "Request deleted successfully" });
    } catch (error) {
      console.error("Error deleting request:", error);
      return res.status(500).json({ error: "Could not delete request" });
    }
  };

  module.exports = {
    createappointmentrequest,
    getAppRequestByUsername,
    deleteAppRequest,
  };