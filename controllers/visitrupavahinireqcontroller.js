const Visitrupavahini = require("../models/visitrupavahiniModel");

const createvisitrupavahinirequest = async (req, res) => {
    const username = req.params.username;
    const {category, dateofArrival, timeslot} = req.body;
    // Create a unique ID to identify the request in seperate forms and update the relevant fields
    const requestID = `${category}-${username}-${dateofArrival}-${timeslot}`;  
  const {
    name,
    grade,
    address,
    authorizedPerson,
    designation,
    phoneNo,
    noOfmale,
    noOffemale,
    noOfteachers,
    noOfparents,
    note,
  } = req.body;

  try {
    const visitrupavahini = await Visitrupavahini.create({
      requestID,  
      category,
      username,
      dateofArrival,
      timeslot,
      name,
      grade,
      address,
      authorizedPerson,
      designation,
      phoneNo,
      noOfmale,
      noOffemale,  
      noOfteachers,
      noOfparents,
      note,  
    });

    res.status(201).json(visitrupavahini);
  } catch (error) {
    console.error("Error creating a request", error);
    res.status(500).json({ error: "Could not create a visit Rupavahini Request" });
  }
};

const updatevisitrupavhini = async (req, res) => {
    const requestID = req.params.id;
    const {
        name,
        grade,
        address,
        authorizedPerson,
        designation,
        phoneNo,
        noOfmale,
        noOffemale,  
        noOfteachers,
        noOfparents, 
    } = req.body;
  
    try {
      const updatevisitrupavhinirequest = await Visitrupavahini.findOneAndUpdate(
        { _id : requestID },
        {
          $set: {
            name,
            grade,
            address,
            authorizedPerson,
            designation,
            phoneNo,
            noOfmale,
            noOffemale,  
            noOfteachers,
            noOfparents, 
          },
        },
        { new: true }
      );
  
      if (!updatevisitrupavhinirequest) {
        return res
          .status(404)
          .json({ message: "RequestID  Not found", requestID: requestID });
      }
  
      res.status(200).json(updatevisitrupavhinirequest);
    } catch (error) {
      console.error("Error updating visit rupavahini request details", error);
      res.status(500).json({ error: "Could not update request details" });
    }
  };

// Method to retrieve visit request details by requestID
const getRequestByUsername = async (req, res) => {
  const username = req.params.username;

  try {
    const requests = await Visitrupavahini.find({ username: username });

    if (!requests || requests.length === 0) {
      return res
        .status(404)
        .json({ message: "No requests found for the username", username: username });
    }

    res.status(200).json(requests);

  } catch (error) {
    console.error("Error retrieving requests by username", error);
    res.status(500).json({ error: "Could not retrieve requests by username" });
  }
};

/*const getRequestByUsername = async (req, res) => {
  const username = req.params.username;

  try {
    const request = await Visitrupavahini.findOne({ username: username });

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
};*/

const getVisitrupavahiniDetails = async (req, res) => {
  const reqid = req.params.requestID;

  try {
    const requests = await Visitrupavahini.findOne({ id :reqid });

    if (!requests || requests.length === 0) {
      return res
        .status(404)
        .json({ message: "No requests found for the id", id : reqid });
    }

    res.status(200).json(requests);

  } catch (error) {
    console.error("Error retrieving requests by ID", error);
    res.status(500).json({ error: "Could not retrieve requests by ID" });
  }
};




const deleteRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const deletedRequest = await Visitrupavahini.findByIdAndDelete(requestId);

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
  createvisitrupavahinirequest,
  updatevisitrupavhini,
  getVisitrupavahiniDetails,
  getRequestByUsername,
  deleteRequest,
};