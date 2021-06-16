import express from 'express';
import rush from './rush';

const router = express.Router();

router.use('/rush', rush);

router.use('/test', (req, res) => {
  res.send('This route is at api/v1/test');
});

export default router;
