import { CoreError } from '../../../../shared/Error/CoreError';

export class InvalidPrice extends CoreError {
  constructor() {
    super('This Valor less 0');
    this.name = 'InvalidPrice';
  }
}
