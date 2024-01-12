import { DataResponse } from '../responses/_global';

export class ResponseService {
  public DataResponse<T>(data: T): DataResponse<T> {
    return { statusCode: 200, data };
  }
}
