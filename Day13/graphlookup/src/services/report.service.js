const medicineUnit = require('../models/MedicineUnit');

exports.getownershipHistory = async (drugType) => {
    return await medicineUnit.aggregate([
        {
            $match: {
                drugType
            }
        },
        //traverse ownership chain
        {
            $graphLookup: {
                from: "medicineunits",
                startWith: "$parentUnit",
                connectFromField: "parentUnit",
                connectToField: "_id",
                as: "ownershipHistory"
            }
        },
        //parallel stats
        {
            $facet: {
                totalUnits: [
                    {
                        $count: "count"
                    }
                ],
                avgTransferTime: [
                    {
                        $unwind: "$transfers"
                    },
                    {
                        $project: {
                            duration: {
                                $subtract: ["$transfers.transferredAt", "$createdAt"]
                            }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            avgTime: { $avg: "$duration" }
                        }
                    }
                ],
                revokedPercentage: [
                    {
                        $group: {
                            _id: "$status",
                            count: { $sum: 1 }
                        }
                    }
                ]
            }
        }
    ])
}