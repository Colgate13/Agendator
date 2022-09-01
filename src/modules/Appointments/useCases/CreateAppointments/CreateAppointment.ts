import { Either, left, right } from '../../../../core/logic/Either';
import { Appointments } from '../../Domain/Appointments';
import { DateAppointments } from '../../Domain/DateAppointments';
import { Price } from '../../Domain/Price';

import { InvalidAppoitmentDatas } from './errors/InvalidAppoitmentDatas';
import { IAppointmentsRepository } from '../../repositories/IAppointmentsRepository';

interface IAppointmentCreate {
  price: number;
  dateAppointments: string | Date;
  description: string;
  user_id: string;
}

type AppointmentReturn = Either<InvalidAppoitmentDatas, Appointments>;

export class CreateAppointment {

  protected appointmentRepository: IAppointmentsRepository;

  constructor(AppointmentRepository: IAppointmentsRepository) {
    this.appointmentRepository = AppointmentRepository;
  }

  async create({
    dateAppointments,
    description,
    user_id,
    price
  }: IAppointmentCreate): Promise<AppointmentReturn> {

    const date = DateAppointments.create(dateAppointments);
    const value = Price.create(price);

    if (date.isLeft() || value.isLeft()) {
      return left(new InvalidAppoitmentDatas());
    }

    const appointment = Appointments.create({
      date: date.value,
      description,
      price: value.value,
      user_id
    });

    if (appointment.isLeft()) {
      return left(new InvalidAppoitmentDatas());
    }

    await this.appointmentRepository.create(appointment.value);

    return right(appointment.value);

  }

}