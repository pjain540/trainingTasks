// jobs/ownership.job.js
const redis = require("../cache/redisClient");

const invalidateCache = async (medicineId) => {
    const key = `medicine:${medicineId}`;
    await redis.del(key);
};

module.exports = { invalidateCache };