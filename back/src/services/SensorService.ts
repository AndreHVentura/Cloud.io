import { SensorModel } from '../models/Sensor';

class SensorService {
  // Busca todos os sensores com paginação
  async getSensorData(
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

  //graficos
  async getSensorDataByTimeRange(startTime: Date, endTime: Date, page = 1, limit = 100) {
    const skip = (page - 1) * limit

    const [sensors, total] = await Promise.all([
      SensorModel.find({
        reading_time: {
          $gte: startTime,
          $lte: endTime
        }
      })
        .sort({ reading_time: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      SensorModel.countDocuments({
        reading_time: {
          $gte: startTime,
          $lte: endTime
        }
      })
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
    }
  }

  async getSensorDataByDay(targetDate: Date, page = 1, limit = 100) {
    // Cria o intervalo do dia (00:00:00 até 23:59:59.999)
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    const skip = (page - 1) * limit;

    const [sensors, total] = await Promise.all([
      SensorModel.find({
        reading_time: {
          $gte: startOfDay,
          $lte: endOfDay
        }
      })
        .sort({ reading_time: 1 }) // Ordena por data crescente
        .skip(skip)
        .limit(limit)
        .lean(),

      SensorModel.countDocuments({
        reading_time: {
          $gte: startOfDay,
          $lte: endOfDay
        }
      })
    ]);

    return {
      date: targetDate.toISOString().split('T')[0], // Retorna a data no formato YYYY-MM-DD
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
}

export default new SensorService();