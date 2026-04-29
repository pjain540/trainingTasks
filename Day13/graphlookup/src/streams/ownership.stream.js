const MedicineUnit = require("../models/MedicineUnit");
const DailySummary = require("../models/DailySummary");

const watchOwnershipChanges = () => {
    const changeStream = MedicineUnit.watch();

    changeStream.on("change", async () => {
        console.log("Change detected → updating summary");

        const summary = await MedicineUnit.aggregate([
            {
                $group: {
                    _id: null,
                    totalUnits: { $sum: 1 },
                    revoked: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "REVOKED"] }, 1, 0]
                        }
                    }
                }
            }
        ]);

        await DailySummary.create({
            date: new Date(),
            ...summary[0]
        });
    });
};

module.exports = watchOwnershipChanges;