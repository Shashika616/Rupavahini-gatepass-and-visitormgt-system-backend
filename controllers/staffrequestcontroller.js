const StaffReq = require("../models/staffrequestModel");

const createStaffRequest = async (req,res) => {
    const {
        empID,
        reason,
        currentDate, 
        givenTimeout,
        givenTimein,
        details,
      } = req.body;
    
      try {
        const staffrequest = await StaffReq.create({
            empID,
            reason,
            currentDate,
            givenTimeout,
            givenTimein,
            details,
        });
    
        res.status(201).json(staffrequest);
      } catch (error) {
        console.error("Error creating a request", error);
        res.status(500).json({ error: "Could not create a staff Request" });
      }
};

const getStaffRequestByID = async (req, res) => {
  const empID = req.params.empID;

  try {
      const requests = await StaffReq.find({ empID: empID });

      if (!requests || requests.length === 0) {
          return res
              .status(404)
              .json({ message: "No requests found for the ID", empID: empID });
      }

      res.status(200).json(requests);

  } catch (error) {
      console.error("Error retrieving requests by ID", error);
      res.status(500).json({ error: "Could not retrieve requests by ID" });
  }
};

const getStaffRequestByIDAndDate = async (req, res) => {
  const empID = req.params.empID;
  const currentDate = req.params.currentDate;

  try {
      // Assuming currentDate is in a specific date format. Adjust the query based on your actual date format.
      const requests = await StaffReq.find({ empID: empID, currentDate: currentDate });

      if (!requests || requests.length === 0) {
          return res
              .status(404)
              .json({ message: "No requests found for the ID and date", empID: empID, currentDate: currentDate });
      }

      res.status(200).json(requests);

  } catch (error) {
      console.error("Error retrieving requests by ID and date", error);
      res.status(500).json({ error: "Could not retrieve requests by ID and date" });
  }
};

const getStaffRequestByIDAndToday = async (req, res) => {
  const empID = req.params.empID;

  try {
      // Get today's date in a format that matches your storage format
      const today = new Date();
      const formattedToday = today.toISOString().split('T')[0];  // Get only date as YYYY-MM-DD by spliting and omiting the time part

      // Find requests based on empID and today's date
      const requests = await StaffReq.find({ empID: empID, currentDate: formattedToday });

      if (!requests || requests.length === 0) {
          return res
              .status(404)
              .json({ message: "No requests found for the ID and today's date", empID: empID, currentDate: formattedToday });
      }

      res.status(200).json(requests);

  } catch (error) {
      console.error("Error retrieving requests by ID and today's date", error);
      res.status(500).json({ error: "Could not retrieve requests by ID and today's date" });
  }
};

const getRequestsByYear = async (req, res) => {
  const { year } = req.params;

  try {
      const requests = await StaffReq.find({
          'currentDate': {
              $gte: new Date(`${year}-01-01`),
              $lt: new Date(`${parseInt(year) + 1}-01-01`)
          }
      });

      res.status(200).json(requests);
  } catch (error) {
      console.error('Error retrieving requests by year:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getRequestsByYearAndMonth = async (req, res) => {
  const { year, month } = req.params;

  try {
      const requests = await StaffReq.find({
          'currentDate': {
              $gte: new Date(`${year}-${month}-01`),
              $lt: new Date(`${year}-${parseInt(month) + 1}-01`)
          }
      });

      res.status(200).json(requests);
  } catch (error) {
      console.error('Error retrieving requests by year and month:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getRequestsByYearMonthAndDay = async (req, res) => {
  const { year, month, day } = req.params;

  try {
      const requests = await StaffReq.find({
          'currentDate': {
              $gte: new Date(`${year}-${month}-${day}`),
              $lt: new Date(`${year}-${month}-${parseInt(day) + 1}`)
          }
      });

      res.status(200).json(requests);
  } catch (error) {
      console.error('Error retrieving requests by year, month, and day:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  createStaffRequest,
  getStaffRequestByID,
  getStaffRequestByIDAndDate,
  getStaffRequestByIDAndToday,
  getRequestsByYear,
  getRequestsByYearAndMonth,
  getRequestsByYearMonthAndDay,
};
