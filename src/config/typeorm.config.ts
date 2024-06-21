import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from "dotenv"

config()

export default class TypeOrmConfig {
    static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
        return {
            type: 'mssql',
            host: configService.get('DB_HOST'),
            port: parseInt(process.env.DB_PORT),
            username: configService.get('DB_USERNAME'),
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: true,
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


export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService): 
        Promise<TypeOrmModuleAsyncOptions> => TypeOrmConfig.getOrmConfig(configService),
    inject: [ConfigService]
}
