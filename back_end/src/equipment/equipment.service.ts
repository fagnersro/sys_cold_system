import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createEquipmentDto: CreateEquipmentDto) {
    const equipment = this.equipmentRepository.create(createEquipmentDto)
    return this.equipmentRepository.save(equipment)
  }

  async findAll(): Promise<Equipment[]> {
    return this.equipmentRepository.find();
  }

  async findOne(id: string): Promise<Equipment> {
    const equipment = await this.equipmentRepository.findOne({ where: { id }, relations: ['store'] });

    if (!equipment) {
      throw new NotFoundException(`Equipment with ID "${id}" not found.`);
    }

    return equipment;
  }

  async update(id: string, updateEquipmentDto: UpdateEquipmentDto): Promise<Equipment> {
    const equipment = await this.findOne(id);
    const update = Object.assign(equipment, updateEquipmentDto);

    return this.equipmentRepository.save(update);
  }

  async remove(id: string): Promise<void> {
    const equipment = await this.findOne(id);
    await this.equipmentRepository.remove(equipment);
  }
}
