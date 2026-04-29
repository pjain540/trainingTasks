const reportService = require("../services/report.service");

exports.getOwnershipReport = async (req, res) => {
    try {
        const { drugType } = req.query;

        const data = await reportService.getOwnershipReport(drugType);

        res.json({
            success: true,
            data
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};