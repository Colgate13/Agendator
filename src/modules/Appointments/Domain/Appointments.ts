import { Entity } from "../../../core/domain/Entity";
import { Either, right } from "../../../core/logic/Either";
import { IAppointments } from "./IAppointments";
import { InvalidPrice } from './errors/InvalidPrice'
import { InvalidDate } from './errors/InvalidDate'

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

  static create(AppointmentsProps: IAppointments, uid?: string): Either<InvalidPrice | InvalidDate, Appointments> {
    const appointments = new Appointments(AppointmentsProps, uid);

    return right(appointments);

  }

}

