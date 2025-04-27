import { IsDateString, IsIn, IsNotEmpty, IsString, IsUUID } from '@nestjs/class-validator';
import { Store } from 'src/stores/entities/store.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Equipment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  model: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  serialNumber: string;
  
  @Column()
  @IsString()
  @IsIn(['Operational', 'Maintenance', 'Offline'])
  status: string;
  
  @Column()
  @IsDateString()
  installationDate: string;
  
  @Column()
  @IsDateString()
  lastMaintenance: string;
  
  @CreateDateColumn()
  createdAt?: Date;
  
  @UpdateDateColumn()
  updateAt?: Date;
  
  @ManyToOne(() => Store, (store) => store.equipments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'storeId' })
  store: Store;
  
  @Column()
  @IsUUID()
  storeId: string;
}
