import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EUserSource, TUserSource } from '../interfaces/user.interface';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false, unique: true })
  username: string;

  @Column({ length: 255, nullable: false })
  Password: string;

  @Column({ length: 255, nullable: false, unique: true })
  Email: string;

  @Column({ type: 'timestamp', nullable: false })
  dateOfBirth: Date;

  @Column({
    type: 'enum',
    enum: EUserSource,
    default: EUserSource.GOOGLE,
    nullable: false,
  })
  source: TUserSource;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
