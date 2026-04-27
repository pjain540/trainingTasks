import Redis from 'ioredis'

//Initialize Redis connection
export const redis = new Redis({
    host: 'localhost',
    port: 6379,
    // password: 'default', // Add your password here
    maxRetriesPerRequest: 2,
    retryStrategy: (times) => {
        return times > 3 ? null : 100;
    }
});

//make redis connect
redis.on('connect', () => {
    console.log('Connected to Redis');
})

//error is encountered here
redis.on('error', (err) => {
    console.error('Error connecting to Redis', err);
})

//sliding window logic using redis sorted sets

export const checkSlidingWindow = async (key: string, limit: number, windowMs: number) => {
    const now = Date.now();
    const windowStart = now - windowMs;
    const redisKey = `rl:${key}`;
    //atomic operation: remove old logs and check count
    const multi = redis.multi();
    multi.zremrangebyscore(redisKey, 0, windowStart); //remove old

    multi.zcard(redisKey); //count current requests


    const result = await multi.exec();
    if (!result) throw new Error('Redis error');

    const requestCount = result ? (result[1][1] as number) : 0;

    if (requestCount < limit) {
        //add current request and set expiry for the key
        await redis.zadd(redisKey, now, now);
        await redis.pexpire(redisKey, windowMs);
        return { allowed: true, remaining: limit - requestCount - 1 };
    } return { allowed: false, remaining: 0 };
}