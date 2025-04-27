import { 
    IsDateString, 
    IsIn, 
    IsNotEmpty, 
    IsString, 
    IsUUID 
} from "@nestjs/class-validator";

export class CreateEquipmentDto {
    @IsString()
    @IsNotEmpty()
    model: string;

    @IsString()
    @IsNotEmpty()
    serialNumber: string;

    @IsIn(['Operational', 'Maintenance', 'Offiline'])
    status: string;

    @IsDateString()
    installationDate: string;

    @IsDateString()
    lastMaintenance: string;

    @IsUUID()
    storeId: string;
}
