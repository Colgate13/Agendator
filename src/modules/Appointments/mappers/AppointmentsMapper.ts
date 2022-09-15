import { Appointments as PersistenceAppointment } from '@prisma/client';

import { Appointments } from '../Domain/Appointments';
import { DateAppointments } from '../Domain/DateAppointments';
import { Price } from '../Domain/Price';

export class AppointmentMapper {
  static toDomain(raw: PersistenceAppointment): Appointments {
    const dateAppointments = DateAppointments.create(raw.date);
    const price = Price.create(raw.price);

    if (dateAppointments.isLeft()) {
      throw new Error('dateAppointments value is invalid.');
    }

    if (price.isLeft()) {
      throw new Error('price value is invalid.');
    }

    const appointment = Appointments.create(
      {
        date: dateAppointments.value,
        description: raw.description,
        price: price.value,
        user_id: raw.user_uid,
      },
      raw.uid,
    );

    if (appointment.isRight()) {
      return appointment.value;
    }

    throw new Error('Appointment Invalid to Mapper.');
  }

  static async toPersistence(appointments: Appointments) {
    return {
      uid: appointments.uid,
      date: String(appointments.date),
      description: appointments.description,
      price: appointments.price,
      user_id: appointments.user_id,
    };
  }
}
