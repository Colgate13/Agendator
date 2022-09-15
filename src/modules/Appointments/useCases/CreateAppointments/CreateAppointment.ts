/* eslint-disable camelcase */
import { Either, left, right } from '../../../../core/logic/Either';
import { Appointments } from '../../Domain/Appointments';
import { DateAppointments } from '../../Domain/DateAppointments';
import { Price } from '../../Domain/Price';

import { InvalidAppoitmentDatas } from './Errors/InvalidAppoitmentDatas';
import { IAppointmentsRepository } from '../../repositories/IAppointmentsRepository';

interface IAppointmentCreate {
  price: number;
  dateAppointments: string | Date;
  description: string;
  user_id: string;
}

interface ICreateAppointmentReturn {
  id: string;
  date: string | Date;
  price: number;
  description: string;
  user_id: string;
}

type AppointmentReturn = Either<InvalidAppoitmentDatas, ICreateAppointmentReturn>;

export class CreateAppointment {
  protected appointmentRepository: IAppointmentsRepository;

  constructor(AppointmentRepository: IAppointmentsRepository) {
    this.appointmentRepository = AppointmentRepository;
  }

  async create({
    dateAppointments,
    description,
    user_id,
    price,
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
      user_id,
    });

    if (appointment.isLeft()) {
      return left(new InvalidAppoitmentDatas());
    }

    await this.appointmentRepository.create(appointment.value);

    const appointmentReturn = {
      id: appointment.value._id,
      date: appointment.value.date,
      price: appointment.value.price,
      description: appointment.value.description,
      user_id: appointment.value.user_id,
    };

    return right(appointmentReturn);
  }
}
