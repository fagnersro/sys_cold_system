import { Module } from '@nestjs/common';
import { EquipmentModule } from './equipment/equipment.module';

@Module({
  imports: [EquipmentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
