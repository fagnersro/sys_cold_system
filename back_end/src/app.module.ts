import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentModule } from './equipment/equipment.module';
import { StoriesModule } from './stories/stories.module';
import { StoresModule } from './stores/stores.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'sys_cold',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Apenas para desenvolvimento
      autoLoadEntities: true,
    }),
    EquipmentModule,
    StoriesModule,
    StoresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
