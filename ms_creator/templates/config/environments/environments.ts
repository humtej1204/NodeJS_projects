import dotenv from 'dotenv';
import { IEnvironments } from './environments.interface';
dotenv.config();

export const env: IEnvironments = {
    app: {
        port: Number(process.env.APP_PORT) || 3000,
        name: process.env.APP_NAME ?? "APP",
        maxFileSize: process.env.MAX_FILE_SIZE ?? "5000000",
    },
    db: {
        port: Number(process.env.DB_PORT) || 3307,
        host: process.env.DB_HOST ?? "localhost",
        user: process.env.DB_USER ?? "root",
        pass: process.env.DB_PASS ?? "root",
        name: process.env.DB_NAME ?? "Test",
        time: process.env.DB_TIME ?? "America/Lima",
        dialect: process.env.DB_DIALECT ?? "mysql",
        pool: {
            min: Number(process.env.DB_POOL_MIN) || 0,
            max: Number(process.env.DB_POOL_MAX) || 10,
        }
    },
    jwt: {
        secret: process.env.JWT_SECRET ?? "Secret",
        exp: process.env.JWT_EXPIRES_IN ?? "1d",
    },
    stage: process.env.STAGE ?? "DEV",
    logging: process.env.STAGE === "DEV",
}