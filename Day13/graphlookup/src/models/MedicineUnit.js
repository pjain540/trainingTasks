const mongoose = require('mongoose')

const transferSchema = new mongoose.Schema({
    from: String,
    to: String,
    transferedAt: Date
})

const medicineSchema = new mongoose.Schema({
    drugType: String,
    currentOwner: String,
    status: {
        type: String,
        enum: ["ACTIVE", "REVOKED"]
    },
    createdAt: { type: Date, default: Date.now },
    transfers: [transferSchema],
    parentUnit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MedicineUnit"
    }
})

medicineSchema.index({ currentOwner: 1 }, { status: 1 }, { createdAt: 1 })

module.exports = new mongoose.model("MedicineUnit", medicineSchema);