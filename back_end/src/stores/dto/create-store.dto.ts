import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Matches,
  ValidateNested,
  IsNumber,
} from '@nestjs/class-validator';
import { Type } from 'class-transformer';

class CoordinatesDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @Matches(/^\d{3}-\d{3}-\d{4}$/, {
    message: 'Phone number must be in the format XXX-XXX-XXXX',
  })
  phone: string;

  @IsString()
  @IsOptional()
  manager?: string;

  @ValidateNested()
  @Type((): new () => CoordinatesDto => CoordinatesDto)
  coordinates: CoordinatesDto;
}
