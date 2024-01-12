export interface IValidateUserNotFound {
  status: 404;
  error: string;
}

export interface ILoginSuccessfull {
  statusCode: 200;
  data: {
    access_token: string;
    expires_in: string;
  };
}

export class LoginUserNotFound {
  statusCode: 404;
  error: 'User not found';
}

export class LoginUserPasswordIncorrect {
  statusCode: 400;
  error: 'Password incorrect';
}

export class LoginSuccessfullClass {
  statusCode: 200;

  data: {
    access_token: string;
    expires_in: string;
  };
}

export class IncorrectInputForUserCreation {
  statusCode: 400;

  message: string[];

  error: 'Bad Request';
}

export class ValidateUserNotFoundClass {
  statusCode: 404;

  error: string;
}
