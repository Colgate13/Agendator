import { CoreError } from '../../../../shared/Error/CoreError';

export class InvalidPassword extends CoreError {
  constructor() {
    super('The password must have between 6 and 255 characters.');
    this.name = 'InvalidPassword';
  }
}
