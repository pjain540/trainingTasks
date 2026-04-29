// services/medicine.service.js
const MedicineUnit = require("../models/MedicineUnit");

exports.getMedicineById = async (req) => {
    return await MedicineUnit.findById(req.params.id);
};