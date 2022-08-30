import { AppError } from '../../../../../shared/Error/AppError';

export class InvalidSearchDatas extends AppError {
  constructor() {
    super(`Invalid Datas for search appointments`);
    this.name = 'InvalidSearchDatas';
  }
}
