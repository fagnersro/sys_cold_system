import { Story } from 'src/stories/entities/story.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  model: string;

  @Column({ length: 100 })
  serialNumber: string;

  @Column()
  storeId: number;

  @Column({ length: 100 })
  status: string;

  @Column()
  installationDate: Date;

  @Column()
  lastMaintenance: Date;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updateAt?: Date;

  @ManyToOne(() => Story, (story) => story.equipment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'story' })
  story?: Story;
}
