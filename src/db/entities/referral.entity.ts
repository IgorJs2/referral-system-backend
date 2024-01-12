import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';

@Entity('Referral')
export class Referral {
  @PrimaryColumn()
  @Index()
  referral_id: number;

  @PrimaryColumn()
  referee_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'referral_id' })
  referrer: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'referee_id' })
  referee: User;

  @CreateDateColumn()
  createdAt: Date;
}
