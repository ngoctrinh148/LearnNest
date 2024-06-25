import { Module } from '@nestjs/common';
import { CustomersModule } from '../customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from '../../config/typeorm.config';
import { OrdersModule } from '../orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { dataSourceOptions } from 'database/data-source';


@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot(dataSourceOptions),
        // TypeOrmModule.forRootAsync(typeOrmConfigAsync),
        CustomersModule,
        OrdersModule,
        UsersModule,
        AuthModule,
    ]   
})

export class AppModule {}
