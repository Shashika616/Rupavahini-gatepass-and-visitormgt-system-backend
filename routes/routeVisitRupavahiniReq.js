const express = require("express");
const router = express.Router();

const {
    createRequestID,
    createvisitrupavahinirequest,
    updatevisitrupavhini,
    getVisitrupavahiniDetails,
    deleteRequest,
    getRequestByUsername,
    } = require("../controllers/visitrupavahinireqcontroller");

    router.post("/createvisitrupreq/",createRequestID, createvisitrupavahinirequest);
    router.put("/updatevisitrupreq/:requestID", updatevisitrupavhini);
    router.get("/detailsvisitrupreq/:id", getVisitrupavahiniDetails); // Changed the path to avoid conflict
    router.get("/user/:username", getRequestByUsername); // Changed the path to avoid conflict
    router.delete("/deleterupreq/:id", deleteRequest);

    module.exports = router;