import { Either, left, right } from '../../../core/logic/Either';
import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { InvalidDate } from './errors/InvalidDate';

export class DateAppointments {
  private date: Date;

  get value(): Date {
    return this.date;
  }

  private constructor(dateProps: Date | string) {
    this.date = new Date(dateProps);
  }

  public validateAppointments(dateProps: Date = this.date) {
    if (isBefore(dateProps, Date.now())) {
      return false
    }

    return true;
  }

  static create(dateProps: Date | string): Either<InvalidDate, DateAppointments> {
    const date = new DateAppointments(dateProps);

    if (!date.validateAppointments()) {
      return left(new InvalidDate())
    }

    return right(date);
  }

}