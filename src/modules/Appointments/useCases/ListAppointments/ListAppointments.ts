/* eslint-disable camelcase */
// import { Appointments } from '../../Domain/Appointments';
import { Either, right } from '../../../../core/logic/Either';
import { IAppointmentsRepository } from '../../repositories/IAppointmentsRepository';

interface IAppointmentReturn {
  id: string;
  date: string | Date;
  price: number;
  description: string;
  user_id: string;
}

type listAppointments = Either<Error, IAppointmentReturn[]>;

export class ListAppointments {
  protected appointmentRepository: IAppointmentsRepository;

  constructor(AppointmentRepository: IAppointmentsRepository) {
    this.appointmentRepository = AppointmentRepository;
  }

  async listAppointmentsByUser(user_id: string): Promise<listAppointments> {
    const appointments = await this.appointmentRepository.listByUser(user_id);

    return right(appointments.map((appointment) => ({
      id: appointment.uid,
      date: appointment.date,
      price: appointment.price,
      description: appointment.description,
      user_id: appointment.user_id,
    })));
  }
}
