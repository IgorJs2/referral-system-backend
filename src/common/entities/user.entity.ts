import { TUserSource } from '../../db/interfaces/user.interface';
import { Exclude } from 'class-transformer';

export class PersonalUserEntity {
  @Exclude()
  id: number;

  username: string;

  @Exclude()
  Password: string;

  Email: string;

  dateOfBirth: Date;

  source: TUserSource;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<PersonalUserEntity>) {
    Object.assign(this, partial);
  }
}
