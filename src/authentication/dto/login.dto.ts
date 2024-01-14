import {
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { EnglishWithSymbols } from '../../common/decorators/EnglishWithSymbols.decorator';

export class LoginDto {
  @IsNotEmpty()
  @EnglishWithSymbols()
  readonly username: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
