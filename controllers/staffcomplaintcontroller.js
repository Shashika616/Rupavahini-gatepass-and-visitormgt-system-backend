const StaffComp = require("../models/staffrequestModel");

const createStaffComplaint = async (req,res) => {
    const {
        empID,
        title, 
        complaintDate,
        details,
      } = req.body;
    
      try {
        const staffcomplaint = await StaffComp.create({
            empID,
            title,
            complaintDate,
            details,
        });
    
        res.status(201).json(staffcomplaint);
      } catch (error) {
        console.error("Error creating a request", error);
        res.status(500).json({ error: "Could not create a staff Request" });
      }
};

const getStaffComplaintByID = async (req, res) => {
    const empID = req.params.empID;
  
    try {
        const requests = await StaffComp.find({ empID: empID });
  
        if (!requests || requests.length === 0) {
            return res
                .status(404)
                .json({ message: "No Complaints found for the ID", empID: empID });
        }
  
        res.status(200).json(requests);
  
    } catch (error) {
        console.error("Error retrieving complaints by ID", error);
        res.status(500).json({ error: "Could not retrieve complaints by ID" });
    }
  };

module.exports = {
    createStaffComplaint,
    getStaffComplaintByID,
};
