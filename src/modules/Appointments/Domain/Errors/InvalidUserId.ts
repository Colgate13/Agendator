import { CoreError } from '../../../../shared/Error/CoreError';

export class InvalidUserId extends CoreError {
  constructor() {
    super('User_id is required');
    this.name = 'InvalidUserId';
  }
}
