import express from 'express';
import testRoute from './routes/test.route';
const app = express();
app.use('/api', testRoute);

export default app