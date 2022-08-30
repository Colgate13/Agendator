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
        status: 1,
        description: data.description,
        price: data.price,
        uid: data.uid,
        user_uid: data.user_id
      }
     })
  }

  async listByUser(user_id: string): Promise<Appointments[]> {
    
    const appointments = await prisma.appointments.findMany({
      where: {
        user_uid: user_id
      }
    })
    
    return appointments.map(appointment => AppointmentMapper.toDomain(appointment));

  }
}