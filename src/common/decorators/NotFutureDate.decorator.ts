import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'notFutureDate', async: false })
class NotFutureDateConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    if (new Date(value)) {
      return new Date(value) < new Date();
    }
    return false;
  }
  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a date in the past`;
  }
}

export function NotFutureDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'notFutureDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: NotFutureDateConstraint,
    });
  };
}
