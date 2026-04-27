import express from 'express';
import { rateLimiter } from './middleware/rateLimiter';

const app = express();

// Apply limit: 5 requests per 10 seconds
app.get('/api/resource', rateLimiter(5, 10000), (req, res) => {
    res.json({ status: 'success', data: 'Resource accessed' });
});

export default app;
