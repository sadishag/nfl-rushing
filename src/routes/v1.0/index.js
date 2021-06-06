import express from 'express';

const router = express.Router();

router.use('/test', (req, res) => {
  res.send('This route is at api/v1/test');
});

export default router;
