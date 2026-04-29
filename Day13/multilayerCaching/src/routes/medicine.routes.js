const express = require("express");
const router = express.Router();

const cacheMiddleware = require("../cache/cache.middleware");
const medicineService = require("../services/medicine.service");
const verifyService = require("../services/verify.service");

router.get(
    "/medicine-unit/:id",
    cacheMiddleware("medicine", medicineService.getMedicineById)
);

router.get(
    "/verify/:uuid",
    cacheMiddleware("verify", verifyService.verifyByUUID)
);

module.exports = router;