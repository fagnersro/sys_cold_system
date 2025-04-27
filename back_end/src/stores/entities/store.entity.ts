import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  ValidateNested,
} from '@nestjs/class-validator';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Type } from 'class-transformer';
import { Equipment } from 'src/equipment/entities/equipment.entity';

class Coordinates {
  @Column('float')
  @IsNumber()
  lat: number;

  @Column('float')
  @IsNumber()
  lng: number;
}

@Entity('stores')
export class Store extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  address: string;

  @Column()
  @IsString()
  @Matches(/^\d{3}-\d{3}-\d{4}$/, {
    message: 'Phone number must be in the format xxx-xxx-xxxx',
  })
  phone: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  manager?: string;

  @Column(() => Coordinates)
  @ValidateNested()
  @Type((): new () => Coordinates => Coordinates)
  coordinates: Coordinates;

  @OneToMany(() => Equipment, (equipment) => equipment.store)
  equipments: Equipment[];
}
