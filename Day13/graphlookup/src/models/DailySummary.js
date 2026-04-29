const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    date: Date,
    totalUnits: Number,
    revoked: Number
});

module.exports = mongoose.model("DailySummary", schema);