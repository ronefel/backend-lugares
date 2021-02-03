import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('places')
export class Place extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  country: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  place: string;

  @Column({ type: 'integer', nullable: false })
  goal: number;

  @Column({ type: 'varchar', nullable: false })
  flag: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
