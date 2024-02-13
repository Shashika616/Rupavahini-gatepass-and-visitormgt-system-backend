const express = require("express");
const router = express.Router();
const staffgateController = require("../controllers/gatestaffinoutcontroller");

router.post("/staffinoutgate/:empId", staffgateController.createstaffinoutgate);
router.get("/getstaffinoutdate/:date", staffgateController.getstaffinoutfromdate);

module.exports = router;