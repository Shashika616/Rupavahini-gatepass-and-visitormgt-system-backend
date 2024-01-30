const express = require("express");
const router = express.Router();

const {
    createvisitrupavahinirequest,
    updatevisitrupavhini,
    getVisitrupavahiniDetails,
    deleteRequest,
    getRequestByUsername,
    } = require("../controllers/visitrupavahinireqcontroller");

    router.post("/createvisitrupreq/:username", createvisitrupavahinirequest);
    router.put("/updatevisitrupreq/:id", updatevisitrupavhini);
    router.get("/detailsvisitrupreq/:id", getVisitrupavahiniDetails); // Changed the path to avoid conflict
    router.get("/user/:username", getRequestByUsername); // Changed the path to avoid conflict
    router.delete("/deleterupreq/:id", deleteRequest);

    module.exports = router;