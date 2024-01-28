const express = require("express");
const router = express.Router();

const {
    createvisitrupavahinirequest,
    updatevisitrupavhini,
    getVisitrupavahiniDetails,
    deleteRequest,
    getRequestByUsername,
    } = require("../controllers/visitrupavahinireqcontroller");

    router.post("/:username", createvisitrupavahinirequest);
    router.put("/:requestID", updatevisitrupavhini);
    router.get("/details/:requestID", getVisitrupavahiniDetails); // Changed the path to avoid conflict
    router.get("/user/:username", getRequestByUsername); // Changed the path to avoid conflict
    router.delete("/:id", deleteRequest);

    module.exports = router;