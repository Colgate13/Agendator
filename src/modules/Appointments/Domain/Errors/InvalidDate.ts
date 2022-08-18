import { CoreError } from '../../../../shared/Error/CoreError';

export class InvalidDate extends CoreError {
  constructor() {
    super('This Date is before to date now');
    this.name = 'invalidDate';
  }
}
