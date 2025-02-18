import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({
  path: '.env',
});

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  schema: 'public',
  synchronize: false,
  logNotifications: true,
  entities: [__dirname + '/../../entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../../../database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrationsRun: true,
  dropSchema: false,
  logging: 'all',
});

console.log('🚀 ~ AppDataSource:', AppDataSource);

export default AppDataSource;
