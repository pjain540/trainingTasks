import express from 'express';
import { verifyUnit } from '../services/verifyUnit';

const router = express.Router();

router.get('/test', async (req, res) => {
    await verifyUnit('unit-123');
    res.send('OK');
});

export default router;