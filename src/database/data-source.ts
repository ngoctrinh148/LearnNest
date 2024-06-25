import { config } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
config();

export const dataSourceOptions: DataSourceOptions = {
    type: "mssql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: ['dist/database/migrations/*{.ts,.js}'],
    extra: {
        options: {
            encrypt: true,
            trustServerCertificate: true,
        },
    },
    logging: false,
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;