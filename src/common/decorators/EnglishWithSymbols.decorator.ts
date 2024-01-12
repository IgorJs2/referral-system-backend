import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'englishWithSymbols', async: false })
class EnglishWithSymbolsConstraint implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const regex = /^[a-zA-Z0-9-._@]+$/;
    return regex.test(value);
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} can only contain English letters, numbers, and special symbols (-, ., _)`;
  }
}

export function EnglishWithSymbols(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'englishWithSymbols',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: EnglishWithSymbolsConstraint,
    });
  };
}
