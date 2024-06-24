import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfigAsync : TypeOrmModuleAsyncOptions = {
    useFactory: async (): Promise<TypeOrmModuleOptions> => {
        return{
            type: 'mssql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: false,
            migrations: [__dirname + '/../migrations/*{.ts,.js}'],
            extra: {
                options: {
                    encrypt: true,
                    trustServerCertificate: true,
                },
            },
            logging: false,
        }
    }
}
