import express from 'express';
import sensorService from '../services/SensorService';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const data = await sensorService.getSensorData();
    res.json(data);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const data = await sensorService.getSensorDataById((req.params.id));
    res.json(data);
  })
);


export default router;