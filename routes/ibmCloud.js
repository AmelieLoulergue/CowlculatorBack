const express = require("express");
const router = express.Router();
const ibmCtrl = require("../controllers/ibmCloud");
router.get("/csv-cloud", ibmCtrl.createIbmCloudData);
module.exports = router;
