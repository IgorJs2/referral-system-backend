import { HttpException, HttpStatus } from '@nestjs/common';
import { BadRequest, NotFound, ServerError } from '../responses/_global';
import * as process from 'process';

export class ErrorService {
  public async HandleError(error: any) {
    if (process.env.NODE_ENV != 'production') {
      console.log(error);
    }

    if (error?.status == 401) {
      return this.UnauthorizedError();
    }
    if (error?.response && error.response.statusCode) {
      switch (error.response.statusCode) {
        case 400: {
          return await this.BadRequest(error.response);
        }
        case 404: {
          return this.NotFound(error.response);
        }
      }
    }

    return this.ServerError();
  }

  public UnauthorizedError() {
    throw new HttpException(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        error: 'Unauthorized',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }

  public async BadRequest<T>(error: T): Promise<BadRequest> {
    throw new HttpException(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        ...error,
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  public async NotFound<T>(data: T): Promise<NotFound> {
    throw new HttpException(
      {
        statusCode: HttpStatus.NOT_FOUND,
        ...data,
      },
      HttpStatus.NOT_FOUND,
    );
  }

  public async ServerError(): Promise<ServerError> {
    throw new HttpException(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Server error!',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
