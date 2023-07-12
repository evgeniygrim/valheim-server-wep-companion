import LoggerService from '../services/logger';
export class ServerError {
  declare message: string;
  declare code: number;
  declare user: string;

  constructor(message: string, code: number, user = 'Server') {
    this.message = message;
    this.code = code;
    this.user = user;

    LoggerService.log(message, 'Error', code, user);
  }
}