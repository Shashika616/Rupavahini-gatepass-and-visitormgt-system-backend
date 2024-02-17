const execStaff = require('../models/executivestaffModel');

const getexecstaff = async (req, res) => {
    try {
      const execstaff = await execStaff.find({});
      res.status(200).json(execstaff);
    } catch (error) {
      console.error("Error retrieving data", error);
      res.status(500).json({ error: "Could not retrieve executive staff data" });
    }
  };



  module.exports = {
    getexecstaff,
  };