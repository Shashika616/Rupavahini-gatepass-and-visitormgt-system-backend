const Visitrupavahinigate = require('../models/VisitrupavahinigateModel');

const creategatevisitrupavahini = async (req,res) => {
    const orgName = req.params.orgName;
    const {
        currentDate,
        inOut,
        time,
      } = req.body;
    
      try {
        const gatevisitrupavahini = await Visitrupavahinigate.create({
           orgName,
           currentDate,
           inOut,
           time,
        });
    
        res.status(201).json(gatevisitrupavahini);
      } catch (error) {
        console.error("Error creating a request", error);
        res.status(500).json({ error: "Could not create a gate visit rupavahini Request" });
      }
};

const getAllVisitrupavahinigates = async (req, res) => {
    try {
        const visitrupavahinigates = await Visitrupavahinigate.find();
        res.json(visitrupavahinigates);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all visitrupavahinigates filtered by orgName and currentDate
const getAllVisitrupavahinigatesByOrgNameAndCurrentDate = async (req, res) => {
    try {
        const orgName =  req.params.orgName;
        const currentDate = req.params.currentDate;

        const visitrupavahinigates = await Visitrupavahinigate.find({
            orgName: orgName,
            currentDate: currentDate,
        });
        res.json(visitrupavahinigates);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    creategatevisitrupavahini,
    getAllVisitrupavahinigates,
    getAllVisitrupavahinigatesByOrgNameAndCurrentDate,
};