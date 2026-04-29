const express = require("express");
const router = express.Router();
const reportController = require("../controllers/report.controller");

router.get("/ownership-chain", reportController.getOwnershipReport);

module.exports = router;