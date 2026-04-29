// cache/cache.middleware.js
const redis = require("./redisClient");

const TTL = 300; // 5 min
const STALE_TTL = 30; // extra stale window

module.exports = (keyPrefix, fetchFunction) => {
    return async (req, res, next) => {
        const key = `${keyPrefix}:${req.params.id || req.params.uuid}`;

        try {
            const cached = await redis.get(key);

            if (cached) {
                const parsed = JSON.parse(cached);

                // ✅ Fresh data
                if (Date.now() < parsed.expiry) {
                    return res.json({ source: "cache", data: parsed.data });
                }

                // ⚡ STALE-WHILE-REVALIDATE
                if (Date.now() < parsed.staleExpiry) {
                    // background refresh
                    refreshCache(key, fetchFunction, req);

                    return res.json({
                        source: "stale-cache",
                        data: parsed.data
                    });
                }
            }

            // ❌ Cache miss
            const data = await fetchFunction(req);

            await setCache(key, data);

            return res.json({ source: "db", data });

        } catch (err) {
            next(err);
        }
    };
};

// helper
async function setCache(key, data) {
    const payload = {
        data,
        expiry: Date.now() + 300 * 1000,
        staleExpiry: Date.now() + (300 + 30) * 1000
    };

    await redis.set(key, JSON.stringify(payload));
}

// async refresh
async function refreshCache(key, fetchFunction, req) {
    try {
        const data = await fetchFunction(req);
        await setCache(key, data);
    } catch (err) {
        console.error("Background refresh failed");
    }
}