import pool from "../config/mysql";
import { SensorModel } from "../models/Sensor";
import { setTimeout } from "timers/promises";

class SyncService {
    private BATCH_SIZE = 1000;
    private DELAY_MS = 200;

    async syncSensors() {
        try {
            //1 conta o total de registro do mySql
            const [totalCount] = await pool.query(
                'SELECT COUNT(*) AS total FROM Sensor'
            ) as any;
            const totalRecords = totalCount[0].total;
            console.log(`Iniciando sincronização de ${totalRecords} registros`);

            //Processa em lotes pagionados
            let processed = 0;
            let page = 0;
            let hasMore = true;

            while (hasMore) {
                //calcula offset
                const offset = page * this.BATCH_SIZE;

                //Busca Lote atual
                const [batch] = await pool.query(
                    'SELECT * FROM Sensor LIMIT ? OFFSET ?',
                    [this.BATCH_SIZE, offset]
                ) as any;

                if (batch.length === 0) {
                    hasMore = false;
                    continue;
                }

                //prepara operação bulk para MongoDB
                const bulkOps = batch.map((mysqlSensor: any) => ({
                    updateOne: {
                        filter: { mysqlId: mysqlSensor.id },
                        update: {
                            $set: {
                                temp: mysqlSensor.temp,
                                hum: mysqlSensor.hum,
                                bar: mysqlSensor.bar,
                                cab_temp: mysqlSensor.cab,
                                bat_volts: mysqlSensor.volts,
                                uv_level: mysqlSensor.uv_level,
                                wind_peak: mysqlSensor.wind_peak,
                                wind_rt: mysqlSensor.wind_rt,
                                wind_avg: mysqlSensor.wind_avg,
                                wind_dir_rt: mysqlSensor.wind_dir_rt,
                                wind_dir_avg: mysqlSensor.wind_dir_avg,
                                reading_time: mysqlSensor.reading_time
                            }
                        },
                        upsert: true
                    }
                }));

                //executa operaçao bulk
                await SensorModel.bulkWrite(bulkOps);
                processed += batch.length;

                console.log(`Processados ${processed}/${totalRecords} registros`);

                //delay entre lotes para evitar sobrecarga
                if (processed < totalRecords) {
                    await setTimeout(this.DELAY_MS)
                }

                page++
            }
            return {
                success: true,
                message: `Sincronização`
            };
        } catch (error) {
            console.error('Erro na sincronização:', error);
            let errorMessage = 'Erro desconhecido';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            return { success: false, error: errorMessage };
        }
    }

    // Versão alternativa para primeira carga (mais rápida)
    async initialSync() {
        try {
            // 1. Verifica se a coleção já existe e está vazia
            const count = await SensorModel.countDocuments();
            if (count > 0) {
                return {
                    success: false,
                    error: "A coleção já contém dados. Use syncSensors() para sincronização incremental."
                };
            }

            // 2. Usa cursor para processar grandes volumes
            const [rows]: any = await pool.query(
                'SELECT * FROM Sensor'
            );

            const batchSize = 5000; // Tamanho do lote ajustável
            const totalRecords = rows.length;
            let processed = 0;
            let successfulInserts = 0;

            console.log(`Iniciando carga inicial de ${totalRecords} registros`);

            while (processed < totalRecords) {
                const batch = rows.slice(processed, processed + batchSize);

                try {
                    const bulkOps = batch.map((mysqlSensor: any) => ({
                        insertOne: {
                            document: {
                                mysqlId: mysqlSensor.id.toString(), // Garante que é string
                                temp: mysqlSensor.temp,
                                hum: mysqlSensor.hum,
                                bar: mysqlSensor.bar,
                                cab_temp: mysqlSensor.cab_temp,
                                bat_volts: mysqlSensor.bat_volts,
                                uv_level: mysqlSensor.uv_level,
                                wind_peak: mysqlSensor.wind_peak,
                                wind_rt: mysqlSensor.wind_rt,
                                wind_avg: mysqlSensor.wind_avg,
                                wind_dir_rt: mysqlSensor.wind_dir_rt,
                                wind_dir_avg: mysqlSensor.wind_dir_avg,
                                reading_time: mysqlSensor.reading_time || new Date(),
                                createdAt: new Date()
                            }
                        }
                    }));

                    const result = await SensorModel.collection.bulkWrite(bulkOps, { ordered: false });
                    successfulInserts += result.insertedCount;
                    processed += batch.length;

                    console.log(`Processados ${processed}/${totalRecords} registros (${successfulInserts} inseridos)`);

                    // Pequena pausa para evitar lock
                    if (processed < totalRecords) {
                        await setTimeout(300);
                    }
                } catch (batchError) {
                    console.error(`Erro no lote ${processed}-${processed + batchSize}:`, batchError);
                    // Pula para o próximo lote mesmo com erro
                    processed += batchSize;
                }
            }

            return {
                success: true,
                message: `Carga inicial concluída. ${successfulInserts}/${totalRecords} sensores importados com sucesso.`,
                stats: {
                    totalRecords,
                    successfulInserts,
                    failedInserts: totalRecords - successfulInserts
                }
            };
        } catch (error) {
            console.error('Erro na carga inicial:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Erro desconhecido',
                stack: error instanceof Error ? error.stack : undefined
            };
        }
    }

    // Sincronização programada (usando versão otimizada)
    startScheduledSync(intervalMinutes = 60) {
        const intervalMs = intervalMinutes * 60 * 1000;
        setInterval(() => this.syncSensors(), intervalMs);
        console.log(`Sincronização agendada a cada ${intervalMinutes} minutos`);
    }

    public mysqlOnline = false; // Adicione esta propriedade para armazenar o status
    async checkMySQLHealth(): Promise<boolean> {
        try {
            // Testa a conexão com uma query simples
            const [result] = await pool.query('SELECT 1 AS status') as any;
            this.mysqlOnline = true;
            return true;
        } catch (error) {
            console.error('Falha na conexão com MySQL:', error);
            this.mysqlOnline = false;
            return false;
        }
    }
}

export default new SyncService();