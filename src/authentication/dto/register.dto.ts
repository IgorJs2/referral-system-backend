import {
  IsEmail,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { EnglishWithSymbols } from '../../common/decorators/EnglishWithSymbols.decorator';
import { EUserSource, TUserSource } from '../../db/interfaces/user.interface';
import { NotFutureDate } from '../../common/decorators/NotFutureDate.decorator';

export class RegisterDto {
  @IsNotEmpty()
  @EnglishWithSymbols()
  readonly username: string;

  @IsEmail({})
  @IsNotEmpty()
  @EnglishWithSymbols()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsISO8601()
  @NotFutureDate()
  readonly dateOfBirth: string;

  @IsNotEmpty()
  @IsEnum(EUserSource)
  @IsString()
  readonly source: TUserSource;

  @IsOptional()
  @IsString()
  readonly source_referral?: string;
}
