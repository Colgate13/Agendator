import { Appointments } from '../Domain/Appointments'

export interface IAppointmentsRepository {
  save(appointment: Appointments): Promise<void>
  create(appointment: Appointments): Promise<void>
}