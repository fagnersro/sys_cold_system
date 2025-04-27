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
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @Matches(/^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/gm, {
    message: 'Phone number must be in the format XX-X-XXXXXXXX',
  })
  phone: string;

  @IsString()
  @IsOptional()
  manager?: string;

  @ValidateNested()
  @Type((): new () => CoordinatesDto => CoordinatesDto)
  coordinates: CoordinatesDto;
}
