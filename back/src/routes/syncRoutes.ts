import express from "express";
import syncService from "../services/syncService";
import asyncHandler  from "express-async-handler";
import { SensorModel } from "../models/Sensor";
import pool from "../config/mysql";

const router = express.Router();

/**
 * @description Rota para sincronização incremental (apenas novos/atualizados)
 */
router.post(
  '/sensores',
  asyncHandler(async (req, res) => {
    const result = await syncService.syncSensors();
    if (!result?.success) {
      res.status(500).json(result);
      return;
    }
    res.json(result);
  })
);

/**
 * @description Rota para carga inicial completa (usar apenas primeira vez)
 */
router.post(
  '/sensores/carga-inicial',
  asyncHandler(async (req, res) => {
    // Verifica se foi passado force=true como query param
    // const force = req.query.force === 'true';
    
    const result = await syncService.initialSync();
    
    if (!result?.success) {
      const statusCode = result.error?.includes("já contém dados") ? 400 : 500;
      res.status(statusCode).json(result);
      return;
    }
    
    res.json(result);
  })
);

/**
 * @description Rota para verificar status da sincronização
 */
router.get(
  '/status',
  asyncHandler(async (req, res) => {
    try {
      // Verifica status do MySQL
      const mysqlStatus = await syncService.checkMySQLHealth();
      
      // Conta registros (usando try-catch separado para cada banco)
      let mysqlCount = 0;
      let mongoCount = 0;
      
      try {
        const [countResult]: any = await pool.query('SELECT COUNT(*) AS total FROM Sensor');
        mysqlCount = countResult[0].total;
      } catch (mysqlError) {
        console.error('Erro ao contar registros MySQL:', mysqlError);
      }
      
      try {
        mongoCount = await SensorModel.countDocuments();
      } catch (mongoError) {
        console.error('Erro ao contar registros MongoDB:', mongoError);
      }
      
      // Última sincronização
      const lastSync = await SensorModel.findOne()
        .sort({ reading_time: -1 })
        .select('reading_time')
        .lean();

      res.json({
        mysqlOnline: syncService.mysqlOnline, // Usa a propriedade atualizada
        mysqlCount,
        mongoCount,
        lastSync: lastSync?.reading_time || 'Nunca sincronizado',
        syncStatus: mysqlCount === mongoCount ? 
          'Sincronizado' : 'Pendente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao verificar status',
        details: error instanceof Error ? error.message : error
      });
    }
  })
);

export default router;