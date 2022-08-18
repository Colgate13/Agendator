import { Entity } from "../../../core/domain/Entity";
import { Either, right } from "../../../core/logic/Either";
import { IAppointments } from "./IAppointments";
import { InvalidValue } from './Errors/InvalidValue'
import { InvalidDate } from './Errors/InvalidDate'

export class Appointments extends Entity<IAppointments> {

  get description() {
    return this.props.description;
  }
  
  get date() {
    return this.props.date.value;
  }

  private constructor(AppointmentsProps: IAppointments, uid?: string) {
    super(AppointmentsProps, uid);
  }

  static create(AppointmentsProps: IAppointments, uid?: string): Either<InvalidValue | InvalidDate, Appointments> {
    const appointments = new Appointments(AppointmentsProps, uid);

    return right(appointments);

  }

}

