import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from '@nestjs/class-validator';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { Type } from 'class-transformer';

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
  @PrimaryColumn()
  @IsString()
  @IsNotEmpty()
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
}
