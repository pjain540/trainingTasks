import { LRUCache } from 'lru-cache';

// Cache to store bucket state per IP (max 1000 IPs)
const cache = new LRUCache<string, { tokens: number; last: number }>({ max: 1000 });

/**
 * Token Bucket Logic for Fail-Open scenario
 */
export const checkTokenBucketFallback = (key: string, limit: number, windowMs: number) => {
    const now = Date.now();
    let bucket = cache.get(key) || { tokens: limit, last: now };

    // Refill tokens based on time passed since last request
    const elapsed = (now - bucket.last) / 1000;
    const refillRate = limit / (windowMs / 1000);
    bucket.tokens = Math.min(limit, bucket.tokens + elapsed * refillRate);
    bucket.last = now;

    if (bucket.tokens >= 1) {
        bucket.tokens -= 1;
        cache.set(key, bucket);
        return { allowed: true, remaining: Math.floor(bucket.tokens) };
    }

    return { allowed: false, remaining: 0 };
};
