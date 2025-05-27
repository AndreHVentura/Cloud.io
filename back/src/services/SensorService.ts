import mysqlPool from '../config/mysql';

class SensorService {
    async getSensorData() {
      const [rows] = await mysqlPool.query('SELECT * FROM Sensor');
      return rows;
    }
  
    async getSensorDataById(id: number) {
      const [rows]: [any[], any] = await mysqlPool.query('SELECT * FROM Sensor WHERE id = ?', [id]);
      return rows[0];
    }
  
    async insertSensorData(data: any) {
      const result = await mysqlPool.query('INSERT INTO Sensor SET ?', [data]);
      return result;
    }
  }
  
  export default new SensorService();