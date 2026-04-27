import request from 'supertest';
import app from '../src/app';
import { redis } from '../src/services/redisService';

describe('Rate Limiter', () => {
    afterAll(async () => { await redis.quit(); });

    it('should allow requests under limit', async () => {
        const res = await request(app).get('/api/resource');
        expect(res.status).toBe(200);
    });

    it('should block requests over limit', async () => {
        for (let i = 0; i < 5; i++) await request(app).get('/api/resource');
        const res = await request(app).get('/api/resource');
        expect(res.status).toBe(429);
    });
});
