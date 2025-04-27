import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseConfig = async (): Promise<TypeOrmModuleOptions> => ({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE_NAME || 'sys_cold',
    entities: [__dirname + '/../**/*.entity{.ts, .js}'],
    autoLoadEntities: true,
    synchronize: Boolean(process.env.DB_SYNCHRONIZE) || true,
})