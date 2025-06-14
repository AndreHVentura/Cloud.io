import express from 'express';
import sensorService from '../services/SensorService';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { page = 1, limit = 100, startDate, endDate } = req.query;

    const data = await sensorService.getSensorData(
      Number(page),
      Number(limit),
      startDate as string,
      endDate as string
    );

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

// Nova rota para buscar por intervalo de tempo
router.get(
  '/time-range',
  asyncHandler(async (req, res) => {
    // Validação dos parâmetros de tempo
    if (!req.query.start || !req.query.end) {
      res.status(400).json({
        error: 'Parâmetros "start" e "end" são obrigatórios (formato ISO 8601)'
      });
      return;
    }

    try {
      const startTime = new Date(req.query.start as string);
      const endTime = new Date(req.query.end as string);

      if (isNaN(startTime.getTime())) {
        res.status(400).json({ error: 'Data inicial inválida' });
        return;
      }
      if (isNaN(endTime.getTime())) {
        res.status(400).json({ error: 'Data final inválida' });
        return;
      }
      if (startTime > endTime) {
        res.status(400).json({ error: 'Data inicial deve ser anterior à data final' });
        return;
      }

      // Parse paginação
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 100;

      if (page < 1 || limit < 1 || limit > 1000) {
        res.status(400).json({
          error: 'Parâmetros inválidos. page >= 1, 1 <= limit <= 1000'
        });
        return;
      }

      const result = await sensorService.getSensorDataByTimeRange(
        startTime,
        endTime,
        page,
        limit
      );
      res.json(result);
    } catch (error) {
      res.status(500).json({
        error: 'Erro ao buscar sensores',
        details: error instanceof Error ? error.message : error
      });
    }
  })
);

// Nova rota para buscar por dia específico
router.get(
  '/by-day/:date',
  asyncHandler(async (req, res) => {
    try {
      // Pega a data do parâmetro da URL
      const dateParam = req.params.date;
      
      // Valida e converte a data
      const targetDate = new Date(dateParam);
      if (isNaN(targetDate.getTime())) {
        res.status(400).json({ 
          error: 'Data inválida. Use o formato YYYY-MM-DD' 
        });
        return;
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 100;

      if (page < 1 || limit < 1 || limit > 1000) {
        res.status(400).json({
          error: 'Parâmetros inválidos. page >= 1, 1 <= limit <= 1000'
        });
        return;
      }

      const result = await sensorService.getSensorDataByDay(
        targetDate,
        page,
        limit
      );

      res.json(result);
    } catch (error) {
      res.status(500).json({
        error: 'Erro ao buscar sensores',
        details: error instanceof Error ? error.message : error
      });
    }
  })
);


export default router;