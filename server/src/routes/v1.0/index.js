import express from 'express';
import rush from './rush';

const router = express.Router();

router.use('/rush', rush);

export default router;
