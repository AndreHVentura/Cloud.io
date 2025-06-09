import { SensorModel } from '../models/Sensor';

class SensorService {
  // Busca todos os sensores com paginação
  async getSensorData(page = 1, limit = 100) {
    const skip = (page - 1) * limit;

    const [sensors, total] = await Promise.all([
      SensorModel.find()
        .sort({ reading_time: -1 }) // Ordena por data decrescente
        .skip(skip)
        .limit(limit)
        .lean(),
      SensorModel.countDocuments()
    ]);

    return {
      data: sensors,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: (page * limit) < total
      }
    };
  }

  // Busca sensor por ID (mysqlId)
  async getSensorDataById(id: string) {
    return await SensorModel.findOne({ mysqlId: id }).lean();
  }

  // Insere novo sensor (opcional - manter se necessário)
  async insertSensorData(sensorData: any) {
    const newSensor = new SensorModel(sensorData);
    return await newSensor.save();
  }
}

export default new SensorService();