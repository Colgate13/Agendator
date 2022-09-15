import { Entity } from '../../../core/domain/Entity';
import { Either, left, right } from '../../../core/logic/Either';
import { IAppointments } from './IAppointments';
import { InvalidPrice } from './Errors/InvalidPrice';
import { InvalidDate } from './Errors/InvalidDate';

export class Appointments extends Entity<IAppointments> {
  get uid() {
    return this._id;
  }

  get description() {
    return this.props.description;
  }

  get date() {
    return this.props.date.value;
  }

  get price() {
    return this.props.price.price;
  }

  get user_id() {
    return this.props.user_id;
  }

  private constructor(AppointmentsProps: IAppointments, uid?: string) {
    super(AppointmentsProps, uid);
  }

  // eslint-disable-next-line max-len
  static create(AppointmentsProps: IAppointments, uid?: string): Either<InvalidPrice | InvalidDate, Appointments> {
    if (!AppointmentsProps.user_id) {
      return left(new InvalidDate());
    }

    const appointments = new Appointments(AppointmentsProps, uid);

    return right(appointments);
  }
}
