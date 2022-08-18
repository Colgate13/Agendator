import { CoreError } from '../../../../shared/Error/CoreError';

export class InvalidValue extends CoreError {
  constructor() {
    super('This Valor less 0');
    this.name = 'InvalidValue';
  }
}
