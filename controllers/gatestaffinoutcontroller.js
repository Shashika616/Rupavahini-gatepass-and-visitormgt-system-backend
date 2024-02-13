const Staffinoutgate = require('../models/staffgateModel');

const createstaffinoutgate = async(req, res) => {
    const empId =  req.params.empId;
    const {
        currentDate,
        inOut,
        time,
      } = req.body;
    
      try {
        const gatestaffinout = await Staffinoutgate.create({
           empId,
           currentDate,
           inOut,
           time,
        });
    
        res.status(201).json(gatestaffinout);
      } catch (error) {
        console.error("Error creating a request", error);
        res.status(500).json({ error: "Could not create a staff in out Request" });
      }
};

const getstaffinoutfromdate = async(req,res) => {
    const date = req.params.date;
  try {
    const staffinoutgates = await Staffinoutgate.find({ currentDate: date });
    res.status(200).json(staffinoutgates);
  } catch (error) {
    console.error("Error retrieving data", error);
    res.status(500).json({ error: "Could not retrieve staff in and out from date" });
  }
};

module.exports = {
    createstaffinoutgate,
    getstaffinoutfromdate,
};