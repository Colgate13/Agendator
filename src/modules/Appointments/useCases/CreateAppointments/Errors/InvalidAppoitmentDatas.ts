import { AppError } from '../../../../../shared/Error/AppError';

export class InvalidAppoitmentDatas extends AppError {
  constructor() {
    super('Invalid Datas for appointments');
    this.name = 'InvalidAppoitmentDatas';
  }
}
