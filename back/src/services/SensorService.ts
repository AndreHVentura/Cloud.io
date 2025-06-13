import { SensorModel } from '../models/Sensor';

class SensorService {
  // Busca todos os sensores com paginação
  async  getSensorData(
    page: number = 1,
    limit: number = 100,
    startDate?: string,
    endDate?: string
  ) {
    const skip = (page - 1) * limit;
  
    const filter: any = {};
  
    if (startDate || endDate) {
      const readingTimeFilter: any = {};
  
      if (startDate) {
        const start = new Date(startDate + 'T00:00:00');
        readingTimeFilter.$gte = start;
      }
      
      if (endDate) {
        const end = new Date(endDate + 'T23:59:59.999');
        readingTimeFilter.$lte = end;
      }
  
      filter.reading_time = readingTimeFilter;
    }
  
    const [data, total] = await Promise.all([
      SensorModel.find(filter)
        .sort({ reading_time: -1 }) // ordena por mais recentes primeiro
        .skip(skip)
        .limit(limit),
      SensorModel.countDocuments(filter),
    ]);
  
    return {
      data,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: skip + data.length < total,
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