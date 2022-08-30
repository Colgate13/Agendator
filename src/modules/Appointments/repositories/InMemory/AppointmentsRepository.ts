import { Appointments } from '../../Domain/Appointments';
import { IAppointmentsRepository } from '../IAppointmentsRepository'

export class InMemoryAppointmentsRepository implements IAppointmentsRepository {
  constructor(public items: Appointments[] = []) {}

  async save(appointment: Appointments): Promise<void> {
    const appointmentIndex = this.items.findIndex((findAppointment) => {
      findAppointment.uid === appointment.uid
    })

    this.items[appointmentIndex] = appointment
  }

  async create(appointment: Appointments): Promise<void> {
    this.items.push(appointment)
  }

  async listByUser(user_id: string): Promise<Appointments[]> {
    return this.items
  }
}