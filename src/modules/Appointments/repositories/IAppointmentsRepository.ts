import { Appointments } from '../Domain/Appointments'

export interface IAppointmentsRepository {
  save(user: Appointments): Promise<void>
  create(user: Appointments): Promise<void>
}