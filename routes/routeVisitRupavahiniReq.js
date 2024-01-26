const express = require("express");
const router = express.Router();

const {
    createvisitrupavahinirequest,
    updatevisitrupavhini,
    getVisitrupavahiniDetails,
    deleteRequest,
    getRequestByUsername,
    } = require("../controllers/visitrupavahinireqcontroller");

    router.post("/",createvisitrupavahinirequest);
    router.put("/:requestID",updatevisitrupavhini);
    router.get("/:requestID",getVisitrupavahiniDetails);
    router.get("/:username",getRequestByUsername);
    router.delete("/:id",deleteRequest);

    module.exports = router;