import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentModule } from './equipment/equipment.module';
import { StoresModule } from './stores/stores.module';

import { ConfigModule } from '@nestjs/config'
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfig,
      inject:[],
    }),
    EquipmentModule,
    StoresModule,
    StoresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
