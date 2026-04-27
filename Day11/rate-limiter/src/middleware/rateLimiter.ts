//import request, response and nextfunction from express for type checking
import { Request, Response, NextFunction } from 'express';
//import sliding window and token bucket functions
import { checkSlidingWindow } from '../services/redisService';
import { checkTokenBucketFallback } from '../services/fallbackService';

//create a function for rate limiter middleware
export const rateLimiter = (limit: number, windowMs: number) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        //create a unique identifier for each user
        const key = req.ip || 'anonymous';
        let result;

        //if redis get fail then we will use memory based fail open architecture to allow requests
        try {
            // Try Redis first
            result = await checkSlidingWindow(key, limit, windowMs);
        } catch (error) {
            // If Redis fails, switch to In-Memory Token Bucket (Fail-Open)
            console.warn('⚠️ Redis unreachable, falling back to local memory limiting');
            result = checkTokenBucketFallback(key, limit, windowMs);
        }

        // Set standard RateLimit headers
        res.setHeader('X-RateLimit-Limit', limit);
        res.setHeader('X-RateLimit-Remaining', result.remaining);

        if (!result.allowed) {
            return res.status(429).json({
                error: 'Rate limit exceeded',
                message: 'Burst limit reached. Try again in a few seconds.'
            });
        }

        next();
    };
};
