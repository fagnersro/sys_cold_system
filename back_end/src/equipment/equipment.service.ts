import { Injectable } from '@nestjs/common';
import { Equipment } from './entities/equipment.entity';
import type { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
  ) {}

  create(createEquipmentDto: CreateEquipmentDto) {
    return 'This action adds a new equipment';
  }

  findAll() {
    return `This action returns all equipment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipment`;
  }

  update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    return `This action updates a #${id} equipment`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipment`;
  }
}
