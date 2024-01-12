export class DataResponse<T> {
  statusCode: 200;
  data: T;
}

export class ServerError {
  statusCode: 500;
  error: string;
}

export class NotFound {
  statusCode: 404;
  error: string;
}

export class BadRequest {
  statusCode: 400;
  error: string;
}
