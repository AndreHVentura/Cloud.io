import mongoose from "mongoose";

interface ISensor {
    mysqlId: string;
    temp: number;
    hum: number;
    bar: number;
    cab_temp: number;
    bat_volts: number;
    uv_level: number;
    wind_peak: number;
    wind_rt: number;
    wind_avg: number;
    wind_dir_rt: number;
    wind_dir_avg: number;
    reading_time: Date;

}

const sensorSchema = new mongoose.Schema<ISensor>({
    mysqlId: { type: String, required: true, unique: true },
    temp: { type: Number, required: true },
    hum: { type: Number, required: true },
    bar: { type: Number, required: true },
    cab_temp: { type: Number, required: true },
    bat_volts: { type: Number, required: true },
    uv_level: { type: Number, required: true },
    wind_peak: { type: Number, required: true },
    wind_rt: { type: Number, required: true },
    wind_avg: { type: Number, required: true },
    wind_dir_rt: { type: Number, required: true },
    wind_dir_avg: { type: Number, required: true },
    reading_time: { type: Date, required: true, default: Date.now }
});

// Cria o índice ANTES de criar o modelo
sensorSchema.index({ mysqlId: 1 }, { unique: true });

export const SensorModel = mongoose.model<ISensor>("Sensor", sensorSchema);
