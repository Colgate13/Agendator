import { AppointmentMapper } from '../../mappers/AppointmentsMapper'
import { prisma } from '../../../../infra/prisma/client'
import { Appointments } from '../../Domain/Appointments'
import { IAppointmentsRepository } from '../IAppointmentsRepository'

export class PrismaAppointmentsRepository implements IAppointmentsRepository {
 
  async save(appointment: Appointments): Promise<void> {
    const data = await AppointmentMapper.toPersistence(appointment)

    await prisma.appointments.update({
      where: {
        uid: appointment.uid,
      },
      data,
    })
  }

  async create(appointments: Appointments): Promise<void> {
    const data = await AppointmentMapper.toPersistence(appointments)

    await prisma.appointments.create({ 
      data: {
        date: String(data.date),
        description: data.description,
        price: data.price,
        uid: data.uid,
        user_uid: data.user_id
      }
     })
  }
}