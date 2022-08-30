import { Appointments } from '../../Domain/Appointments';
import { IAppointmentsRepository } from '../../repositories/IAppointmentsRepository';

type listAppointments = Appointments[];

export class ListAppointments {

  protected appointmentRepository: IAppointmentsRepository;

  constructor(AppointmentRepository: IAppointmentsRepository) {
    this.appointmentRepository = AppointmentRepository;
  }

  async listAppointmentsByUser(user_id: string): Promise<listAppointments> {

    const appointments = this.appointmentRepository.listByUser(user_id);

    return appointments;

  }

}
