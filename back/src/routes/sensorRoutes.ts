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
    const data = await sensorService.getSensorDataById(Number(req.params.id));
    res.json(data);
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const result = await sensorService.insertSensorData(req.body);
    res.json(result);
  })
);

export default router;